const FileModel = require("../model/File");
const fs = require("fs");
const path = require("path");

const {
  normalizeFolderPath,
  resolveFolderFsPath,
  isDirectChildPath,
  getParentFolderPath,
} = require("../utils/path");

const uploadDir = path.resolve(__dirname, "../../uploads");

const toPublicFolderDto = (entry) => ({
  _id: entry._id,
  folderName: entry.name,
  path: entry.relativePath,
});

const toPublicFileDto = (entry) => ({
  _id: entry._id,
  fileName: entry.name,
  contentType: entry.contentType || "",
  relativePath: entry.relativePath,
  fullPath: entry.fullPath,
});

const isInvalidEntryName = (name = "") => /[\\/]/.test(String(name));
const escapeRegex = (value = "") => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const renameFolderOnDisk = async (oldPath, newPath) => {
  const maxAttempts = 4;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await fs.promises.rename(oldPath, newPath);
      return;
    } catch (error) {
      const isTransientWindowsRenameIssue = ["EPERM", "EBUSY"].includes(error?.code);

      if (!isTransientWindowsRenameIssue || attempt === maxAttempts) {
        throw error;
      }

      await sleep(120 * attempt);
    }
  }
};

const createFolder = async (req, res) => {
  try {
    let { folderPath, folderName } = req.body;

    if (!folderPath && !folderName) {
      return res.status(400).json({ message: "Folder path is required" });
    }

    const targetPath = normalizeFolderPath(folderPath || folderName);

    const fullPath = resolveFolderFsPath(uploadDir, targetPath);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    const existingFolder = await FileModel.findOne({
      isFolder: true,
      relativePath: targetPath,
    });

    if (existingFolder) {
      return res.status(400).json({ message: "Folder already exists" });
    }

    const folder = await FileModel.create({
      name: path.basename(targetPath),
      isFolder: true,
      relativePath: targetPath,
      fullPath,
      contentType: "folder",
    });

    res.status(201).json({
      message: "Folder created successfully",
      folder: toPublicFolderDto(folder),
    });

  } catch (err) {
    if (["EPERM", "EBUSY"].includes(err?.code)) {
      return res.status(423).json({
        message: "Folder rename is temporarily blocked. Close any preview/app using this folder and try again.",
      });
    }

    res.status(500).json({ message: err.message });
  }
};

const getAllFolders = async (req, res) => {
  try {
    const folders = await FileModel.find({ isFolder: true }).sort({ createdAt: -1 }).lean();
    if (folders.length === 0) {
      return res.status(404).json({ message: "No folders found" });
    }
    res
      .status(200)
      .json({ message: "Folders retrieved successfully", folders: folders.map(toPublicFolderDto) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFoldersByPath = async (req, res) => {
  try {
    const { id } = req.params;
    const normalized = normalizeFolderPath(id || "");
    const folders = await FileModel.find({
      isFolder: true,
      relativePath: normalized,
    }).lean();
    res
      .status(200)
      .json({ message: "Folders retrieved successfully", folders: folders.map(toPublicFolderDto) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFolderContents = async (req, res) => {
  try {
    const currentPath = normalizeFolderPath(req.query.path || "");

    const allEntries = await FileModel.find().sort({ createdAt: -1 }).lean();

    const allFolders = allEntries.filter((entry) => entry.isFolder);
    const allFiles = allEntries.filter((entry) => !entry.isFolder);

    const folders = allFolders.filter((folder) =>
      isDirectChildPath(currentPath, folder.relativePath),
    );

    const files = allFiles.filter(
      (file) => getParentFolderPath(file.relativePath || "") === currentPath,
    );

    res.status(200).json({
      message: "Folder contents retrieved successfully",
      currentPath,
      folders: folders.map(toPublicFolderDto),
      files: files.map(toPublicFileDto),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;

    const folder = await FileModel.findOne({ _id: id, isFolder: true });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Check if folder has any children
    const children = await FileModel.find({
      $or: [
        { relativePath: { $regex: `^${folder.relativePath}/` } },
        { relativePath: folder.relativePath }
      ]
    });

    // Delete all children files from physical storage
    for (const child of children) {
      if (!child.isFolder && fs.existsSync(child.fullPath)) {
        fs.unlinkSync(child.fullPath);
      }
    }

    // Delete folder from physical storage
    if (fs.existsSync(folder.fullPath)) {
      fs.rmSync(folder.fullPath, { recursive: true, force: true });
    }

    // Delete folder and all children from database
    await FileModel.deleteMany({
      $or: [
        { relativePath: { $regex: `^${folder.relativePath}/` } },
        { relativePath: folder.relativePath }
      ]
    });

    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const renameFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const newName = String(req.body?.newName || "").trim();

    if (!newName) {
      return res.status(400).json({ message: "New name is required" });
    }

    if (isInvalidEntryName(newName)) {
      return res.status(400).json({ message: "Folder name cannot contain path separators" });
    }

    const folder = await FileModel.findOne({ _id: id, isFolder: true });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Get the parent directory
    const parentPath = getParentFolderPath(folder.relativePath);
    const newRelativePath = normalizeFolderPath(parentPath ? `${parentPath}/${newName}` : newName);
    const newFullPath = resolveFolderFsPath(uploadDir, newRelativePath);

    const duplicateFolder = await FileModel.findOne({
      _id: { $ne: id },
      isFolder: true,
      relativePath: newRelativePath,
    }).lean();

    if (duplicateFolder) {
      return res.status(409).json({ message: "A folder with this name already exists in the same path" });
    }

    if (newFullPath !== folder.fullPath && fs.existsSync(newFullPath)) {
      return res.status(409).json({ message: "A folder with this name already exists on disk" });
    }

    // Rename physical folder (with retries for transient Windows file-lock errors)
    if (fs.existsSync(folder.fullPath)) {
      await renameFolderOnDisk(folder.fullPath, newFullPath);
    }

    // Update folder in database
    const updatedFolder = await FileModel.findByIdAndUpdate(
      id,
      { name: newName, relativePath: newRelativePath, fullPath: newFullPath },
      { new: true }
    );

    // Update all children paths
    const oldPath = folder.relativePath;
    const escapedOldPath = escapeRegex(oldPath);
    const children = await FileModel.find({
      relativePath: { $regex: `^${escapedOldPath}/` }
    });

    for (const child of children) {
      const relativeSuffix = child.relativePath.slice(oldPath.length);
      const newChildRelativePath = normalizeFolderPath(`${newRelativePath}${relativeSuffix}`);
      const childRelativeToFolder = path.relative(folder.fullPath, child.fullPath);
      const newChildFullPath = path.join(newFullPath, childRelativeToFolder);
      
      await FileModel.updateOne(
        { _id: child._id },
        { relativePath: newChildRelativePath, fullPath: newChildFullPath }
      );
    }

    res.status(200).json({
      message: "Folder renamed successfully",
      folder: toPublicFolderDto(updatedFolder),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createFolder,
  getAllFolders,
  getFoldersByPath,
  getFolderContents,
  deleteFolder,
  renameFolder,
};

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

module.exports = {
  createFolder,
  getAllFolders,
  getFoldersByPath,
  getFolderContents,
};

const FolderModel = require("../model/Folder");
const FileModel = require("../model/File");
const fs = require("fs");
const path = require("path");
const {
  normalizeFolderPath,
  resolveFolderFsPath,
  isDirectChildPath,
} = require("../utils/path");

const uploadDir = path.resolve(__dirname, "../../uploads");

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

    const existingFolder = await FolderModel.findOne({ path: targetPath });

    if (existingFolder) {
      return res.status(400).json({ message: "Folder already exists" });
    }

    const folder = await FolderModel.create({
      folderName: path.basename(targetPath),
      path: targetPath,
    });

    res.status(201).json({
      message: "Folder created successfully",
      folder,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllFolders = async (req, res) => {
  try {
    const folders = await FolderModel.find();
    if (folders.length === 0) {
      return res.status(404).json({ message: "No folders found" });
    }
    res
      .status(200)
      .json({ message: "Folders retrieved successfully", folders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFoldersByPath = async (req, res) => {
  try {
    const { id } = req.params;
    const folders = await FolderModel.find({ path: id });
    res
      .status(200)
      .json({ message: "Folders retrieved successfully", folders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFolderContents = async (req, res) => {
  try {
    const currentPath = normalizeFolderPath(req.query.path || "");

    const [allFolders, allFiles] = await Promise.all([
      FolderModel.find().sort({ createdAt: -1 }).lean(),
      FileModel.find().populate("folderId").sort({ createdAt: -1 }).lean(),
    ]);

    const folders = allFolders.filter((folder) =>
      isDirectChildPath(currentPath, folder.path),
    );

    const files = allFiles.filter(
      (file) => normalizeFolderPath(file.folderId?.path || "") === currentPath,
    );

    res.status(200).json({
      message: "Folder contents retrieved successfully",
      currentPath,
      folders,
      files,
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

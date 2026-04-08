const FolderModel = require("../model/Folder");
const fs = require("fs");
const path = require("path");

const uploadDir = path.resolve(__dirname, "../../uploads");

const createFolder = async (req, res) => {
  try {
    let { folderPath } = req.body;

    if (!folderPath) {
      return res.status(400).json({ message: "Folder path is required" });
    }

    newFolderPath = path.normalize(folderPath);

    const fullPath = path.join(uploadDir, newFolderPath);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    const existingFolder = await FolderModel.findOne({ path: newFolderPath });

    if (existingFolder) {
      return res.status(400).json({ message: "Folder already exists" });
    }

    const folder = await FolderModel.create({
      folderName: path.basename(newFolderPath),
      path: newFolderPath,
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

module.exports = {
  createFolder,
  getAllFolders,
  getFoldersByPath,
};

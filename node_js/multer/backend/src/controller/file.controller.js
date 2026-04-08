const FileModel = require("../model/File");
const FolderModel = require("../model/Folder");
const fs = require("fs");
const path = require("path");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let folderPath = req.body.folderPath || "default";
    folderPath = path.normalize(folderPath);

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${folderPath}/${req.file.filename}`;

    let folder = await FolderModel.findOne({ path: folderPath });

    if (!folder) {
      return res.status(400).json({ message: "Folder does not exist. Please create the folder first." });
    }

    const saved = await FileModel.create({
      fileName: req.file.originalname,
      customeURL: fileUrl,
      contentType: req.file.mimetype,
      folderId: folder._id,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      url: saved.customeURL,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllFiles = async (req, res) => {
  try{
    const files = await FileModel.find().sort({ _id: -1 });
    if(files.length === 0){
        return res.status(404).json({ message: "No files found" });
    }
    res.status(200).json({
      success: true,
      files: files
    });

  } catch(err){
    res.status(500).json({ message: err.message });
  }
}


const getFileByPath = async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "file not found",
      });
    }

    const filePath = file.customeURL;

    return res.json({ filePath: filePath });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  uploadFile,
  getFileByPath,
  getAllFiles,
};

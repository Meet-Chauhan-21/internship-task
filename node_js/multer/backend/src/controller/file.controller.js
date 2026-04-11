const FileModel = require("../model/File");
const { normalizeFolderPath } = require("../utils/path");

const toPublicFileDto = (entry) => ({
  _id: entry._id,
  fileName: entry.name,
  contentType: entry.contentType || "",
  relativePath: entry.relativePath,
  fullPath: entry.fullPath,
});

const getExtension = (fileName = "") => {
  const ext = String(fileName).split(".").pop()?.trim().toLowerCase();
  return ext && ext !== fileName.toLowerCase() ? ext : "file";
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const folderPath = normalizeFolderPath(
      req.uploadFolderPath ||
        req.headers["x-folder-path"] ||
        req.body.folderPath ||
        req.query.folderPath ||
        "",
    );

    if (folderPath) {
      const folder = await FileModel.findOne({
        isFolder: true,
        relativePath: folderPath,
      }).lean();

      if (!folder) {
        return res.status(400).json({ message: "Folder does not exist. Please create the folder first." });
      }
    }

    const relativeFilePath = normalizeFolderPath(
      folderPath ? `${folderPath}/${req.file.filename}` : req.file.filename,
    );
    const fileExtension = getExtension(req.file.originalname);

    const saved = await FileModel.create({
      name: req.file.originalname,
      isFolder: false,
      relativePath: relativeFilePath,
      fullPath: req.file.path,
      contentType: fileExtension,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: toPublicFileDto(saved),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllFiles = async (req, res) => {
  try{
    const files = await FileModel.find({ isFolder: false }).sort({ _id: -1 }).lean();
    if(files.length === 0){
        return res.status(404).json({ message: "No files found" });
    }
    res.status(200).json({
      success: true,
      files: files.map(toPublicFileDto)
    });

  } catch(err){
    res.status(500).json({ message: err.message });
  }
}


const getFileByPath = async (req, res) => {
  try {
    const file = await FileModel.findOne({ _id: req.params.id, isFolder: false }).lean();

    if (!file) {
      return res.status(404).json({
        message: "file not found",
      });
    }

    return res.json({ filePath: file.fullPath, relativePath: file.relativePath });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  uploadFile,
  getFileByPath,
  getAllFiles,
};

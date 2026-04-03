const FileModel = require("../model/File");

const getPublicFileUrl = (req, fileName) => {
  return `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = getPublicFileUrl(req, req.file.filename);

    const saved = await FileModel.create({
      fileName: req.file.originalname,
      customeURL: fileUrl,
      contentType: req.file.mimetype,
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

const getFileByData = async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);
    if (!file) {
      return res.status(404).json({
        message: "file not found",
      });
    }

    res.set("Content-Type", file.contentType);

    return res.status(200).send(file.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  uploadFile,
  getFileByData,
  getFileByPath,
  getAllFiles,
};

const FileDataModel = require("../model/FileData");
const FilePathModel = require("../model/FilePath");
const FileModel = require("../model/File");
const fs = require("fs")
const path = require("path")

const simpleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileBuffer = fs.readFileSync(req.file.path);

    const savedFile = await FileModel.create({
      fileName: req.file.originalname,
      path: path.resolve(req.file.path),
      contentType: req.file.mimetype,
      data: fileBuffer,
    });

    return res.status(201).json({
      message: "File uploaded and saved",
      data: savedFile,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const getFileByPath = async (req, res) => {
    try {
      
        const file = await FileModel.findById(req.params.id);

        if (!file) {
            return res.status(404).json({
                message: "file not found"
            });
        }

        const filePath = file.customFileUrl;
        console.log(file)

        // if (!fs.existsSync(filePath)) {
        //     return res.status(404).json({
        //         message: "file not found on server"
        //     });
        // }

        return res.json({ filePath: filePath });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getFileByData = async (req,res)=>{
    try{
        const file = await FileModel.findById(req.params.id);
        if(!file){
            return res.status(404).json({
                message : "file not found"
            })
        }

        res.set("Content-Type", file.contentType);
        
        return res.status(200).send(file.data)

    }catch(err){
        res.status(500).json({ message: err.message }); 
    }
}





// 🟢 STORE ONLY PATH
const uploadWithPath = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileDoc = await FilePathModel.create({
      filename: req.file.filename,
      path: req.file.path,
    });

    return res.status(201).json({
      message: "Path stored successfully",
      data: fileDoc,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔵 STORE FULL FILE (BUFFER)
const uploadFullFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileBuffer = fs.readFileSync(req.file.path);

    const fileDoc = await FileDataModel.create({
      filename: req.file.filename,
      contentType: req.file.mimetype,
      data: fileBuffer,
    });

    // delete file after storing
    fs.unlink(req.file.path, () => {});

    res.status(201).json({
      message: "File stored in DB",
      data: fileDoc,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  simpleUpload,
    uploadWithPath,
    uploadFullFile,
    getFileByData,
    getFileByPath,
};
const express = require("express");
const { uploadFile, getFileByData, getFileByPath, getAllFiles } = require("../controller/file.controller");
const upload = require("../middleware/upload.middleware");
const FileRouter = express.Router();

// upload file
FileRouter.post("/upload", upload.single("myfile"), uploadFile);

// get all files
FileRouter.get("/files", getAllFiles);

// get file by path
FileRouter.get("/path/:id",getFileByPath)


module.exports = FileRouter;
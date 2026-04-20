const express = require("express");
const { uploadFile, getFileByPath, getAllFiles, deleteFile, renameFile, downloadFile } = require("../controller/file.controller");
const upload = require("../middleware/upload.middleware");
const FileRouter = express.Router();

// upload file
FileRouter.post("/upload", upload.single("myfile"), uploadFile);

// get all files
FileRouter.get("/files", getAllFiles);
FileRouter.get("/all-files", getAllFiles);

// get file by path
FileRouter.get("/path/:id", getFileByPath);

// delete file
FileRouter.delete("/:id", deleteFile);

// rename file
FileRouter.put("/:id/rename", renameFile);

// download file
FileRouter.get("/:id/download", downloadFile);

module.exports = FileRouter;
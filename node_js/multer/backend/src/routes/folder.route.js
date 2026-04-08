const express = require("express");
const upload = require("../middleware/upload.middleware");
const { createFolder, getAllFolders, getFoldersByPath, getFolderContents } = require("../controller/folder.controller");
const FolderRouter = express.Router();

// create folder
FolderRouter.post("/create", createFolder);

// get all folders
FolderRouter.get("/folders", getAllFolders);

// get folders by path
FolderRouter.get("/path/:id",getFoldersByPath)

// get current folder contents
FolderRouter.get("/contents", getFolderContents);


module.exports = FolderRouter;
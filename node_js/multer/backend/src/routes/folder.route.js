const express = require("express");
const upload = require("../middleware/upload.middleware");
const { createFolder, getAllFolders, getFoldersByPath } = require("../controller/folder.controller");
const FolderRouter = express.Router();

// create folder
FolderRouter.post("/create", createFolder);

// get all folders
FolderRouter.get("/folders", getAllFolders);

// get folders by path
FolderRouter.get("/path/:id",getFoldersByPath)


module.exports = FolderRouter;
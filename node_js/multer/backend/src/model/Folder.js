// models/Folder.js
const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  folderName: { type: String, required: [true, "Folder name is required"], trim: true },
  path: { type: String, required: [true, "Path is required"] },
}, { timestamps: true });

const FolderModel = mongoose.model('Folder', folderSchema);

module.exports = FolderModel;
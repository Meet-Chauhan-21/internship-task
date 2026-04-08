const mongoose = require("mongoose");

const uploadFileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: [true, "File name is required"] },
    customeURL: { type: String, required: [true, "Custom URL is required"] },
    contentType: { type: String, required: [true, "Content type is required"] },
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: [true, "Folder ID is required"] },
  },{ timestamps: true }
);

const FileModel = mongoose.model("File", uploadFileSchema);

module.exports = FileModel;

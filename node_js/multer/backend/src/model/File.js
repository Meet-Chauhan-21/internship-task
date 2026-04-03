const mongoose = require("mongoose");

const uploadFileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    customeURL: { type: String, required: true },
    contentType: { type: String, required: true },
  }
);

const FileModel = mongoose.model("File", uploadFileSchema);

module.exports = FileModel;

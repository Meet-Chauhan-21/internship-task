const mongoose = require("mongoose");

const uploadFileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    path: { type: String, required: true },
    contentType: { type: String, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

const FileModel = mongoose.model("File", uploadFileSchema);

module.exports = FileModel;

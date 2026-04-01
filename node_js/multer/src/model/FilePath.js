const mongoose = require("mongoose");

const filePathSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

const FilePathModel = mongoose.model("FilePath", filePathSchema);

module.exports = FilePathModel;
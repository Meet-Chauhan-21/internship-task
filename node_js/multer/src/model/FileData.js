const mongoose = require("mongoose");

const fileDataSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer, // 🔥 actual file store here
});

const FileDataModel = mongoose.model("FileData", fileDataSchema);

module.exports = FileDataModel;
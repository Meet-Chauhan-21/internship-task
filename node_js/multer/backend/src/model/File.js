const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    isFolder: { type: Boolean, required: true },
    relativePath: {
      type: String,
      required: [true, "Relative path is required"],
      unique: true,
      index: true,
    },
    fullPath: {
      type: String,
      required: [true, "Full path is required"],
      unique: true,
      index: true,
    },
    contentType: { type: String, default: null },
  },
  { timestamps: true }
);

entrySchema.index({ isFolder: 1, relativePath: 1 });

const FileModel = mongoose.model("File", entrySchema);

module.exports = FileModel;

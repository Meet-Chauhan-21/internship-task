const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { normalizeFolderPath, resolveFolderFsPath } = require("../utils/path");

const uploadDir = path.resolve(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderPath =
      req.headers["x-folder-path"] || req.query.folderPath || req.body.folderPath || "";

    try {
      folderPath = normalizeFolderPath(folderPath);
    } catch (error) {
      return cb(error, null);
    }

    const uploadPath = resolveFolderFsPath(uploadDir, folderPath);

    if (!fs.existsSync(uploadPath)) {
      return cb(new Error("Folder does not exist. Please create the folder first."), null);
    }

    req.uploadFolderPath = folderPath;

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },

});

const upload = multer({ storage });

module.exports = upload;

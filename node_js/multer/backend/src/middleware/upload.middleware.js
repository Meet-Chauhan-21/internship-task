const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.resolve(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderPath = req.body.folderPath || "default";
    console.log(folderPath)
    folderPath = path.normalize(folderPath);

    const uploadPath = path.join(uploadDir, folderPath);

    if (!fs.existsSync(uploadPath)) {
      // fs.mkdirSync(uploadPath, { recursive: true });
      return cb(new Error("Folder does not exist. Please create the folder first."), null);
    }

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },

});

const upload = multer({ storage });

module.exports = upload;

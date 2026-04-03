const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.resolve(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const safeName = file.originalname.replace(/\s+/g, "-");
        cb(null, `${Date.now()}-${safeName}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

    if (allowedTypes.includes(file.mimetype)) {
        return cb(null, true);
    }

    return cb(new Error("Only PDF and image files are allowed"));
};

const upload = multer({ storage });

module.exports = upload;
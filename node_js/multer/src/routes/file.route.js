const express = require("express");
const { uploadWithPath, uploadFullFile, getFileById, getFileByPath } = require("../controller/file.controller");
const upload = require("../middleware/upload.middleware");
const router = express.Router();

// POST /upload-path → uploadWithPath
router.post("/upload-path", upload.single("myfile"), uploadWithPath);

// POST /upload-full → uploadFullFile
router.post("/upload-full", upload.single("myfile"), uploadFullFile);

router.get("/",(_,res)=>{
    return res.render("home")
})

router.get("/filebyfull/:id",getFileById)

router.get("/filebypath/:id",getFileByPath)

module.exports = router;
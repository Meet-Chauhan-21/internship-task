const express = require("express");
const { simpleUpload, uploadWithPath, uploadFullFile, getFileByData, getFileByPath } = require("../controller/file.controller");
const upload = require("../middleware/upload.middleware");
const router = express.Router();

// POST /upload → simpleUpload
router.post("/upload", upload.single("myfile"), simpleUpload);

// POST /upload-path → uploadWithPath
router.post("/upload-path", upload.single("myfile"), uploadWithPath);

// POST /upload-full → uploadFullFile
router.post("/upload-full", upload.single("myfile"), uploadFullFile);

router.get("/",(_,res)=>{
    return res.render("home")
})

router.get("/path/:id",getFileByPath)

router.get("/data/:id",getFileByData)


module.exports = router;
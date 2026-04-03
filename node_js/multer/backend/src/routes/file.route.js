const express = require("express");
const { uploadFile, getFileByData, getFileByPath, getAllFiles } = require("../controller/file.controller");
const upload = require("../middleware/upload.middleware");
const router = express.Router();

// POST /upload → simpleUpload
router.post("/upload", upload.single("myfile"), uploadFile);

router.get("/all-files", getAllFiles);

router.get("/path/:id",getFileByPath)

router.get("/data/:id",getFileByData)


router.get("/",(_,res)=>{
    return res.render("home")
})


module.exports = router;
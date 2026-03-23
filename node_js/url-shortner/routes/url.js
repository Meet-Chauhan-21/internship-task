const express = require("express")
const {generateShortUrl, getUrl, getAnalsis} = require("../controller/url")
const router = express.Router()

router.post("/",generateShortUrl)
router.get("/:shortId",getUrl)
router.get("/analysis/:shortId",getAnalsis)

module.exports = router
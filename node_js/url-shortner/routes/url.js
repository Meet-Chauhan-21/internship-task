const express = require("express")
const {generateShortUrl, getUrl} = require("../controller/url")
const router = express.Router()

router.post("/",generateShortUrl)
router.get("/:shortId",getUrl)

module.exports = router
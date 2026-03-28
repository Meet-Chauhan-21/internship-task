const express = require("express")
const { loginUser, registerUser, getMeUser, refreshTokenHandler } = require("../controller/auth.controller")
const verifyToken = require("../middleware/auth.middleware")
const router = express.Router()


router.post("/register", registerUser)
router.post("/login", loginUser)

router.get("/get-me", verifyToken, getMeUser)

router.get("/refresh-token",refreshTokenHandler)

module.exports = router



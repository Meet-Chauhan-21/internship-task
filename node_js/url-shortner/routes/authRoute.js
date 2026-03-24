const express = require("express")
const { loginUser, registerUser, getMeUser, refreshToken } = require("../controller/authController")
const router = express.Router()

router.post("/register",registerUser)
router.get("/get-me",getMeUser)
router.post("/login",loginUser)
router.get("/refresh-token",refreshToken)


module.exports = router



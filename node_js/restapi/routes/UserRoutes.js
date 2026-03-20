const express = require("express")
const {getAllUsers, getUsersById, createUser, updateUserById, deleteUserById} = require("../controller/UserController")
const router = express.Router()

router.get("/",getAllUsers)
router.get("/:id",getUsersById)
router.post("/",createUser)
router.patch("/:id",updateUserById)
router.delete("/:id",deleteUserById)

module.exports = router
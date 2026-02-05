const express = require('express')
const { getUser, createUser, updateUser, deleteUser } = require('../controller/UserController')
const routes = express.Router()

routes.get("/get-user",getUser)
routes.post("/create-user",createUser)
routes.put("/update-user",updateUser)
routes.delete("/delete-user",deleteUser)

module.exports = routes
const express = require("express")
const app = express()
const mongodbConnection = require("./connection")
const UserRoutes = require("./routes/UserRoutes")
require("dotenv").config()
app.use(express.json())

mongodbConnection()

app.use("/user",UserRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`server runing on port ${process.env.PORT}`)
})

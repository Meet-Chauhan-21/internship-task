const express = require("express")
const app = express()
const mongodbConnection = require("./connect")
const UrlRoutes = require("./routes/url")
require("dotenv").config()
app.use(express.json())

mongodbConnection()

app.use("/url",UrlRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`server runing on port ${process.env.PORT}`)
})

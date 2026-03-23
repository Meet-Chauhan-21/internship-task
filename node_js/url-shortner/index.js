const express = require("express")
const path = require("path")
const app = express()

const mongodbConnection = require("./connect")
const UrlRoutes = require("./routes/url")
const StaticRoutes = require("./routes/staticRoute")
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

mongodbConnection()

app.use("/url", UrlRoutes)
app.use("/", StaticRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`server runing on port ${process.env.PORT}`)
})

const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser");
const app = express()

const mongodbConnection = require("./src/db/connect")
const UrlRoutes = require("./src/routes/urlRoute")
const StaticRoutes = require("./src/routes/staticRoute")
const AuthRoutes = require("./src/routes/authRoute")
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

mongodbConnection()

app.use("/url", UrlRoutes)
app.use("/", StaticRoutes)
app.use("/auth", AuthRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`server runing on port ${process.env.PORT}`)
})

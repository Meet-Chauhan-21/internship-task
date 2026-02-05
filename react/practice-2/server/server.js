const express = require('express')
const app = express()
const MongodbConnect = require('./src/config/db')
const routes = require('./src/routes/UserRoutes')

require('dotenv').config()
const PORT = process.env.PORT

// to convert frontend req to json object
app.use(express.json())

app.use('/user',routes);

// connecting mongoDB
MongodbConnect()

app.listen(PORT,()=>{
    console.log(`\nSERVER RUNING ON ${PORT}`)
})
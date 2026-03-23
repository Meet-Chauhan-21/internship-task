const fs = require("fs")

const logs = (req,res,next)=>{
    const data = `${Date.now()} ${req.method} PATH: ${req.url}\n`
    fs.appendFile("log.txt",data,(err)=>{
        console.log(err)
    })
    next()
}

module.exports = logs
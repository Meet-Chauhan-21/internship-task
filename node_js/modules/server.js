const http = require("http")

const server = http.createServer((req,res)=>{
    console.log("working..!")
    res.end("hello")
})

server.listen("8080",()=>{
    console.log("server starting on port 8080")
})
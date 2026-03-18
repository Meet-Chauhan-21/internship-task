const fs = require('fs')
console.log("files handeling..!")

// to write file sync
fs.writeFileSync("test.txt","to write in this file.")

// to read file sync
const data = fs.readFileSync("test.txt","utf-8")
console.log(data)

// to append file sync
fs.appendFileSync("test.txt","adding\n")

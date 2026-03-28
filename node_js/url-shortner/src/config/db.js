const mongoose = require("mongoose")

const mongodbConnection = async ()=>{
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("MongoDB Connected Successfully")
    }).catch((err)=>{
        console.log("ERROR : ", err)
    })
}

module.exports = mongodbConnection
const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    ShortId :{
        type:String,
        required:true
    },
    RedirectURL :{
        type:String,
        required:true,
    },
    History:[
        {
            timestamp:{type:Number}
        }
    ],
},{ timestamps:true })

const URL = mongoose.model("url",urlSchema)

module.exports = URL

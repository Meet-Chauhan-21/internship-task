const mongoose = require('mongoose')

const MongodbConnect = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("MONGODB CONNECTED SUCCESSFULLY..!")
    })
    .catch((e)=>{
        console.log(e)
    })
}
    
module.exports = MongodbConnect
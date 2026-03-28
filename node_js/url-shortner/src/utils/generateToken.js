const jwt = require("jsonwebtoken")

const generateAccessToken = (user)=>{
    return jwt.sign({id:user._id },process.env.JWT_ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
}

const generateRefreshToken = (user)=>{
    return jwt.sign({id:user._id },process.env.JWT_REFRESH_TOKEN_SECRET,{expiresIn:"1d"})
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}
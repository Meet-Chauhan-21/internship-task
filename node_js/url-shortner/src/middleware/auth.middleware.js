const jwt = require("jsonwebtoken");
const USER = require("../model/user.model");

const verifyToken = async (req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).json({
                message : "Access Token not found"
            })
        }
    
        const decode = jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET)
        const user = await USER.findById(decode.id)
    
        req.user = user
        next()
    } catch (error) {

        console.error(error);
        return res.status(500).json({
            message: "Access Token is not valid",
        });

    }
}

module.exports = verifyToken
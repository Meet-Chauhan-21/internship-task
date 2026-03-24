const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const USER = require("../model/user")

const registerUser = async (req,res)=>{
    const {username,email,password} = req.body;
    const user = await USER.findOne({email})
    if(user){
        return res.status(401).json({
            message:"email already exist"
        })
    }
    const bcryptPassword = await bcrypt.hash(password,10)

    const created_user = await USER.create({
        username,
        email,
        password:bcryptPassword
    })

    const token = jwt.sign({id:created_user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    return res.status(201).json({
        message:"user created successfully",
        created_user,
        token
    })
    
}

const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    const user = await USER.findOne({email})
    if(!user){
        return res.status(401).json({
            message:"email not found"
        })
    }

    const passwordMatch = await bcrypt.compare(password,user.password)
    if(!passwordMatch){
        return res.status(401).json({
            message : "wrong password"
        })
    }

    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message:"token not found"
        })
    }

    return res.status(200).json({
        message : "login successfully",
        username:user.username,
        email:user.email
    })
    
}

const getMeUser = async(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message:"token not found"
        })
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET)
    const user = await USER.findById(decode.id)
    
    return res.status(200).json({
        message:"user fetched successfully",
        username:user.username,
        email:user.email
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMeUser
}
import UserModel from "../model/User.js"
import { createNewUser, deleteUserById, getAlluser, updateUserById } from "../services/UserServices.js"
import { createUserValidation } from "../validation/validation.js"

export const getUser = async (req,res) => {
    const users = await getAlluser()
    res.send(users)
}

export const createUser = async (req,res) =>{

    try{

        // check email
        const checkEmail = await UserModel.findOne({email:req.body.email})
        if(checkEmail){
            return res.status(400).json({message : "this email already exiest..!"})
        }

        // check phone
        const checkPhone = await UserModel.findOne({phone: req.body.phone})
        if(checkPhone){
            return res.status(400).json({message : "this phone number already exiest..!"})
        }

        const user = await UserModel.create(req.body)
        if(user){
            return res.status(200).json({
                user,
                message:"user successfully created.!"
            })
        }
        
    } catch(e){

        if(e.name === "ValidationError"){
            const error = Object.values(e.errors).map(err => err.message)
            return res.status(400).json({
                message:"validation error",
                error
            })
        }
        
        res.status(500).json({
            message : "server error",
            e
        })

    }

}

export const updateUser = async (req,res) =>{
    
    // check email
        // const checkEmail = await UserModel.findOne({email:req.body.email})
        // if(checkEmail){
        //     return res.status(400).json({message : "this email already exiest..!"})
        // }

    // check phone
        // const checkPhone = await UserModel.findOne({phone: req.body.phone})
        // if(checkPhone){
        //     return res.status(400).json({message : "this phone number already exiest..!"})
        // }

        const user = await UserModel.updateOne(
            { _id: req.body._id },
            { $set: req.body }
        )
        if(user){
            return res.status(200).json({
                user,
                message:"user successfully updated.!"
            })
        }
    
}

export const deleteUser = async (req,res) =>{
    const user = await UserModel.deleteOne({ _id: req.body._id })
        if(user){
            return res.status(200).json({
                user,
                message:"user successfully deleted.!"
            })
        }

}




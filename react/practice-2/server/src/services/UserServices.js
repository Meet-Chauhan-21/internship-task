import UserModel from "../model/User.js"

export const getAlluser = async ()=>{
    const users = await UserModel.find()
    return users
}

export const createNewUser = async (data)=>{
    const users = await UserModel.create(data)
    return users
}

export const updateUserById = async (data)=>{
    const users = await UserModel.updateOne(data)
    return users
}

export const deleteUserById = async (data)=>{
    const users = await UserModel.deleteOne(data)
    return users
}



const express = require("express")
const User = require("../model/User")

const getAllUsers = async(req,res)=>{
    const users = await User.find()
    return res.status(200).json(users);
}
const getUsersById = async(req,res)=>{
    const id = req.params.id
    const user = await User.findById(id)
    return res.status(200).json(user)
}
const createUser= async(req,res)=>{
    const user = req.body
    const created_user = await User.create(user)
    return res.status(201).json(created_user)
}
const updateUserById= async(req,res)=>{
    const id = req.params.id
    const user = req.body
    const updated_user = await User.updateOne({_id: id},user)
    return res.status(200).json(updated_user)
}
const deleteUserById= async(req,res)=>{
    const id = req.params.id
    const delete_user = await User.deleteOne({_id:id})
    return res.status(200).json({status: "successfully deleted",data: delete_user})
}

module.exports = {
    getAllUsers,
    getUsersById,
    createUser,
    updateUserById,
    deleteUserById,
}
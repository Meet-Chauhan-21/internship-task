import { createNewUser, deleteUserById, getAlluser, updateUserById } from "../services/UserServices.js"
import { createUserValidation } from "../validation/validation.js"

export const getUser = async (req,res) => {
    const users = await getAlluser()
    res.send(users)
}

export const createUser = async (req,res) =>{

    try{
        // validate valid user
        const {error} = createUserValidation.validate(req.body);
        if(error){
            console.log("error === ",error)
            return res.send(error)
        }

        const users = await createNewUser(req.body)
        res.send(users)
        
    } catch(e){
        console.log(e)
    }
}

export const updateUser = async (req,res) =>{

    const users = await updateUserById(req.body)
    res.send(users)
}

export const deleteUser = async (req,res) =>{
    const users = await deleteUserById(req.body)
    res.send(users)
}




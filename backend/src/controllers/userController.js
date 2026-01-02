import { createUserService, deleteUserByIdService, getAllUserService } from "../services/userService.js"

//get by id
export const getUserByIController =async(req,res)=>{
    try {
        return res.status(200).json({message:"Get user thành công",data:req.user})
    } catch (error) {
        return res.status(400).json({message:error.message||"Lỗi hệ thống !"})
    }
}

//get all
export const getAllUserController = async (req,res)=>{
    try {
        const result = await getAllUserService();
        return res.status(200).json({message:"get All thành công",data:result})
    } catch (error) {
        return res.status(400).json({message:error.message || "Lỗi hệ thống "})
    }
}

// delete 
export const deleteUserByIdController = async (req,res)=>{
    try {
        const {id} =req.params;
        const result = await deleteUserByIdService(id);
        if(result){
            return res.status(200).json({message:"Xóa thành công"})
        }

    } catch (error) {
        return res.status(400).json({message:error.message || "Lỗi hệ thống "})
    }
}
// update
//create
export const createUserController =async (req,res)=>{
    try {
        const result =await createUserService(req.body)
        if(result){
            return res.status(200).json({message:result})
        }
    } catch (error) {
           return res.status(400).json({message:error.message || "Lỗi hệ thống "})
    }
}
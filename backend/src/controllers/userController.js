import { createUserService, deleteUserByIdService, getAllUserService } from "../services/userService.js"
//get by id
//get all
export const getAllUserController = async (req,res)=>{
    try {
        const {search,status,tier,fromDate,toDate,page=1,sizePage=10}=req.query;
        const result = await getAllUserService(page,sizePage,{search,status,tier,fromDate,toDate});
        return res.status(200).json({
            message:"get All user thành công",
            data:result
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message || "Lỗi hệ thống "
        })
    }
}

// delete 
export const deleteUserByIdController = async (req,res)=>{
    try {
        const {id} =req.params;
        const result = await deleteUserByIdService(id);
        if(result){
            return res.status(204).json({message:"Xóa thành công"})
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
            return res.status(201).json({message:"Tạo tài khoản thành công",user:result})
        }
    } catch (error) {
           return res.status(400).json({message:error.message || "Lỗi hệ thống "})
    }
}
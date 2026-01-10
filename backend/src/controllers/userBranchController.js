import { createUserBranchService, deleteUserBranchByIdService, getAllUserBranchService } from "../services/userBranchService.js";

//get all staff
export const getAllUserBranchController = async (req,res)=>{
    try {
        const {search,status,tier,fromDate,toDate,page=1,sizePage=10}=req.query;
        const result = await getAllUserBranchService(page,sizePage,{search,status,tier,fromDate,toDate});
        return res.status(200).json({
            message:"get All userBranch thành công",
            data:result
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message || "Lỗi hệ thống "
        })
    }
}

//create userbranch
export const createUserBranchController =async (req,res)=>{
    try {
        const result =await createUserBranchService(req.body)
        if(result){
            return res.status(201).json({message:"Tạo tài khoản thành công",userBranch:result})
        }
    } catch (error) {
           return res.status(400).json({message:error.message || "Lỗi hệ thống "})
    }
}

// delete 
export const deleteUserBranchByIdController = async (req,res)=>{
    try {
        const {id} =req.params;
        const result = await deleteUserBranchByIdService(id);
        if(result){
           return res.status(204).send();
        }

    } catch (error) {
        return res.status(400).json({message:error.message || "Lỗi hệ thống "})
    }
}
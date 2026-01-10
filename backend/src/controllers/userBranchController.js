import { getAllUserBranchService } from "../services/userBranchService.js";

//get all staff
export const getAllUserBranchController = async (req,res)=>{
    try {
        const result = await getAllUserBranchService();
        return res.status(200).json({message:"get All userBranch thành công",data:result})
    } catch (error) {
        return res.status(400).json({message:error.message || "Lỗi hệ thống "})
    }
}
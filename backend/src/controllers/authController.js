import { signinService, signupService } from "../services/authService.js"

export const signupController = async (req,res)=>{
    try {
        const result= await signupService(req.body);
    return res.status(201).json({message:"đăng ký thành công",data:result})
    } catch (error) {
        return res.status(400).json({message:error.message || " Lỗi hệ thống"});
    }
}
export const signinController=async (req,res)=>{
    try {
        const result =await signinService(req.body);
        return res.status(200).json({message:"Đăng nhập thành công",data:result})
    } catch (error) {
        return res.status(400).json({message:error.message||"Lỗi hệ thống"})
    }
}
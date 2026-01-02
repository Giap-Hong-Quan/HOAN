import { sendOtpService, signinService, signupService, verifyOtpService } from "../services/authService.js"
// đăng ký
export const signupController = async (req,res)=>{
    try {
        const result= await signupService(req.body);
    return res.status(201).json({message:"đăng ký thành công",data:result})
    } catch (error) {
        return res.status(400).json({message:error.message || " Lỗi hệ thống"});
    }
}
// dăng nhập
export const signinController=async (req,res)=>{
    try {
        const result =await signinService(req.body);
        return res.status(200).json({message:"Đăng nhập thành công",data:result})
    } catch (error) {
        return res.status(400).json({message:error.message||"Lỗi hệ thống"})
    }
}

export const sendOtpController =async (req,res)=>{
    try {
        const {email}=req.body;
        if(!email){
            return res.status(400).json({ message: "Thiếu email" });
        }
        const result =await sendOtpService(email);
        return res.status(200).json({message:result});
    } catch (error) {
        return res.status(400).json({message:error.message||"Lỗi hệ thống"})
    }
}
// verifyOtp
export const verifyOtpController =async (req,res)=>{
    try {
        const { email, otp } = req.body;
        const result =await verifyOtpService( email, otp )
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({message:error.message||"Lỗi hệ thống"})
    }
}
import User from "../models/User.js";
import { sendOtpService, signinService, signupService, verifyOtpService } from "../services/authService.js"
import admin from "firebase-admin"
import { accessToken } from "../utils/jwt.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.join(__dirname, "../../serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath));
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
// gửi otp
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

// login gg 
//login gg 
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
export const loginGoogleController =async (req,res)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){return res.status(400).json({message:"token không tồn tại"})}
        const decoded = await admin.auth().verifyIdToken(token)
        const {email,name,picture,uid}=decoded;
        // Kiểm tra user trong database của bạn
        let exitUser = await User.findOne({ email }).populate("role");
        if(!exitUser){
            await User.create(
                {
                    full_name:name,
                    email,
                    avatar:picture,
                    provider:"google",
                    provider_id:uid,
                    isOTPEmail:true,
                    isActive:true,
                    lastLogin :new Date(),
                }
            )
        }else{
            const update ={
                isActive: true,
                lastLogin: new Date(),
                isOTPEmail:true,
            }
            if(!exitUser.provider_id){
                update.provider="google",
                update.provider_id=uid
            }
            await User.findByIdAndUpdate(exitUser._id,update)
        }
        exitUser = await User.findOne({ email }).populate("role");
        const accToken = accessToken(
            {
                id:exitUser._id,
                date :new Date(),
                role:exitUser.role.name
            }
        ) 
        return res.status(200).json({message:"Login thành công",data:{accToken}})
    } catch (error) {
        return res.status(400).json({message:error.message||"Lỗi hệ thống"})
    }
}
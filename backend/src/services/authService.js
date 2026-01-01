import User from "../models/User.js";
import Role from"../models/Role.js"
import { comparePassword, hashPassword } from "../utils/password.js";
import { accessToken } from "../utils/jwt.js";
// Đăng ký
export const signupService =async (payload)=>{
    try{ 
        const{full_name,email,password,role}=payload;
        if(!full_name || !email|| !password){
            throw new Error("Vui lòng nhập đầy đủ thông tin");
        }
        const user = await User.findOne({email:email});
        if(user){
            throw new Error("Email đã tồn tại!");
        }
        const roleid= await Role.findOne({name:"user"});
        if(!roleid){throw new Error("Role không tồn tại")};
        const signup =await User.create(
            {
               full_name:full_name,
               email:email,
               password:hashPassword(password),
               role:role || roleid._id
            }
        )
        if(!signup){
            throw new Error("Đăng ký thất bại");
        }
        return signup;
    }catch(error){
        console.error("DB error:", error)
        throw error;
    }
}
// đăng nhập 
export const signinService =async (payload)=>{
    try {
        const {email,password}=payload;
        if(!email|| !password){throw new Error("Chưa nhập đủ thông tin")};
        const exit= await User.findOne({email:email}).populate("role");
        if(!exit){
            throw new Error("Email  không chính xác");
        }
        const isMatch = comparePassword(password,exit.password)
        if (!isMatch) {
        throw new Error("Email hoặc mật khẩu không chính xác");
            }
        const accToken = accessToken(
            {
                id:exit._id,
                role:exit.role.name
            }
        )
        const updateACtive = await User.findByIdAndUpdate(exit._id,{isActive:true})
        return {accToken} 
    } catch (error) {
        console.error("lỗi",error)
        throw error;
    }
}
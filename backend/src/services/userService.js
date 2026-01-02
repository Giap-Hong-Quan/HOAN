import User from "../models/User.js"
import Role from "../models/Role.js"
import { hashPassword } from "../utils/password.js";

//get all
export const getAllUserService =async()=>{
    const allUser= await User.find().select("-password");
    if(!allUser) throw new Error("Không lấy được tất cả user")
    return allUser;
}
//delete 
export const deleteUserByIdService= async(userId)=>{
    const deleteUser = await User.findByIdAndDelete(userId);
    if(!deleteUser) throw new Error ("Xóa không thành công")
    return deleteUser; // xóa thành công
}
// update
export const updateUserByIdService =async (userId ,payload)=>{
  const{full_name,email,role}=payload;
  if(!full_name||!email){throw new Error ("Vui lòng nhập đầy đủ thông tin")};
  const roleId=await Role.findOne({name:"user"})
  const data={
    full_name,
    email,
    role:role||roleId._id
  }
  const updateUSer =await User.findByIdAndUpdate(userId,data,  { new: true } );
  if(!updateUSer){throw new Error ("Cập nhật thất bại")}
  return updateUSer;
}
// create usser ain damin
export const createUserService = async (payload)=>{
  const {full_name,email,password,roleId}=payload;
  if(!full_name||!email||!password||!roleId){throw new Error ("Vui lòng nhập đầy đủ thông tin")};
  const exitUser= await User.findOne({email});
  if(exitUser){throw new Error("Email đã tồn tại")}
  const createUser =await User.create(
    {
      full_name,
      email,
      password:await hashPassword(password),
      role:roleId,
      createdBy:"admin"
    }
  )
  if(createUser){
    return {message:"Tạo tài khoản thành công"}
  }
}
import User from "../models/User.js"
import Role from "../models/Role.js"

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
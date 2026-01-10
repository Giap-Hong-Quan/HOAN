import Role from "../models/Role.js";
import User from "../models/User.js";
import Branch from "../models/Branch.js";
import { hashPassword } from "../utils/password.js";
// get all staff
export const getAllUserBranchService =async(page=1,sizePage=10,filter={})=>{
   //Bước 1: lọc dữ liệu 
  const {search,status,tier,fromDate,toDate}=filter;
  const query ={deletedAt:null}
  if(search){
    query.$or=[   // tìm kiếm 1 trong 2 điều kiên fullname or email 
      {full_name:{$regex:search,$options:"i"}},     // $regex: chuỗi cần tìm kiếm , 
      {email:{$regex:search,$options:"i"}},                                              // $options: cài đặt cho regex  
                                                    // i là không phân biệt hoa thường 
                                                    // m là multi line
                                                    // g tìm toàn bộ 
    ]
  }
  if(status!==undefined){
    query.isActive = status === "active"?true:false;
  }
  if(tier){
    query.membership_tier = tier;
  }
  if(fromDate || toDate){
    query.createdAt = {}
    if(fromDate) query.createdAt.$gte = new Date(fromDate);  // lơn hơn bằng 
    if(toDate) query.createdAt.$lte = new Date(toDate);       // Bé hơn bằng 
  }
   // Bước 2 Lây dữ liệu theo lọc 
  //đảm bảo dữ liệu số nguyên dương 
  const currentPage = Math.max(1,parseInt(page));
  const limit = Math.max(1, parseInt(sizePage));
    //tim toán bỏ qua 
  const skipPage = (currentPage -1) * limit;
  const roleBranch  = await Role.findOne({name:"branch"});
  query.role = roleBranch._id;
  if(!roleBranch ){throw new Error("role branch không tồn tại")};
  const [allUserBranch,count] = await Promise.all([
                            User.find(query)
                            .sort({createdAt:-1})
                            .select("-password -wishlist -accumulated_points -membership_tier -addresses")
                            .populate("role","name")
                            // .populate("branch");           // mở ra khi làm api branch
                            .skip(skipPage)
                            .limit(limit)
                            .lean(),
                            User.countDocuments(query)
      ])
    if(!allUserBranch) throw new Error("Không lấy được tất cả userbranch")
    return {
            UserBranches:allUserBranch,
            totalUser:count,
            totalPage:Math.ceil(count / limit),
            currentPage: currentPage,
            sizePage:limit
          }
}


// create userbranch in damin
export const createUserBranchService = async ({full_name,email,password,branch})=>{
  if(!full_name||!email||!password||!branch){throw new Error ("Vui lòng nhập đầy đủ thông tin")};
  const exitUserBrach= await User.findOne({email});
  if(exitUserBrach){throw new Error("Email đã tồn tại")}
  const roleBranch =await Role.findOne({name:"branch"})
  if(!roleBranch){throw new Error("Role branch không tồn tại")};
  const createUser =await User.create(
    {
      full_name,
      email,
      password:await hashPassword(password),
      role:roleBranch._id,
      createdBy:"admin",
      isOTPEmail: true,
      branch
    }
  )
  return createUser;
}
//delete 
export const deleteUserBranchByIdService= async(userId)=>{
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      {deletedAt:new Date()},
      {new:true}
    );
    if(!deleteUser) throw new Error ("Xóa không thành công")
    return deleteUser; // xóa thành công
}
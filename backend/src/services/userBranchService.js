import Role from "../models/Role.js";
import User from "../models/User.js";
import Branch from "../models/Branch.js";
// get all staff
export const getAllUserBranchService =async()=>{
  const roleBranch  = await Role.findOne({name:"branch"});
  if(!roleBranch ){throw new Error("role branch không tồn tại")};
    const allUserBranch= await User.find({role:roleBranch ._id})
    .select("-password -wishlist -accumulated_points -membership_tier -addresses")
    .populate("role","name")
    // .populate("branch");
    const count = await User.countDocuments({role:roleBranch ._id})
    if(!allUserBranch) throw new Error("Không lấy được tất cả userbranch")
    return {count,userBranches:allUserBranch};
}
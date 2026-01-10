import Branch from "../models/Branch.js";
//create
export const createBranchService = async({name,address={},phone,opening_hours,location={}})=>{      
    const create = await Branch.create(
        {
            name,
            address,
            phone,
            opening_hours,
            location 
        }
    )
    return create;
}
//get all
export const getBranchByIdService =async(branchId)=>{
    const branch =await Branch.findById(branchId);
  if (!branch) {
    throw new Error("Chi nhánh không tồn tại");
  }
    return branch;
}
// delete
export const deleteBranchService =async(branchId)=>{
    const deleteBranch =await Branch.findByIdAndUpdate(branchId,{deletedAt:new Date},{new:true});
    if(!deleteBranch){throw new Error("Xóa không thành công")};
    return deleteBranch;
}

//get all
export const getAllBranchService = async({page=1,sizePage=10,search})=>{
    // loc du lieu
    const query ={deletedAt:null};
    if(search){
        query.$or=[
            {name:{$regex:search,$options:"i"}},
            {"address.text": { $regex: search, $options: "i" }},
            { "address.street": { $regex: search, $options: "i" } },
            { "address.ward": { $regex: search, $options: "i" } },
            { "address.district": { $regex: search, $options: "i" } },
            { "address.city": { $regex: search, $options: "i" } }
        ]
    }
    const currentPage = Math.max(1,parseInt(page));
    const limit = Math.max(1,parseInt(sizePage));
    const skipPage = (currentPage - 1) * limit;

    // get dư liệu 
    const [getAllBranch,count] =await Promise.all([
                                    Branch.find(query)
                                    .skip(skipPage)
                                    .limit(limit)
                                    .lean(),
                                    Branch.countDocuments(query)]
                                )
    if(!getAllBranch){throw new Error("Get tất cả chi nhánh thất bại")};
    return {
        branches:getAllBranch,
        totalBranch:count,
        totalPage:Math.ceil(count / limit),
        currentPage: currentPage,
        sizePage:limit
    };
}
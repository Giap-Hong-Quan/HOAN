import removeVietnameseTones from "../config/removeVietnameseTones.js";
import toSearchTextSlugify from "../config/toSearchTextSlugify.js";
import ApiError from "../exceptions/ApiError.js";
import Category from "../models/Category.js"
//create
export const createCategoryService =async({name,parent})=>{
    const exitName= await Category.findOne({name});
    if(exitName){
        throw new ApiError(409,"Tên danh mục đã tồn tại");
    }
    if(parent){
        const exitParent =await Category.findById(parent)
        if(!exitParent){
            throw new ApiError(404,"Danh mục cha không tồn tại");
        }
    }
    const category = await Category.create({
        name,
        slug:toSearchTextSlugify(name),
        parent:parent||null
    })
    return category;
}
// get byid (admin)
export const getCategoryByIdService = async(categoryId)=>{
    const category =await Category.findById(categoryId);
    if(!category){
        throw new ApiError(404,"Danh mục không tồn tại");
    }
    return category;
}
// get by slug (client) support seo
export const getCategoryBySlugService =async(slug)=>{
    const exitSlug =  await Category.findOne({slug});
    if(!exitSlug){
        throw new ApiError(404,"Danh mục không tồn tại")
    }
    return exitSlug;
}
// active category 
export const activeCategoryService =async(categoryId)=>{
   const exitCategory = await Category.findById(categoryId);
    if(!exitCategory){
        throw new ApiError(404,"Danh mục không tồn tại")
    }
   // Nếu đã xóa -> luôn để isActive = false
    if (exitCategory.deletedAt !== null) {
        const active = await Category.findByIdAndUpdate(
            categoryId,
            { isActive: false },
            { new: true }
        );
        return active;
    }
    // Nếu chưa xóa -> toggle
    const active = await Category.findByIdAndUpdate(
        categoryId,
        { isActive: !exitCategory.isActive },
        { new: true }
    );
    return active;
}
// xoa 
export const deleteCategoryService =async(categoryId)=>{
    const exitCategory = await Category.findById(categoryId);
    if(!exitCategory){
        throw new ApiError(404,"Danh mục không tồn tại")
    }
    if(exitCategory.deletedAt!== null){
        throw new ApiError(409,"Danh mục đã được xóa")
    }
    const data={
        isActive :false,//toggle
        deletedAt:new Date() 
    }
    const deleteCategory= await Category.findByIdAndUpdate(categoryId,data,{new:true});
    return deleteCategory;
}
// khôi phục danh mục đã xóa 
export const restoreCategoryService  =async(categoryId)=>{
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new ApiError(404, "Danh mục không tồn tại");
    }
    if (!category.deletedAt) {    //!category.deletedAt  null, undefined, "", 0, false, NaN
        throw new ApiError(409, "Danh mục này chưa bị xóa");
    }
    const restoreCategory= await Category.findByIdAndUpdate(categoryId,{deletedAt:null},{new:true});
    return restoreCategory;
}
//get all filter pagation
export const getAllCategoryService=async({page=1,sizePage=10,search})=>{
    const query = {deletedAt:null}
    const currentPage =Math.max(1,parseInt(page));
    const limit= Math.max(1,parseInt(sizePage));
    const skip =(currentPage -1) *limit;
    const searchTrim = search.trim();
    // Chỉ xử lý bỏ dấu khi thực sự có từ khóa search
    const cleanSearch =removeVietnameseTones(searchTrim)
 if(search){
    query.$or =[
        {name:{$regex:searchTrim,$options:"i"}},
        {noAccentName:{$regex:cleanSearch.trim(),$options:"i"}},
    ]
 }
    const [getAll,count]= await Promise.all([
                            Category.find(query)
                            .collation({ locale: "vi", strength: 1 })
                            .skip(skip)
                            .limit(limit)
                            .lean(),
                            Category.countDocuments(query)]
    )
    return {
        categories:getAll,
        totalCategory:count,
        totalPage:Math.ceil(count / limit),
        currentPage,
        sizePage:limit,
    }   
}

import { activeCategoryService, createCategoryService, deleteCategoryService, getAllCategoryService, getCategoryByIdService, getCategoryBySlugService, restoreCategoryService } from "../services/categoryService.js";
import { success } from "../utils/success.js";
//create
export const createCategoryController =async(req,res,next)=>{
    try {
        const {name,parent}=req.body
        if(!name || typeof name !== "string"){
            return res.status(400).json({
                success:false,
                message:"Vui lòng nhập tên danh mục"
            })
        }
        const result= await createCategoryService({name,parent})
        if(result){
          success(res,result,"Tạo danh mục thành công",201)
        }
    } catch (error) {
      next(error)
    }
}
// getCategoryByI  (admin)
export const getCategoryByIdController =async(req,res,next)=>{
    try {
        const {id}=req.params;
        if(!id || typeof id !== "string"){
            return res.status(400).json({
                success:false,
                message:"Nhập id danh mục hoặc không đúng định dạng"
            })
        }
        const result =await getCategoryByIdService(id)
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Không tìm thấy danh mục với Id này"
            })
        }
        success(res,result,`Lấy chi tiết danh mục: ${result.name}`,200)
    } catch (error) {
        next(error)
    }
}
// get by slug client supper seo
export const getCategoryBySlugController =async(req,res,next)=>{
    try {
        const {slug}=req.params;
        if(!slug || typeof slug !== "string"){
            return res.status(400).json({
                success:false,
                message:"Nhập slug danh mục hoặc không đúng định dạng"
            })
        }
        const result =await getCategoryBySlugService(slug);
        success(res,result,`Lấy chi tiết danh mục: ${result.name}`,200)
    } catch (error) {
        next(error)
    }
}
// active 
export const activeCategoryController =async(req,res,next)=>{
    try {
        const {id}=req.params;
        if(!id || typeof id !== "string"){
            return res.status(400).json({
                success:false,
                message:"Nhập id danh mục hoặc không đúng định dạng"
            })
        }
        const result =await activeCategoryService(id);
        success(res,result,"Cập nhật trạng thái danh mục thành công",200)
    } catch (error) {
        next(error)
    }
}

//delete
export const deleteCategoryController =async(req,res,next)=>{
    try {
        const {id}=req.params;
        if(!id || typeof id !== "string"){
            return res.status(400).json({
                success:false,
                message:"Nhập id danh mục hoặc không đúng định dạng"
            })
        }
        const result = await deleteCategoryService(id);
        success(res,result,"Xóa danh mục thành công",200)
    } catch (error) {
        next(error)
    }
}

// khoi phuc 
export const restoreCategoryController =async(req,res,next)=>{
    try {
        const{ id}= req.params;
        const result = await restoreCategoryService(id);
        success(res,result,"Khôi phục danh mục thành công",200)
    } catch (error) {
        next(error)
    }
}
//get all 
export const getAllCategoryController =async (req,res,next)=>{
    try {
        const {page,sizePage,search} =req.query;
        const result =await getAllCategoryService({page,sizePage,search});
        success(res,result,"Lấy danh sách danh mục thành công",200)
    } catch (error) {
        next(error)
    }
}
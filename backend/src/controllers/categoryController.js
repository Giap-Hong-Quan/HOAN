
import { createCategoryService, getCategoryByIdService } from "../services/categoryService.js";
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
// getCategoryByI
export const getCategoryByIdController =async(req,res,next)=>{
    try {
        const {id}=req.params;
        if(!id || typeof id !== "string"){
            return res.status(400).json({
                success:false,
                message:"Id danh mục không tồn tại hoặc không đúng định dạng"
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
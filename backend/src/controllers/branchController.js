import { createBranchService, deleteBranchService, getAllBranchService, getBranchByIdService } from "../services/branchService.js";
//create
export const createBranchController =async(req,res) =>{
    try {
        const {name,text,street,ward,district,city,phone,opening_hours,lat,lng}=req.body;
       if(!name||!text||!street||!ward||!district||!city||!phone||!opening_hours||!lat||!lng){
        return res.status(400).json({message:"Vui lòng nhập đầy đủ thông tin "});
       }
   
       const result = await createBranchService({name,address:{text,street,ward,district,city},phone,opening_hours,location:{lat,lng}})
        return res.status(201).json({
            message:"Tạo chi nhánh thành công",
            branch:result
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message||"Lỗi hệ thống"
        });
    }
}
//get by id
export const getBranchByIdController =async (req,res)=>{
    try {
        const {id}=req.params;
        const result =await getBranchByIdService(id)
            return res.status(200).json({
                message: "Lấy chi nhánh thành công",
                branch: result
            });
    } catch (error) {
          return res.status(400).json({
            message:error.message||"Lỗi hệ thống"
        });
    }
}
//delete 
export const deleteBranchController = async(req,res)=>{
    try {
        const {id}=req.params;
        const result =await deleteBranchService(id)
        if(result){
            return res.status(204).send()
        }
    } catch (error) {
         return res.status(400).json({
            message:error.message||"Lỗi hệ thống"
        });
    }
}
//get all
export const getAllBranchController =async(req,res)=>{
    try {
        const {page,sizePage,search}=req.query;
        const result =await getAllBranchService({page,sizePage,search});
        if(result){
             return res.status(200).json({
                message: "Lấy tất cả chi nhánh thành công",
                data: result
            });
        }
    } catch (error) {
          return res.status(400).json({
            message:error.message||"Lỗi hệ thống"
        });
    }
}
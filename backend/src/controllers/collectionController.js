import { createCollectionService, deleteByIdService, getAllCollectionService, getCollectionByIdService } from "../services/CollectionService.js"

// create 
export const createCollectionController =async (req,res)=>{
    try {
        const banner_url =req.files.banner_url?.[0].path;
        const thumbnail_url=req.files.thumbnail_url?.[0].path;
        const{name}=req.body;
        if(!name||!banner_url||!thumbnail_url){
            return res.status(400).json({message:"Vui lòng nhập đầy đủ thông tin"});
        }
        const result = await createCollectionService({name,banner_url,thumbnail_url});
        return res.status(200).json({message:"Tạo bộ sưu tập thành công",collection:result})
    } catch (error) {
        console.error(error);
        return res.status(400).json({message:error.message||"Lỗi hệ thống"})
    }
}
//getall
export const getAllCollectionController = async (req,res)=>{
    try {
        const result =await getAllCollectionService();
        return res.status(200).json({message:"Lấy tất cả bộ sưu tập thành công",collection:result})
    } catch (error) {
        return res.status(400).json({message:error.message||"Lôi hệ thống"});
    }
}
//getbyid
export const getCollectionByIdController =async (req,res) =>{
    try {
        const {id}=req.params;
        const result =await getCollectionByIdService(id);
        return res.status(200).json({message:"Lấy bộ sưu tập thành công",collection:result})
    } catch (error) {
        return res.status(400).json({message:error.message||"Lôi hệ thống"});
    }
}
// xóa 
export const deleteByIdController = async(req,res)=>{
    try {
        const {id}=req.params;
        await deleteByIdService(id);
        return res.status(200).json({message:"Xóa bộ sưu tập thành công",})
    } catch (error) {
        return res.status(400).json({message:error.message||"Lôi hệ thống"});
    }
}
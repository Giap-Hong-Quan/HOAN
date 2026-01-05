
import Collection from "../models/Collection.js";
import { activeCollectionService, createCollectionService, deleteByIdService, getAllCollectionService, getCollectionByIdService, updateCollectionService } from "../services/CollectionService.js"
import { uploadToCloudinary } from "../utils/uploadCloudinary.js";

// create 
export const createCollectionController =async (req,res)=>{
    try {
        const{name}=req.body;
        if(!name){
            return res.status(400).json({message:"Vui lòng nhập đầy tên"});
        }
        if(!req.files.banner_url||!req.files.thumbnail_url){
            return res.status(400).json({message:"Vui lòng nhập đầy hình ảnh"});
        }
        const exitName =await Collection.findOne({name});
        if(exitName){
            return res.status(400).json({message:"Bộ sưa tập đã tồn tại"});
        }
        const banner = await uploadToCloudinary(req.files.banner_url[0].buffer);
        const thumbnail = await uploadToCloudinary(req.files.thumbnail_url[0].buffer);
        const result = await createCollectionService(
            {
                name,
                banner_url:banner.secure_url,
                thumbnail_url:thumbnail.secure_url
            }
        );
        return res.status(200).json({message:"Tạo bộ sưu tập thành công",collection:result})
    } catch (error) {
        console.error(error);
        return res.status(400).json({message:error.message||"Lỗi hệ thống"})
    }
}
//getall
export const getAllCollectionController = async (req,res)=>{
    try {
        const result =await getAllCollectionService({createAt:-1});
        return res.status(200).json({message:"Lấy tất cả bộ sưu tập thành công",data:result})
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
//update
export const updateCollectionController =async (req,res)=>{
    try {
        const {id}=req.params;
        const{name}=req.body; 
         // Check tồn tại Collection
        const collection = await Collection.findById(id);
        if (!collection){
            return res.status(400).json({message:"Bộ sưu tập không tồn tại"});
        }
        if(!name){
            return res.status(400).json({message:"Vui lòng nhập đầy tên"});
        }
        if(!req.files.banner_url||!req.files.thumbnail_url){
            return res.status(400).json({message:"Vui lòng nhập đầy hình ảnh"});
        }
        const nameExists = await Collection.findOne({ name, _id: { $ne: id } });
        if (nameExists) {
            return res.status(400).json({message:"Tên bộ sưu tập đã được sử dụng"});
        }
        const banner = await uploadToCloudinary(req.files.banner_url[0].buffer);
        const thumbnail = await uploadToCloudinary(req.files.thumbnail_url[0].buffer);

        const result = await updateCollectionService(id,
            {
                name,
                banner_url:banner.secure_url,
                thumbnail_url:thumbnail.secure_url
            });
        return res.status(200).json({message:"Update bộ sưu tập thành công",collection:result})
    } catch (error) {
         return res.status(400).json({message:error.message||"Lôi hệ thống"});
    }
}

//active
export const activeCollectionController =async(req,res)=>{
    try {
        const {id}=req.params;
        const result = await activeCollectionService(id);
        if(!result) {throw new Error("Active không thành công")};
        return res.status(200).json({message:"Active thành công!",collection:result})
    } catch (error) {
        return res.status(400).json({message:error.message||"Lỗi hệ thống"});
    }
}

import { createBranchService } from "../services/branchService.js";

export const createBranchController =async(req,res) =>{
    try {
        const {name,text,street,ward,district,city,phone,opening_hours,lat,lng}=req.body;
       if(!name||!text||!street||!ward||!district||!city||!phone||!opening_hours||!lat||!lng){
        return res.status(400).json({message:"Vui lòng nhập đầy đủ thông tin "});
       }
   
       const result = await createBranchService({name,address:{text,street,ward,district,city},phone,opening_hours,location:{lat,lng}})
        return res.status(201).json({
            message:"Tạo branch thành công",
            branch:result
        })
    } catch (error) {
        return res.status(400).json({message:error.message||"Lỗi hệ thống"});
    }
}
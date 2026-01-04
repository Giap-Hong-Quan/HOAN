import Collection from "../models/Collection.js"
// create collection
export const createCollectionService = async({ name, banner_url, thumbnail_url })=>{
    const exitName =await Collection.findOne({name});
    if(exitName){
        throw new Error("Bộ sưa tập đã tồn tại");
    }
    const newCollection = await Collection.create(
            {
                name,
                banner_url,
                thumbnail_url,
            }
        )
return newCollection;
}
// getall collection
export const getAllCollectionService=async()=>{
    const collection= await Collection.find();
    if(!collection) throw new Error("Không lấy được tất cả user")
    return collection;
}
// getbyid
export const getCollectionByIdService = async (id)=>{
    const collection =await Collection.findById(id);
    if(!collection){throw new Error("Không lấy được bộ sưu tập")};
    return collection;
}

//xoa 
export const deleteByIdService = async (id)=>{
    const collection =await Collection.findByIdAndDelete(id);
     if(!collection){throw new Error("Xóa không thành công")};
    return collection
}
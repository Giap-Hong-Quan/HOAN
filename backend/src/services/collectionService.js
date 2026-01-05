import Collection from "../models/Collection.js"
// create collection
export const createCollectionService = async({ name, banner_url, thumbnail_url })=>{
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
    const result= await Collection.aggregate([
       {
        $facet:{
            collections:[{$sort:{createdAt:-1}}],
            count:[{$count:'count'}]
        }
       }
    ]);
    if(!result) throw new Error("Không lấy được tất cả user")
    const collections=result[0].collections;
    const count = result[0].count[0]?.count || 0;
    return {collections,count};
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

// update 
export const updateCollectionService =async(id,payload)=>{
    const { name, banner_url, thumbnail_url } = payload;

    const updated = await Collection.findByIdAndUpdate(
        id,
        { name, banner_url, thumbnail_url },
        { new: true } // trả về data mới
    );
    if (!updated) throw new Error("Cập nhật không thành công");
    return updated;
}

// active 
export const activeCollectionService = async (id)=>{
    // check tồn tại collection 
    const collection =await Collection.findById(id)
    if(!collection){throw new Error("Bộ sưu tập không tồn tại")};
    
    // Toggle isActive bằng pipeline (tối ưu nhất)
    const update =await Collection.findByIdAndUpdate(id,{ isActive: !collection.isActive },{new:true});
    if(!update){throw new Error ("Cập nhật trạng thái không thành công")};
    return update;
}
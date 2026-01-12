import ApiError from "../exceptions/ApiError.js";
import Category from "../models/Category.js"
import slugify from "slugify"
//create
export const createCategoryService =async({name,parent})=>{
    const exitName= await Category.findOne({name});
    if(exitName){
        throw new ApiError(400,"Tên danh mục đã tồn tại");
    }
    if(parent){
        const exitParent =await Category.findById(parent)
        if(!exitParent){
            throw new ApiError(400,"Danh mục cha không tồn tại");
        }
    }
    const category = await Category.create({
        name,
        slug:slugify(name, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: false,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi',      // language code of the locale to use
            trim: true         // trim leading and trailing replacement chars, defaults to `true`
        }),
        parent:parent||null
    })
    if(!category){
        throw new Error("Tạo danh mục không thành công");
    }
    return category;
}

// get byid or slug
export const getCategoryByIdService = async(categoryId)=>{
    const category =await Category.findById(categoryId);
    if(!category){
        throw new ApiError(404,"Danh mục không tồn tại");
    }
    return category;
}
import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            unique:true,
            required:true,
        },
        banner_url:{
            type:String,
            required:true,
        },
        thumbnail_url:{
            type:String,
            required:true,
        },
        isActive:{
            type:Boolean,
            default:true
        }
    },
    {timestamps:true,versionKey:false}
)

export default mongoose.model("Collection",CollectionSchema);
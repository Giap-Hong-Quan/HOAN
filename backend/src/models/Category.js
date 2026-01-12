import mongoose from "mongoose";

const CategorySchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        slug: { 
            type: String,
            unique: true,
            lowercase: true
        },
        parent: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null, // null = category cấp 1 
        },
        isActive:{
            type:Boolean,
            default: true
        },
        deletedAt:{
            type:Date,
            default:null,
        }
    },{timestamps:true,versionKey:false}
)

export default mongoose.model("Category",CategorySchema);
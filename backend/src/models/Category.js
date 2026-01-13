import mongoose from "mongoose";
import removeVietnameseTones from "../config/removeVietnameseTones.js";

const CategorySchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        noAccentName:{
            type:String,         // index truy vấn nhanh 
            index:true
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
CategorySchema.pre("save", async function() {
    if (this.name) {
        this.noAccentName = removeVietnameseTones(this.name);
    }
});
export default mongoose.model("Category",CategorySchema);
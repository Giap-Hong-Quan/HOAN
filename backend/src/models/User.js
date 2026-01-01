import mongoose from "mongoose"
const User= new mongoose.Schema(
    {
        full_name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim: true
        },
        password:{
            type:String,
        },
        avatar :{
            type:String
        },
        isActive:{
            type:Boolean,
            default:false
        },
        role:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Role",
        }
    },
    {timestamps:true,versionKey:false}
)
const user=mongoose.model("User",User);
export default user;
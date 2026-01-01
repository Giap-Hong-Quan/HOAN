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
            lowercase: true,
            trim: true
        },
        password:{
            type:String,
            select: false,
        },
        avatar :{
            type:String
        },
        provider:{
            type:String,
            enum:["local","facebook","google"],
            default:"local"
        },
        provider_id:{
            type:String,
            index:true
        },
        isOTPEmail:{
            type:Boolean,
            default:false
        },
        isActive:{
            type:Boolean,
            default:false
        },
        role:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Role",
        },
        lastLogin:{
            type:Date,
        },
        deletedAt:{
            type:Date,
            default:null
        },
        createdBy: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

    },
    {timestamps:true,versionKey:false}
)
const user=mongoose.model("User",User);
export default user;
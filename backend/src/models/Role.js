import mongoose from "mongoose";

const Role = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
            enum:['user',"branch","admin"],default:"user",
            trim: true,
            lowercase: true 
        },
    },
    {timestamps:true,versionKey:false}
)
export default mongoose.model("Role",Role);

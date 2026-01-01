import mongoose from "mongoose";

const Role = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
            enum:['admin',"user"],default:"user",
             trim: true,
            lowercase: true 
        },
    },
    {timestamps:true,versionKey:false}
)
const role = mongoose.model("Role",Role);
export default role;
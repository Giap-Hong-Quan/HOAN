import mongoose from "mongoose";

const BranchSchema= new mongoose.Schema(
    {
        name:{type:String,required:true,trim:true,unique:true},
        address: {
            text: { type: String, required: true }, 
            street: String,
            ward: String,
            district: String,
            city: String
        },
        phone:{type:String,required:true},
        opening_hours:{type:String,required:true},
        location: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true }
        },
    },
    {timestamps:true,versionKey:false}
)
export default mongoose.model("Branch",BranchSchema)
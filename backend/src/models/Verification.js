import mongoose from "mongoose";

const VerificationSchema =mongoose.Schema(
    {
        email:{
            type:String,
            required: true,
            index: true,
        },
        code: {
            type: String,
            required: true,
        },
        type:{
            type:String,
            enum:["verify_email","reset_password"],
            required: true,
        },
         expiresAt: {
            type: Date,
            required: true,
        },
         used: {
            type: Boolean,
            default: false,
        },
    },{ timestamps: true }
)
export default mongoose.model("Verification", VerificationSchema);

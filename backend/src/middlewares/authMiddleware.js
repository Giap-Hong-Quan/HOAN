import Role from "../models/Role.js";
import User from "../models/User.js";
import Branch from "../models/Branch.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const verifyToken = async (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "Token không tồn tại" });
        }
        const token=authHeader.split(" ")[1]
        const decoded =verifyAccessToken(token);
        const checkRole = await Role.findOne({name:decoded.role})
        if(!checkRole){return res.status(400).json({message:"role name không hợp lệ"})};
        let user; 
        switch(decoded.role){
            case "user" :
                user = await User.findById(decoded.id).select("-password -branch").populate("role","name");
                break;
            case "branch":
                user = await User.findById(decoded.id).select("-password -wishlist -accumulated_points -membership_tier -addresses").populate("role","name").populate("branch")
                break;
            case "admin":
                user = await User.findById(decoded.id).select("-password -branch -wishlist -accumulated_points -membership_tier -addresses ").populate("role","name");
                break;
            default:
                return res.status(403).json({ message: "Role không được phép" });
        }   
        if(!user)return res.status(401).json({ message: "Không thấy user" });
        req.user=user
            next();
    } catch (error) {
         return res.status(401).json({message:error.message|| "Token không hợp lệ hoặc đã hết hạn" });
    }
}

export const verifyTokenAdmin = async (req,res,next)=>{
    try {
         const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "Token không tồn tại" });
        }
        const token=authHeader.split(" ")[1]
        const decoded =verifyAccessToken(token);
        if(decoded.role !=="admin"){return res.status(400).json({message:"KHông phải admin "})}
        const checkRole = await Role.findOne({name:decoded.role})
         if(!checkRole){return res.status(400).json({message:"role name không hợp lệ"})};
         const user = await User.findById(decoded.id).select("-password -branch").populate("role","name");
         if(!user)
            {return res.status(400).json({message:"User không tồn tại"})};
         next();
    } catch (error) {
        return res.status(401).json({message:error.message|| "Token không hợp lệ hoặc đã hết hạn cho admin" });
    }
}
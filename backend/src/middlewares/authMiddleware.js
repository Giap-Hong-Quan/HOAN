import User from "../models/User.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const verifyToken = async (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "Token không tồn tại" });
        }
        const token=authHeader.split(" ")[1]
        const decoded =verifyAccessToken(token);
        const user = await User.findById(decoded.id).select("-password").populate("role");
        if(!user)return res.status(401).json({ message: "Không thấy user" });
        req.user=user
            next();
    } catch (error) {
         return res.status(401).json({
      message: "Token không hợp lệ hoặc đã hết hạn",
      
    });
    }
}

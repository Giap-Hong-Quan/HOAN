import express from "express"
import { signinController, signupController,sendOtpController, verifyOtpController, loginGoogleController, getProfileController } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const authRouter =express.Router();
authRouter.post("/signup",signupController)
authRouter.post("/signin",signinController)
authRouter.post("/sendOtp",sendOtpController)
authRouter.post("/verifyOTp",verifyOtpController)
authRouter.post("/login-gg",loginGoogleController)
authRouter.get("/profile",verifyToken,getProfileController)
export default authRouter;
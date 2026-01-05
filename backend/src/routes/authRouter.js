import express from "express"
import { signinController, signupController,sendOtpController, verifyOtpController, loginGoogleController } from "../controllers/authController.js";
const authRouter =express.Router();
authRouter.post("/signup",signupController)
authRouter.post("/signin",signinController)
authRouter.post("/sendOtp",sendOtpController)
authRouter.post("/verifyOTp",verifyOtpController)
authRouter.post("/login-gg",loginGoogleController)
export default authRouter;
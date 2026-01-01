import express from "express"
import { signinController, signupController,sendOtpController, verifyOtpController } from "../controllers/authController.js";
const authRouter =express.Router();
authRouter.post("/signup",signupController)
authRouter.post("/signin",signinController)
authRouter.post("/otp",sendOtpController)
authRouter.post("/verifyOTp",verifyOtpController)
export default authRouter;
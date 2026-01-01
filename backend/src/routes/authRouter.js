import express from "express"
import { signinController, signupController } from "../controllers/authController.js";
const authRouter =express.Router();
authRouter.post("/signup",signupController)
authRouter.post("/signin",signinController)
export default authRouter;
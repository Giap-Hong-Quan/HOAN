import express from "express"
import { verifyTokenAdmin } from "../middlewares/authMiddleware.js";
import { getAllUserBranchController } from "../controllers/userBranchController.js";
const userBranchRouter = express.Router();
userBranchRouter.get("/",verifyTokenAdmin,getAllUserBranchController)
export default userBranchRouter;
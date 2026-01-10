import express from "express"
import { verifyTokenAdmin } from "../middlewares/authMiddleware.js";
import { createUserBranchController, deleteUserBranchByIdController, getAllUserBranchController } from "../controllers/userBranchController.js";
const userBranchRouter = express.Router();
userBranchRouter.get("/",verifyTokenAdmin,getAllUserBranchController)
userBranchRouter.post("/",verifyTokenAdmin,createUserBranchController)
userBranchRouter.delete("/:id",verifyTokenAdmin,deleteUserBranchByIdController)

export default userBranchRouter;
import express from "express";
import { createUserController, deleteUserByIdController, getAllUserController, getUserByIController } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();
userRouter.get("/",verifyToken,getAllUserController)
userRouter.get("/profile",verifyToken,getUserByIController)
userRouter.delete("/:id",verifyToken,deleteUserByIdController)
userRouter.post("",verifyToken,createUserController)
export default userRouter
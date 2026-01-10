import express from "express";
import { createUserController, deleteUserByIdController, getAllUserController } from "../controllers/userController.js";
import { verifyToken, verifyTokenAdmin } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();
userRouter.get("/",verifyTokenAdmin,getAllUserController)
userRouter.delete("/:id",verifyTokenAdmin,deleteUserByIdController)
userRouter.post("",verifyTokenAdmin,createUserController)
export default userRouter
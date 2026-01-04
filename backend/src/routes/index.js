import express from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import collectionRouter from "./collectionRouter.js";
const router = express.Router()
router.use("/auth",authRouter)
router.use("/user",userRouter)
router.use("/collection",collectionRouter)
export default router;
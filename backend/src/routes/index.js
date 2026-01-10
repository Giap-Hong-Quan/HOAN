import express from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import collectionRouter from "./collectionRouter.js";
import userBranchRouter from "./userBranchRouter.js";
const router = express.Router()
router.use("/auth",authRouter)
router.use("/user",userRouter)
router.use("/staff",userBranchRouter)
router.use("/collection",collectionRouter)
export default router;
import express from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import collectionRouter from "./collectionRouter.js";
import userBranchRouter from "./userBranchRouter.js";
import branchRouter from "./branchRouter.js";
import categoryRouter from "./categoryRouter.js";
const router = express.Router()
router.use("/auth",authRouter)
router.use("/user",userRouter)
router.use("/userBranch",userBranchRouter)
router.use("/collection",collectionRouter)
router.use("/branch",branchRouter)
router.use("/category",categoryRouter)
export default router;
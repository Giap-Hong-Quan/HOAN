import express from "express"
import { createBranchController } from "../controllers/branchController.js";

const branchRouter =express.Router();
branchRouter.post("/",createBranchController);
export default branchRouter;
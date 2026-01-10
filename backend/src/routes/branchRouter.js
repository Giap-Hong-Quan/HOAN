import express from "express"
import { createBranchController, deleteBranchController, getAllBranchController, getBranchByIdController } from "../controllers/branchController.js";

const branchRouter =express.Router();
branchRouter.post("/",createBranchController);
branchRouter.get("/",getAllBranchController);
branchRouter.get("/:id",getBranchByIdController);
branchRouter.delete("/:id",deleteBranchController);
export default branchRouter;
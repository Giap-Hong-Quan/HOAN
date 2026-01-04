import express from"express"
import { createCollectionController, deleteByIdController, getAllCollectionController, getCollectionByIdController } from "../controllers/collectionController.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const collectionRouter = express.Router();
collectionRouter.get("/",getAllCollectionController)
collectionRouter.get("/:id",getCollectionByIdController)
collectionRouter.delete("/:id",deleteByIdController)
collectionRouter.post("/",upload.fields([{name:"banner_url",maxCount:1},{name:"thumbnail_url",maxCount:1}]),createCollectionController)
export default collectionRouter;
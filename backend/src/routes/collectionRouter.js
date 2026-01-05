import express from"express"
import { activeCollectionController, createCollectionController, deleteByIdController, getAllCollectionController, getCollectionByIdController, updateCollectionController } from "../controllers/collectionController.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const collectionRouter = express.Router();
collectionRouter.get("/",getAllCollectionController)
collectionRouter.get("/:id",getCollectionByIdController)
collectionRouter.delete("/:id",deleteByIdController)
collectionRouter.put("/:id/active",activeCollectionController)
collectionRouter.post("/",upload.fields([{name:"banner_url",maxCount:1},{name:"thumbnail_url",maxCount:1}]),createCollectionController)
collectionRouter.put("/:id",upload.fields([{name:"banner_url",maxCount:1},{name:"thumbnail_url",maxCount:1}]),updateCollectionController)
export default collectionRouter;
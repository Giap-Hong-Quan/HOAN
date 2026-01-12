import express from "express"
import { createCategoryController, getCategoryByIdController } from "../controllers/categoryController.js"
const categoryRouter=express.Router();
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Tạo danh mục mới
 *     tags: [Category]
 *     description: API dùng để tạo danh mục mới, bao gồm tên danh mục, slug tự động sinh và danh mục cha (nếu có).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Áo Thun"
 *               parent:
 *                 type: string
 *                 nullable: true
 *                 description: ID danh mục cha (nếu có)
 *                 example: "67a8aecbf19fc340b0062caf"
 *     responses:
 *       201:
 *         description: Tạo danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tạo danh mục thành công"
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67a8b3d7d2b9c41d40fa1234"
 *                     name:
 *                       type: string
 *                       example: "Áo Thun"
 *                     slug:
 *                       type: string
 *                       example: "ao-thun"
 *                     parent:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *       400:
 *         description: Tên danh mục đã tồn tại
 *       500:
 *         description: Lỗi hệ thống
 */
categoryRouter.post("/",createCategoryController);
categoryRouter.get("/:id",getCategoryByIdController);
export default categoryRouter;

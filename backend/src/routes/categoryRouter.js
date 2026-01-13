import express from "express"
import { activeCategoryController, createCategoryController, deleteCategoryController, getAllCategoryController, getCategoryByIdController, getCategoryBySlugController, restoreCategoryController } from "../controllers/categoryController.js"
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
/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Lấy thông tin danh mục theo ID
 *     tags: [Category]
 *     description: Trả về thông tin chi tiết của một danh mục dựa trên ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của danh mục
 *     responses:
 *       200:
 *         description: Lấy danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "67a8b3d7d2b9c41d40fa1234"
 *                 name:
 *                   type: string
 *                   example: "Áo Thun"
 *                 slug:
 *                   type: string
 *                   example: "ao-thun"
 *                 parent:
 *                   type: string
 *                   example: null
 *       404:
 *         description: Không tìm thấy danh mục
 *       500:
 *         description: Lỗi hệ thống
 */
categoryRouter.get("/:id",getCategoryByIdController);
/**
 * @swagger
 * /category/slug/{slug}:
 *   get:
 *     summary: Lấy thông tin danh mục theo slug (SEO)
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Lấy danh mục thành công
 *       404:
 *         description: Không tìm thấy danh mục
 *       500:
 *         description: Lỗi hệ thống
 */
categoryRouter.get("/slug/:slug",getCategoryBySlugController);
/**
 * @swagger
 * /category/{id}/active:
 *   put:
 *     summary: Bật/tắt trạng thái danh mục
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy danh mục
 *       500:
 *         description: Lỗi hệ thống
 */
categoryRouter.put("/:id/active",activeCategoryController);
/**
 * @swagger
 * /category/{id}/delete:
 *   put:
 *     summary: Xóa danh mục (soft delete)
 *     tags: [Category]
 *     description: Đánh dấu danh mục là đã xóa bằng cách đặt isActive = false và deletedAt = thời gian hiện tại.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của danh mục cần xóa
 *     responses:
 *       200:
 *         description: Xóa danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Xóa danh mục thành công"
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
 *                     isActive:
 *                       type: boolean
 *                       example: false
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-12T08:23:45.123Z"
 *       404:
 *         description: Không tìm thấy danh mục
 *       409:
 *         description: Danh mục đã được xóa trước đó
 *       500:
 *         description: Lỗi hệ thống
 */
categoryRouter.put("/:id/delete",deleteCategoryController);
/**
 * @swagger
 * /category/{id}/restore:
 *   put:
 *     summary: Khôi phục danh mục đã bị xóa
 *     tags: [Category]
 *     description: Khôi phục một danh mục đã bị soft delete (đã có deletedAt). Sau khi khôi phục, isActive sẽ được đặt thành true và deletedAt trở về null.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của danh mục cần khôi phục
 *     responses:
 *       200:
 *         description: Khôi phục danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "67a8b3d7d2b9c41d40fa1234"
 *                 name:
 *                   type: string
 *                   example: "Áo Thun"
 *                 slug:
 *                   type: string
 *                   example: "ao-thun"
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 deletedAt:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Không tìm thấy danh mục
 *       409:
 *         description: Danh mục chưa bị xóa — không thể khôi phục
 *       500:
 *         description: Lỗi hệ thống
 */
categoryRouter.put("/:id/restore",restoreCategoryController);
categoryRouter.get("/",getAllCategoryController);
getAllCategoryController
export default categoryRouter;

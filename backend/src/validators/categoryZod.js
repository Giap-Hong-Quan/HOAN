import {z} from "zod";

export const createCategoryZod = z.object (
    {
        body:z.object({
            name:z.string().min(1,"Tên danh mục là bắc buộc"),
            parent:z.string().optional().nullable(),
        })
    }
)
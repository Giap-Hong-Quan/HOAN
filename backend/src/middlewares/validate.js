// Middleware dùng cho zod
export const validate =(schema) =>(req,res,next)=>{
    try {
        schema.parse({
            body:req.body,
            params:req.params,
            query:req.query
        });
        next();
    } catch (error) {
        return res.status(400).json({
            message:error.errors?.[0]?.message||"Dữ liệu không hợp lệ"
        })
    }
}
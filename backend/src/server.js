import 'dotenv/config';
import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import { seedData } from "./config/seeData.js";
import { swaggerDocs } from './config/swagger.js';
import { errorHandle } from './middlewares/errorMiddleware.js';

const app =express();
// dotenv.config();
app.use(cors());
app.use(express.json())
connectDB();
seedData();
swaggerDocs(app);
app.use('/v1/api',router);
app.use(errorHandle);
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Runnig with ${port}`)
})
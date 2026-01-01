import 'dotenv/config';
import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import { seedData } from "./config/seeData.js";

const app =express();
// dotenv.config();
app.use(cors());
app.use(express.json())
connectDB();
seedData();
app.use('/v1/api',router);
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Runnig with ${port}`)
})
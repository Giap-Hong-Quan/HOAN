import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"HOAN",
        resource_type:"image"
    }
})

export const upload = multer({ storage });
import mongoose from "mongoose";

const connectDB= async ()=>{
    try {
        const connect =await mongoose.connect(process.env.MONGODBATLAS)
        if(!connect){
          console.log("Kết nối thất bại !");
        }console.log("Kết nối thành công");
        
    } catch (error) {
        console.log("Lỗi hệ thống kb")
        process.exit(1);
    }
}
export default connectDB
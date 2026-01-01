import nodemailer from "nodemailer"
console.log("USERNAME:", process.env.EMAIL_USERNAME);
console.log("PASSWORD:", process.env.EMAIL_PASSWORD);
export const transporter = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use true for port 465, false for port 587
        auth: {
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        },
    }
);
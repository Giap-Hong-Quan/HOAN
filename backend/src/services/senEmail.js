import { transporter } from "../config/nodeMailer.js";


export const sendEmail =async ({to,subject,html})=>{
    try {
        await transporter.sendMail(
            {
                from: `"HOAN" <${process.env.EMAIL_USERNAME}>`,
                to,
                subject,
                html,
            }
        )
        return true;
    } catch (error) {
        console.error("Gửi email lỗi:", error);
        throw new Error("Không gửi được email");
    }
}
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export class Nodemailer {

    static transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    static async testConnection() {
        try {
            await this.transporter.verify();
            console.log("Nodemailer is fine");
            return true;
        } catch (error) {
            console.error("Verification nodemailer failed:", error);
            return false;
        }
    }

}
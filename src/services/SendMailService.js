import { EmailService } from "./EmailService.js";
import { Nodemailer } from "../config/NodemailerConfig.js";
import dotenv from "dotenv";

dotenv.config();

export class SendMailService {
    static async sendMail(emailId) {

        if (!emailId) {
            console.log("Email-id is empty")
            return;
        }

        try {

            const email = await EmailService.getMailById(emailId);

            const emailInfo = {
                from: process.env.SMTP_USER,
                to: email.recipient,
                subject: email.subject,
                text: email.body,
            }

            await Nodemailer.sendMail(emailInfo);
            await EmailService.deleteEmail(email.id)

        } catch (error) {
            console.error("Error sending email", error)
        }

    }
}
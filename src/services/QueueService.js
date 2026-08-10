import EmailService from './EmailService.js';
import RabbitMQ from '../config/rabbitmq.js';


export class QueueService {

    static async processQueue() {
        try {
            const pendingEmails = await EmailService.getPendingEmails();

            if (pendingEmails.length === 0) {
                console.log("No pending emails to process.");
                return;
            }

            for (let i = 0; i < pendingEmails.length; i++) {
                const email = pendingEmails[i];
                await RabbitMQ.sendToQueue(email);
                await EmailService.markAsQueued(email._id);
            }
        } catch (error) {
            console.error("Error processing email queue:", error);
        }
    }

    static async
}
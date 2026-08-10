import { EmailService } from '../services/EmailService.js';

export class EmailController {
    static async registerEmail(req, res) {
        try {
            const emailData = req.body;
            await EmailService.registerEmail(emailData);
            res.status(201).json({ message: 'Email registered successfully.' });
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.error(error);
        }
    }

    static async deleteEmail(req, res) {
        try {
            const emailId = req.body;
            await EmailService.deleteEmail(emailId);
            res.status(200).json({ message: 'Email deleted successfully.' });
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.error(error);
        }
    }
}
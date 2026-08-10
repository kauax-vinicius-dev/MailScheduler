import { InputValidator } from '../utils/InputValidator.js';
import { emailModel } from '../models/emailModel.js';

export class EmailService {
  static async registerEmail(obj) {

    if (InputValidator.hasEmptyFields(obj)) {
      throw new Error("All fields are required.");
    }
    await this.createEmail(obj);
  }

  static async createEmail(obj) {
    const email = new emailModel({
      recipient: obj.recipient,
      subject: obj.subject,
      body: obj.body,
      sendAt: obj.sendAt,
    });

    await email.save();
  }

  static async deleteEmail(id) {
    if (!id) {
      throw new Error("Email ID is required for deletion.");
    }
    await emailModel.findByIdAndDelete(id);
  }

  static async getPendingEmails() {
    const nowDate = new Date();
    return await emailModel.find({
      isSent: false,
      sendAt: { $lte: nowDate }
    });
  }

  static async markAsQueued(id) {
    if (!id) {
      throw new Error("Email ID is required to mark as queued.");
    }
    await emailModel.findByIdAndUpdate(id, { isSent: true });
  }

  static async getMailById(id) {
    if (!id) {
      throw new Error("Email ID is required to fetch the email.");
    }
    return await emailModel.findById(id);
  }

}
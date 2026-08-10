import mongoose from "mongoose";

export const emailModel = mongoose.model('Email', {
    recipient: String,
    subject: String,
    body: String,
    sendAt: Date,
    isSent: {
        type: Boolean,
        default: false,
    }
});
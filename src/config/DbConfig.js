import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export class Database {
    static async connectMongo() {
        try {
            await mongoose.connect(
                `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster-1.vxhqtsw.mongodb.net/?appName=Cluster-1`
            )
            console.log("MongoDB connected successfully.");
        } catch (error) {
            console.error("Error connecting to the database:", error);
        }
    }
}
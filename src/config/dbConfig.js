import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export class Database {
    static connectMongo() {
        try {
            mongoose.connect(
                `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster-1.vxhqtsw.mongodb.net/?appName=Cluster-1`
            )
        } catch (error) {
            console.error("Error connecting to the database:", error);
        }
    }
}
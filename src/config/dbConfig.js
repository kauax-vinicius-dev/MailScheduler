import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongo = () => {

    mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster-1.vxhqtsw.mongodb.net/?appName=Cluster-1`
    )
        .then(() => {
            console.log("Connected to the database");
        })
        .catch((err) => console.log("Error connecting to the database:", err));
}

export default connectMongo;
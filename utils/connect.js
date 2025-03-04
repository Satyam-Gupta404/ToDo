import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connection = { isConnected: null };

export const connectToDB = async () => {
    try {
        if (connection.isConnected) {
            console.log("✅ Already connected to MongoDB");
            return;
        }

        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log("🚀 Connected to MongoDB");
    } catch (error) {
        console.error("❌ Couldn't connect with DB", error);
        process.exit(1);
    }
};


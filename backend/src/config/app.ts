import { config } from "dotenv";

if (process.env.NODE_ENV !== "production"){
    config();
}

export const PORT = process.env.PORT;
export const MONGO_URI = 'mongodb+srv://Josi:123987@cluster0.nef4q.mongodb.net/';
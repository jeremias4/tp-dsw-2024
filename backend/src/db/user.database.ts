import { connect } from "mongoose";
import { MONGO_URI } from "../config/app"

export const connectDB = () => {
  connect(MONGO_URI as string);
  console.log("Conectando a mongo db")
}
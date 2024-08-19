import { connect } from "mongoose";
import {MONGO_URI} from "../config/app.js"

export const connectDB = () => {
  connect(`${MONGO_URI}`);
  console.log("Conectando a mongo db")
}
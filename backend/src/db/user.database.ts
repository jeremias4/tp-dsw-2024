import { connect } from "mongoose";
import {MONGO_URI} from "../config/app"

export const connectDB = () => {
  connect("mongodb+srv://admin:<admin123>@cluster0.nwuqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  console.log("Conectando a mongo db")
}
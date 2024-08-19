import { connect } from "mongoose";
export const connectDB = () => {
    connect("mongodb+srv://admin:<admin123>@cluster0.nwuqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Conectando a mongo db");
};
//# sourceMappingURL=user.database.js.map
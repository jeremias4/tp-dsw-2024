import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: String,
    description: String
});
export const UserModel = model("users", userSchema);
//# sourceMappingURL=user.entity.js.map
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id:{ type: Number},
  name: {type: String}
})

export const UserModel = model("users" , userSchema);

export default UserModel;
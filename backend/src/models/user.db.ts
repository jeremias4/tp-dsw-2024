import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: {type: Number},
  name: {type: String},
  email: {type: String},
  gender: {type: String},
  city: {type: String},
  typeUser: {type: String},
  password: {type: String}
})


export const UserModel = model("users" , userSchema);

export default UserModel;
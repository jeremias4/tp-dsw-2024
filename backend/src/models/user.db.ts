import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {type: String},
  surname: {type: String},
  email: {type: String},
  password: {type: String},
  gender: {type: String},
  city: {type: String},
  vendorUser: {type: Boolean}
})


export const UserModel = model("users" , userSchema);

export default UserModel;
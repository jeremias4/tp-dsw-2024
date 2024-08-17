import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id:{ type: Number},
  name: {type: String},
  description: {type: String}
})


export class User {
    constructor(
      public id: string,
      public name: string
    ) {}
  }
  
export const UserModel = model("users" , userSchema);
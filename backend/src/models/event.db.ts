import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  id: {type: Number},
  name: {type: String},
  date: {type: Date},
  owner: {type: Number}, //ID DEL USUARIO
  city: {type: String},
  adress: {type: String},
  size: {type: Number},
})

export const EventModel = model("events" , eventSchema);

export default EventModel;
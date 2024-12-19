import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  name: {type: String},
  date: {type: Date},
  owner: { type: Schema.Types.ObjectId, ref:"users" },
  city: {type: String},
  adress: {type: String},
  size: {type: Number},
})

export const EventModel = model("events" , eventSchema);

export default EventModel;
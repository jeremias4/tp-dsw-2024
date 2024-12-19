import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    id: { type: Schema.Types.ObjectId },
    date: {type: String},
    usuario: { type: Schema.Types.ObjectId, ref: 'user' },
    evento: { type: Schema.Types.ObjectId, ref: 'event' },
    state: ["active" , "expired"]

})

export const TicketModel = model("tickets" , ticketSchema);

export default TicketModel;
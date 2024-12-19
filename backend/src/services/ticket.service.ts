import { TicketModel } from "../models/ticket.db.js"
import { Ticket } from "../models/ticket.entity.js"

export const TicketService = {
    newTicket: async (userId: String, eventId: String)=>{
        return await TicketModel.insertMany(new Ticket("impuesto por mongodb", "hoy", userId, eventId,))
        
    }
}
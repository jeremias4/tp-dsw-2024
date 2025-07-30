import {Request, response, Response } from 'express';
import {UserService} from '../services/user.services.js';
import {EventService} from '../services/event.service.js';
import {TicketService} from '../services/ticket.service.js';


export const TicketController = {
    buyTicket: async(req: Request, res: Response)=>{
        try {
        const user = await UserService.getById(req.body.user.email);
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }
        const event = await EventService.getById(req.body.event.uid);
        if (!event) {
            return res.status(404).json({message: 'Event not found'})
        }
        const newTicket = await TicketService.newTicket(user.id, event.id)
        if (!newTicket) {
            res.status(500).send({ message: 'Error' });
        };
            res.status(200).json({data: newTicket})    
        } catch (err) {
            res.status(500).send({ message: 'Error' });
        }
    }
}

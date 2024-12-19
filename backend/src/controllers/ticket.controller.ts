import {Request, response, Response } from 'express';

export const TicketController = {
    buyTicket: async(req: Request, res: Response)=>{
        try {
        const user = await UserService.getById({req.body.user.email});
        const event = await EventService.getById({req.body.event.uid});
        const newTicket = await TicketService.newTicket(user.id, event.id)
        if (!newTicket) {
            res.status(500).send({ message: 'Error' });
        };
            res.status(200).send.json({data: newTicket})    
        } catch (err) {
            res.status(500).send({ message: 'Error' });
        }
    }
}

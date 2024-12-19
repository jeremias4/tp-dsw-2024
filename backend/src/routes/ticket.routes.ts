import {Router} from 'express';
import {TicketController} from '../controllers/ticket.controller.js'

export const router = Router(
    
);
router.post('/new', (req, res) => {TicketController.buyTicket(req, res)});

export default router;
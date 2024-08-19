
import {Request, Response } from 'express';
import {EventService} from '../services/event.service.js'

export const EventController = {
  
  getAllEvent: async(req: Request, res: Response)=>{
    
    try { 
        
        const users = await EventService.getAll();
        res.json({ data: users });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving users' });
      }
  },
  getEvent: async(req: Request, res: Response) => {
        try {
          const user = await EventService.getById(req.params.id); 
          if (!user) {
            return res.status(404).send({ message: 'User not found' });
          }
          res.json({ data: user });
        } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Error retrieving user' });
        }
  },
  addEvent: async(req: Request, res: Response) => {
      try {
          const input = req.body;
          const user = await EventService.add(input)
          res.status(201).json({ message: 'User created', data: user });
        } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Error creating user' });}
  },
  //modificacion completa
  putEvent: async (req: Request, res: Response) => {
      try {
          const user = await EventService.findId(req.params.id);
          if (!user) {
            return res.status(404).send({ message: 'Event not found' });
          }
          const input = req.body.sanitizedInput.description;
          await EventService.update(input, ()=> {
            res.status(200).json({ message: 'Event updated', data: req.body.sanitizedInput })
          })
          } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Error updating user' });
        }
    },
  //mod atributo
  patchEvent: async(req:Request, res: Response) => {
      try {
          const input = req.body.sanitizedInput.description;
          await EventService.upd( {id: input.id} );
          res.status(200).json({ message: 'Event updated', data: req.body.sanitizedInput });
        } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Error updating user' });
        }
  
  },
  //BORRAR 
  deleteEvent: async(req: Request, res: Response )=> {
      try {
          await EventService.delete(req.params.id);
          res.status(200).send({ message: 'Event deleted successfully' });
        } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Error deleting user' });
        }
  }
  }
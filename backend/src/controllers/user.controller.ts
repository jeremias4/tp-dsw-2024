
import {Request, Response } from 'express';
import {UserService} from "../services/user.services.js"

export const UserController = {
  
  getAllUser: async(req: Request, res: Response)=>{
    
    try {
       //validar que tenga el permiso de obtener todos los usuarios    
        const users = await UserService.getAll();
        res.json({ data: users });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving users' });
      }
  },
  getUser: async(req: Request, res: Response) => {
        try {
          const user = await UserService.getById(req.params.id); 
          if (!user) {
            return res.status(404).send({ message: 'User not found' });
          }
          res.json({ data: user });
        } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Error retrieving user' });
        }
  },
  addUser: async(req: Request, res: Response) => {
      try {
          const input = req.body;
          const user = await UserService.addUser(input)          
          res.status(201).json({ message: 'User created', data: user });
        } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Error creating user' });}
  },
  //modificacion completa
  putUser: async (req: Request, res: Response) => {
      try {
          const user = await UserService.findId(req.params.id);
          if (!user) {
            return res.status(404).send({ message: 'User not found' });
          }
          const input = req.body.sanitizedInput.description;
          await UserService.updateUser(input, ()=> {
            res.status(200).json({ message: 'User updated', data: req.body.sanitizedInput })
          })
          } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Error updating user' });
        }
    },
  //mod atributo
  patchUser: async(req:Request, res: Response) => {
      try {
          const input = req.body.sanitizedInput.description;
          const user = await UserService.updUser(input);
          await UserService.updUser( {id: req.params.id} );
          res.status(200).json({ message: 'User updated', data: req.body.sanitizedInput });
        } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Error updating user' });
        }
  
  },
  //BORRAR 
  deleteUser: async(req: Request, res: Response )=> {
      try {
          await UserService.deleteUser(req.params.id);
          res.status(200).send({ message: 'User deleted successfully' });
        } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Error deleting user' });
        }
  }
  }

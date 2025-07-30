
import {Request, response, Response } from 'express';
import {UserService} from "../services/user.services.js"
import bcrypt from 'bcrypt';
import { token } from 'morgan';

export const UserController = {

  loginUser: async(req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.getById({ email }); 
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match){
        return res.status(404).send({ message: 'Password Not Correct' });
      }

      res.status(200).json({ token, message: 'Inicio de sesión exitoso' }); 

    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error retrieving user' });
    }
  },

  registerUser: async(req: Request, res: Response) => {
    try {
        const input = req.body;
        const user = await UserService.addUser(input)          
        res.status(201).json({ message: 'User created', data: user });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error creating user' });}
},

  /*
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
  }*/
 
      }

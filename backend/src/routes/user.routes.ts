import express, { NextFunction, Request, Response } from 'express';
import { getAllUser, getUser, addUser, putUser, patchUser, deleteUser } from '../controllers/user.controller.js'

const router = express.Router();


function sanitizeUserInput(req: Request, res: Response) {
  req.body.santizedInput = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      console.log('error');
      delete req.body.sanitizedInput[key];
    }
  });
}

//obtencion
router.get('/api/users', (req, res) => {getAllUser(req, res)});
router.get('/api/users/:id', (req, res) => {getUser(req, res)});
//creacion
router.post('/api/new', (req, res) => {sanitizeUserInput(req, res);addUser(req, res)});
//editar perfil
router.patch('/api/users/:id', (req, res) => {patchUser(req, res) });

//solo admin
//remplazo de usuario 
router.put('/api/users/:id', (req, res) => {putUser(req, res) });
//borrar usuario
router.delete('/api/users/:id', (req, res) => {deleteUser(req, res) });


export default router;

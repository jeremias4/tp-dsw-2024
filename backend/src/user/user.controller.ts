import { User } from "./user.entity";
import database from '../db/user.database';
import express, { NextFunction, Request, Response } from 'express';


function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
    req.body.santizedInput = {
      id: req.body.id,
      name: req.body.name,
      userClass: req.body.userClass,
      eventsSell: req.body.eventsSell,
      eventsBuy: req.body.eventsBuy,
    };
  
    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        console.log('error');
        delete req.body.sanitizedInput[key];
      }
    });
  
    next();
  }

  //obtener todos los usuarios y transformarlo en json
export async function getAllUser(req: Request, res: Response, next: NextFunction) {
    sanitizeUserInput(req, res, next)
    try {
        const users = await database.getAllUsers();
        res.json({ data: users });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving users' });
      }
};

export async function getUser(req: Request, res: Response, next: NextFunction) {
    sanitizeUserInput(req, res, next);try {
        const id = req.params.id;
        const user = await database.getUser(id);
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        res.json({ data: user });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error retrieving user' });
      }
}

export async function addUser(req: Request, res: Response, next: NextFunction) {
    try {
        sanitizeUserInput(req, res, next)
        const input = req.body.sanitizedInput;
    
        const user = new User(
        input.id,
        input.name
        );
  
        await database.addUser(user);
        res.status(201).json({ message: 'User created', data: user });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error creating user' });}
};

export async function putUser(req: Request, res: Response, next: NextFunction) {
    try {
        sanitizeUserInput(req, res, next);
        const id = req.params.id;
        const user = await database.getUser(id);
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        await database.putUser(id, req.body.sanitizedInput);
        res.status(200).json({ message: 'User updated', data: req.body.sanitizedInput });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error updating user' });
      }
}

export async function patchUser(req:Request, res: Response, next: NextFunction){
    try {
        sanitizeUserInput(req, res, next);
        const id = req.params.id;
        const user = await database.getUser(id);
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        await database.patchUser(id, req.body.sanitizedInput);
        res.status(200).json({ message: 'User updated', data: req.body.sanitizedInput });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error updating user' });
      }
}

export async function deleteUser( req: Request, res: Response, next: NextFunction){
    try {
        const id = req.params.id;
        await database.deleteUser(id);
        res.status(200).send({ message: 'User deleted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error deleting user' });
      }
}


module.exports({ getAllUser, getUser, addUser, putUser, patchUser, deleteUser });
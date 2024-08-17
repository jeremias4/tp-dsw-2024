
import { User, UserModel } from "../models/user.entity";
import express, { NextFunction, Request, Response } from 'express';

export async function getAllUser(req: Request, res: Response) {
    try { 
        const users = await UserModel.find();
        res.json({ data: users });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving users' });
      }
};

export async function getUser(req: Request, res: Response) {
      try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        res.json({ data: user });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error retrieving user' });
      }
}

export async function addUser(req: Request, res: Response) {
    try {
        const input = req.body.sanitizedInput.description;
        const user = await UserModel.insertMany(new User(
          input.id,
          input.name
          ));
        res.status(201).json({ message: 'User created', data: user });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error creating user' });}
};

export async function putUser(req: Request, res: Response) {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        await UserModel.replaceOne(req.params.id as String, req.body.sanitizedInput, ()=> {
          res.status(200).json({ message: 'User updated', data: req.body.sanitizedInput });});
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error updating user' });
      }
}

export async function patchUser(req:Request, res: Response){
    try {
        const user = await UserModel.replaceOne({id: req.params.id}, req.params.body as String, { upsert: true } );
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        await UserModel.replaceOne({id: req.params.id} );
        res.status(200).json({ message: 'User updated', data: req.body.sanitizedInput });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error updating user' });
      }
}

export async function deleteUser( req: Request, res: Response){
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'User deleted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error deleting user' });
      }
}


module.exports({ getAllUser, getUser, addUser, putUser, patchUser, deleteUser });
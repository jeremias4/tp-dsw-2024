import express, { NextFunction, Request, Response } from 'express';
import { User } from '../user.entity.js';

const router = express.Router();

const users = [new User('0', 'Jeremias', 'Creador', [], [])];

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


router.get('/api/users', (req, res) => {
    res.json({ data: users });
  });
  
  router.get('/api/users/:id', (req, res) => {
    const user = users.find((user) => user.id === req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'Character not found' });
    }
    res.json({ data: user });
  });

  router.post('/api/new', sanitizeUserInput, (req, res) => {
    const input = req.body.sanitizedInput;
  
    const user = new User(
      input.id,
      input.name,
      input.userClass,
      input.eventsBuy,
      input.eventsSell
    );
  
    users.push(user);
    return res.status(201).send({ message: 'user created', data: user });
  });
  
  router.put('/api/users/:id', sanitizeUserInput, (req, res) => {
    const userIdx = users.findIndex((user) => user.id === req.params.id);
  
    if (userIdx === -1) {
      return res.status(404).send({ message: 'user not found' });
    }
  
    users[userIdx] = {
      ...users[userIdx],
      ...req.body.sanitizedInput,
    };
  
    return res.status(200).send({
      message: 'user updated successfully',
      data: users[userIdx],
    });
  });
  
  router.patch('/api/users/:id', sanitizeUserInput, (req, res) => {
    const userIdx = users.findIndex((user) => user.id === req.params.id);
  
    if (userIdx === -1) {
      return res.status(404).send({ message: 'Character not found' });
    }
  
    Object.assign(users[userIdx], req.body.sanitizedInput);
  
    return res.status(200).send({
      message: 'User updated successfully',
      data: users[userIdx],
    });
  });
  
  router.delete('/api/users/:id', (req, res) => {
    const userIdx = users.findIndex((user) => user.id === req.params.id);
  
    if (userIdx === -1) {
      res.status(404).send({ message: 'user not found' });
    } else {
      users.splice(userIdx, 1);
      res.status(200).send({ message: 'user deleted successfully' });
    }
  });

  export default router;
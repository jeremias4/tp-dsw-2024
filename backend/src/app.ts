import express, { NextFunction, Request, Response } from 'express';
import { User } from './user.entity.js';
import routes from './routes/user.routes.js';

const app = express();
app.use(express.json());
app.use(routes);

app.use((_, res) => {
  return res.status(404).send('<h1>Hello world!</h1>');
});

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/');
});

import express, { Express, urlencoded } from 'express';
import morgan from 'morgan';
import cors from "cors";

import {connectDB} from '../db/user.database.js';
import {PORT} from '../config/app.js'
import {routes} from '../routes/index.js';

class Server{
  private app:Express;
  
  constructor(){
      this.app = express();
      connectDB();
      this.configuration();
      this.middlewares();
      this.routes();
  }

  middlewares(){
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
  } 
  
  configuration(){
    this.app.use(urlencoded( { extended: false } ));
  }
  
  routes(){
    this.app.use("/users", routes.UserRoutes)
  }
  
  listen() {
    this.app.listen(PORT||3000, ()=>{console.log("Server running on http://localhost:"+PORT)})
  }
}

export default Server;
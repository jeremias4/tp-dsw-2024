import express, { urlencoded } from 'express';
import morgan from 'morgan';
import cors from "cors";
import { connectDB } from '../db/user.database.js';
import { PORT } from '../config/app.js';
import routes from '../routes/user.routes.js';
export class Server {
    constructor() {
        this.app = express();
        connectDB();
        this.configuration();
        this.app.use("/", routes.router);
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan("dev"));
    }
    configuration() {
        this.app.use(urlencoded({ extended: false }));
    }
    routes() {
        this.app.use("/api/users", routes.router);
    }
    listen() {
        this.app.listen(PORT || 3000, () => { console.log("Server running"); });
    }
}
//# sourceMappingURL=server.js.map
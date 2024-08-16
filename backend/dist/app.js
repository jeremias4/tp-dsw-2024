import express, { urlencoded } from 'express';
import routes from './user/user.routes.js';
import morgan from 'morgan';
import cors from "cors";
import { connectDB } from './db/user.database.js';
import { PORT } from './config/app.js';
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(urlencoded({ extended: false }));
app.use(routes);
app.use(cors());
connectDB();
app.use((_, res) => {
    return res.status(404).send('<h1>Hello world!</h1>');
});
app.listen(PORT, () => {
    console.log('Server runnning on port: ', PORT);
});
//# sourceMappingURL=app.js.map
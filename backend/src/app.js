import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import conversacionRoutes from './routes/conversacion.routes.js';
import mensajeRoutes from './routes/mensaje.routes.js';
import configuracionRoutes from './routes/configuracion.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/conversaciones', conversacionRoutes);
app.use('/api/mensajes', mensajeRoutes);
app.use('/api/configuraciones', configuracionRoutes);

app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

export default app;

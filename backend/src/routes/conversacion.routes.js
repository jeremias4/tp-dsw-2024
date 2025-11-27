import express from 'express';
import * as conversacionCtrl from '../controllers/conversacion.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/iniciar', authMiddleware(), conversacionCtrl.iniciarConversacion);
router.get('/', authMiddleware(), conversacionCtrl.listarConversaciones);
router.get('/:id', authMiddleware(), conversacionCtrl.obtenerPorId);

export default router;

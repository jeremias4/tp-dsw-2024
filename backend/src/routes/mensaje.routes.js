import express from 'express';
import * as mensajeCtrl from '../controllers/mensaje.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware(), mensajeCtrl.crear);
router.get('/:conversacionId', authMiddleware(), mensajeCtrl.listarPorConversacion);

export default router;

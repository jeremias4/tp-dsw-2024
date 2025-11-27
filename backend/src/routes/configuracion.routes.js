import express from 'express';
import * as confCtrl from '../controllers/configuracion.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware(), confCtrl.crear);
router.get('/', authMiddleware(), confCtrl.listar);
router.get('/:id', authMiddleware(), confCtrl.obtener);
router.put('/:id', authMiddleware(), confCtrl.actualizar);
router.delete('/:id', authMiddleware(), confCtrl.eliminar);

export default router;

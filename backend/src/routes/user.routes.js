import express from 'express';
import * as userCtrl from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.get('/', authMiddleware(['admin']), userCtrl.getUsers);
router.get('/:id', authMiddleware(), userCtrl.getUser);
router.put('/:id', authMiddleware(), userCtrl.update);
router.delete('/:id', authMiddleware(['admin']), userCtrl.remove);

export default router;

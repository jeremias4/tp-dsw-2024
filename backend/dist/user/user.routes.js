import express from 'express';
import { getAllUser, getUser, addUser, putUser, patchUser, deleteUser } from './user.controller.js';
const router = express.Router();
function next() {
    throw new Error('Function not implemented.');
}
router.get('/api/users', (req, res) => { getAllUser(req, res, next()); });
router.get('/api/users/:id', (req, res) => { getUser(req, res, next()); });
router.post('/api/new', (req, res) => { addUser(req, res, next()); });
router.put('/api/users/:id', (req, res) => { putUser(req, res, next()); });
router.patch('/api/users/:id', (req, res) => { patchUser(req, res, next()); });
router.delete('/api/users/:id', (req, res) => { deleteUser(req, res, next()); });
export default router;
//# sourceMappingURL=user.routes.js.map
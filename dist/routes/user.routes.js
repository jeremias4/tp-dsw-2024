import express from 'express';
import UserController from '../controllers/user.controller.js';
const router = express.Router();
function sanitizeUserInput(req, res) {
    req.body.santizedInput = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            console.log('error');
            delete req.body.sanitizedInput[key];
        }
    });
}
//obtencion
router.get('/api/users', (req, res) => { UserController.getAllUser(req, res); });
router.get('/api/users/:id', (req, res) => { UserController.getUser(req, res); });
//creacion
router.post('/api/new', (req, res) => { UserController.addUser(req, res); });
//editar perfil
router.patch('/api/users/:id', (req, res) => { UserController.patchUser(req, res); });
//solo admin
//remplazo de usuario 
router.put('/api/users/:id', (req, res) => { UserController.putUser(req, res); });
//borrar usuario
router.delete('/api/users/:id', (req, res) => { UserController.deleteUser(req, res); });
const routes = { router };
export default routes;
//# sourceMappingURL=user.routes.js.map
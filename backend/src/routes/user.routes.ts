import {Router} from 'express';
import {UserController} from '../controllers/user.controller.js'

export const router = Router();

router.get('/all', (req, res) => {UserController.getAllUser(req, res); 
});
router.get('/:id', (req, res) => {UserController.getUser(req, res)});
//creacion
router.post('/new', (req, res) => {UserController.addUser(req, res)});
//editar perfil
router.patch('/upd/:id', (req, res) => {UserController.patchUser(req, res) });

//solo admin
//remplazo de usuario 
router.put('/rep/:id', (req, res) => {UserController.putUser(req, res) });
//borrar usuario
router.delete('/del/:id', (req, res) => {UserController.deleteUser(req, res) });


/* 
function sanitizeUserInput(req: Request, res: Response) {
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
  */

export default router;

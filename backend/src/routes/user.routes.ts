import {Router} from 'express';
import {UserController} from '../controllers/user.controller.js'

export const router = Router();

// REGULARIDAD

//registro de usuario
router.post('/new', (req, res) => {UserController.registerUser(req, res)});
//login usuario
router.get('/:email', (req, res) => {UserController.loginUser(req, res)});




/*   AD AD AD AD AD
//editar perfil
router.patch('/:id', (req, res) => {UserController.patchUser(req, res) });
//solo admin
//remplazo de usuario 
router.put('/:id', (req, res) => {UserController.putUser(req, res) });
//borrar usuario
router.delete('/:id', (req, res) => {UserController.deleteUser(req, res) });
router.get('/all', (req, res) => {UserController.getAllUser(req, res);});

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

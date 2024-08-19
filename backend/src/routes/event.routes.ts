import {Router} from 'express';
import {EventController} from '../controllers/event.controller.js'

export const router = Router();

router.get('/all', (req, res) => {EventController.getAllEvent(req, res);});

router.get('/:id', (req, res) => {EventController.getEvent(req, res)});
//creacion
router.post('/new', (req, res) => {EventController.addEvent(req, res)});
//editar perfil
router.patch('/upd/:id', (req, res) => {EventController.patchEvent(req, res) });

//solo admin
//remplazo de usuario 
router.put('/rep/:id', (req, res) => {EventController.putEvent(req, res) });
//borrar usuario
router.delete('/del/:id', (req, res) => {EventController.deleteEvent(req, res) });

export default router;
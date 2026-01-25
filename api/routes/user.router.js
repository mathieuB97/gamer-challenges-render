
import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

const router = Router();
// GET /users - récupère tous les utilisateurs
router.get('/users', UserController.getAll);
// GET /user/:id - récupère un utilisateur par son id
router.get('/user/:id', UserController.getById);


export default router;

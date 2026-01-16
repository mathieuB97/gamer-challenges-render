import { Router } from "express";
import authController from "../controllers/auth.controller.js";

// Middleware à créer pour l'authentification et la validation des données
//import {validateUser, validateToken} from '../middlewares/common.middleware.js';

const routeur = Router();

/*Inscription*/
// requete HTTP POST /auth/register (route pour l'inscription)
routeur.post('/auth/register', authController.registerUser);

/* Connexion*/
// requete HTTP POST /auth/login (route pour la connexion)
// routeur.post('/auth/login', authController.login); a réactiver plus tard
// routeur.get('/auth/me', authController.getMe); a réactiver plus tard

export default routeur;
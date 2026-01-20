import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { validateToken, validateUser } from "../middlewares/auth.middleware.js";


const routeur = Router();

/*Inscription*/
// requete HTTP POST /auth/register (route pour l'inscription)
routeur.post('/auth/register', validateUser, authController.registerUser);

/* Connexion*/
routeur.post('/auth/login', validateUser, authController.login);
routeur.get('/auth/me', validateToken, authController.getMe);

export default routeur;
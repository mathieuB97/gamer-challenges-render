import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { validateRegister, validateToken, validateUser } from "../middlewares/auth.middleware.js";


const routeur = Router();

/*Inscription*/
// requête HTTP POST /auth/register (route pour l'inscription)
routeur.post('/auth/register', validateRegister, authController.registerUser);

/* Connexion*/
routeur.post('/auth/login', validateUser, authController.login);
routeur.get('/auth/me', validateToken, authController.getMe);

export default routeur;
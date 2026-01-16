import { Router } from "express";


import authController from "../controllers/auth.controller.js";

//import { validateId } from '../middlewares/common.middleware.js';

// TODO ajouter auth middleware
//import { validateAuthCreate, validateAuthUpdate } from '../middlewares/auth.middleware.js';

const authRouter = Router();

/*INSCRIPTION*/
// requete HTTP GET
authRouter.get('/inscription', authController.getAll);

/* CONNEXION*/
// requete HTTP GET
authRouter.get('/connexion', validateId, authController.getById);

export default authRouter;
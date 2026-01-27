import { Router } from "express";
import challengeController from "../controllers/challenge.controller.js";
import { isAllowed, validateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/challenges', challengeController.getChallenges); // GET Tous les challenges
router.get('/challenges/:id', challengeController.getById); // Détails d'un challenge par son id
router.post('/challenges', validateToken, isAllowed('user'), challengeController.create); // Affiche de tous les challenges associés à un jeu

export default router;
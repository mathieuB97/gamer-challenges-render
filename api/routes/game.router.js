import { Router } from "express";
import gameController from "../controllers/game.controller.js";

const router = Router();


router.get('/games', gameController.getAll); // liste de tous les jeux
router.get('/games/:id', gameController.getById); // détails d'un jeu par son id
router.get('/games/:id/challenges', gameController.getChallengesByGameId); // challenges d'un jeu donné

export default router;
import { Router } from 'express';
import voteController from '../controllers/vote.controller.js';

const router = Router();

// Route 1: Récupérer le nombre total de votes sur un challenge
// GET /votes/challenge/:challengeId
router.get('/votes/challenge/:challengeId', voteController.getChallengeVoteCount);

// Route 2: Récupérer le nombre total de votes sur une contribution (participation)
// GET /votes/contribution/:contributionId  
router.get('/votes/contribution/:contributionId', voteController.getContributionVoteCount);

// Route 3: Récupérer la liste des utilisateurs avec les meilleures contributions
// GET /votes/top-contributors?limit=10
router.get('/votes/top-contributors', voteController.getTopContributors);

export default router;
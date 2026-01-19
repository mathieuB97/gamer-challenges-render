import { Challenge, User } from '../models/index.js';
import BaseController from './base.controller.js';

class ChallengeController extends BaseController {
    constructor() {
        super(Challenge, 'Challenge');
    }

    // On surcharge getRequestOptions pour permettre le filtrage (MVP)
    // Route: GET /games?search=...
    getRequestOptions(req) {
        const options = [];
        // Tu pourras ajouter ici la logique de filtrage par nom ou catégorie
        // en utilisant Op.like de Sequelize si besoin.
        
        // Inclusion par défaut pour les détails d'un jeu si demandé
        if (req.query.include === 'challenges') {
            options.push({ model: Challenge, as: 'challenges' });
        }
        return options;
    }

    // Méthode pour la route : GET /games/:gameId/challenges
    getChallengesByGameId = async (req, res, next) => {
        try {
            const { gameId } = req.params;
            const challenges = await Challenge.findAll({
                where: { game_id: gameId },
                // On peut inclure l'auteur par défaut pour l'affichage
                include: ['author'] 
            });
            res.sendResponse(challenges);
        } catch (error) {
            next(error);
        }
    }
}

export default new GameController();
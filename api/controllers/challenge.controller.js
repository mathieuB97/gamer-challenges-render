// Importation des modèles nécessaires
import { Challenge, Game, User, Contribution } from '../models/index.js';
// Importation du contrôleur de base (modèle parent)
import BaseController from './base.controller.js';
import HttpError from '../utils/HttpError.js';

class ChallengeController extends BaseController {
    constructor() {
        // On passe le modèle Challenge au BaseController
        super(Challenge, 'Challenge');
    }

    // Fonction pour définir les options de requête, notamment les jointures
    getRequestOptions(req) {
        return [
            // Inclusion du modèle Game, alias 'game' dans les associations (récupère la totalité des infos de la table "game")
            {
                model: Game,
                as: 'game'
            },

            // Inclusion du modèle User, alias 'creator' dans les associations et "attributes" pour ne récupérer que le pseudo
            {
                model: User,
                as: 'creator',
                attributes: ['pseudo'],
            },

            // Inclusion du modèle Contribution, alias 'contributions' avec une sous-inclusion du modèle User (l'auteur de la contribution)
            {
                model: Contribution,
                as: 'contributions',
                include: [
                    {
                        model: User,
                        as: 'creator',
                        attributes: ['pseudo'],
                    }, {
                        model: Challenge,
                        as: 'challenge',
                        attributes: ['name'],
                    }
                ],
            },
        ];
    }

    /**
     * GET /api/challenges
     * Retourne les challenges groupés par catégories (top, new, ongoing)
     */
    getChallenges = async (req, res, next) => {
        try {
            const options = this.getRequestOptions(req);
            const challenges = await Challenge.findAll({ include: options });

            if (!challenges || challenges.length === 0) {
                throw new HttpError('Aucun challenge trouvé', 404);
            }
            return res.sendResponse({ challenges });

        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/challenges/latest
     * Retourne les 7 derniers challenges créés avec les images des jeux
     */
    getLatest = async (req, res, next) => {
        try {
            const options = this.getRequestOptions(req);
            const challenges = await Challenge.findAll({ 
                include: options,
                order: [['createdAt', 'DESC']], 
                limit: 7 
            });

            if (!challenges || challenges.length === 0) {
                throw new HttpError('Aucun challenge trouvé', 404);
            }
            return res.sendResponse({ challenges });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/challenges/search/filter
     * Filtre les challenges par jeu, niveau et popularité
     * Query params:
     *   - gameId: ID du jeu (optionnel)
     *   - level: easy, medium, hard (optionnel)
     *   - sortBy: 'popularity', 'recent', 'name' (optionnel, défaut: 'recent')
     */
    filterChallenges = async (req, res, next) => {
        try {
            const { gameId, level, sortBy = 'recent' } = req.query;
            const options = this.getRequestOptions(req);
            
            // Construire les critères WHERE
            const where = {};
            if (gameId) {
                where.game_id = gameId;
            }
            if (level) {
                where.level = level;
            }

            // Construire l'ordre des résultats
            let order = [['createdAt', 'DESC']]; // Par défaut: récent
            
            if (sortBy === 'name') {
                order = [['name', 'ASC']];
            }
            // Pour la popularité, on triera après en JavaScript

            let challenges = await Challenge.findAll({ 
                where,
                include: options,
                order,
            });

            // Si popularité, trier par nombre de contributions
            if (sortBy === 'popularity') {
                challenges = challenges.sort((a, b) => {
                    const aCount = a.contributions ? a.contributions.length : 0;
                    const bCount = b.contributions ? b.contributions.length : 0;
                    return bCount - aCount; // Ordre décroissant
                });
            }

            if (!challenges || challenges.length === 0) {
                return res.sendResponse({ challenges: [] });
            }
            
            return res.sendResponse({ challenges });

        } catch (error) {
            next(error);
        }
    }

}

export default new ChallengeController();

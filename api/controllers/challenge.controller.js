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
            { model: Game, 
                as: 'game' },

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
    getChallengesGrouped = async (req, res, next) => {
        try {
            const options = this.getRequestOptions(req);
            const allChallenges = await Challenge.findAll({ include: options });

            // Mapper les données pour correspondre à la structure attendue par le client
            const transformedChallenges = allChallenges.map(challenge => ({
                id: challenge.id,
                title: challenge.game?.name || "Nom du jeu",
                challengeName: challenge.name,
                image: game.image || "https://via.placeholder.com/600x400",
                likes: challenge.likes || 0,
                participants: challenge.participants || 0,
            }));

            // Grouper les challenges (vous pouvez adapter la logique selon vos besoins)
            const topChallenges = transformedChallenges.slice(0, 4);
            const newChallenges = transformedChallenges.slice(4, 9);
            const ongoingChallenges = transformedChallenges.slice(0, 7);

            res.sendResponse({
                challenges: {
                    topChallenges,
                    newChallenges,
                    ongoingChallenges
                }
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/leaderboard
     * Retourne le classement des utilisateurs par nombre de contributions
     */
    getLeaderboard = async (req, res, next) => {
        try {
            // Récupérer les utilisateurs avec le nombre de contributions
            const users = await User.findAll({
                include: [{
                    model: Contribution,
                    as: 'contributions',
                    attributes: [],
                }],
                attributes: ['id', 'pseudo', 'image', [require('sequelize').fn('COUNT', require('sequelize').col('contributions.id')), 'contributionCount']],
                group: ['User.id'],
                order: [[require('sequelize').literal('contributionCount'), 'DESC']],
                limit: 10,
                raw: true,
                subQuery: false
            });

            // Mapper et ajouter les rangs
            const leaderboardData = users.map((user, index) => ({
                rank: index + 1,
                name: "Nom du jeu", // À adapter selon votre logique
                pseudo: user.pseudo,
                image: user.image || "https://via.placeholder.com/400x400",
            }));

            res.sendResponse({
                leaderboardData
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new ChallengeController();

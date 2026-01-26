import { Contribution, User, Challenge } from '../models/index.js';
import BaseController from './base.controller.js';

class ContributionController extends BaseController {
    constructor() {
        super(Contribution, 'Contribution');
    }

    // Fonction pour définir les options de requête, notamment les jointures
    getRequestOptions(req) {
        return [
            // Inclusion du modèle User, alias 'creator' dans les associations
            {
                model: User,
                as: 'creator',
                attributes: ['pseudo'],
            },
            // Inclusion du modèle Challenge, alias 'challenge' dans les associations
            {
                model: Challenge,
                as: 'challenge',
                attributes: ['name', 'game_id'],
            },
            // Inclusion des utilisateurs ayant voté (table pivot user_contribution)
            {
                model: User,
                as: 'contributors', // correspond à la relation belongsToMany dans models/index.js
                attributes: ['id', 'pseudo'],
                through: {
                    attributes: [] // n'inclut pas les champs de la table pivot sauf si besoin
                }
            }
        ];
    }

    // Récupérer les contributions sur lesquelles l'utilisateur a voté (via user_contribution)
    async getUserContributionVotes(req, res, next) {
        try {
            const userId = req.user_id;
            if (!userId) {
                return res.status(400).json({ error: 'user_id manquant' });
            }
            // On récupère toutes les contributions où l'utilisateur est dans la table pivot user_contribution
            const contributions = await Contribution.findAll({
                include: [
                    {
                        model: User,
                        as: 'contributors',
                        where: { id: userId },
                        attributes: [], // on ne veut pas les infos user ici
                        through: { attributes: [] }
                    },
                    // On peut inclure d'autres relations si besoin (ex: challenge)
                    {
                        model: Challenge,
                        as: 'challenge',
                        attributes: ['name', 'game_id']
                    }
                ]
            });
            res.sendResponse(contributions);
        } catch (error) {
            next(error);
        }
    }
}

export default new ContributionController();

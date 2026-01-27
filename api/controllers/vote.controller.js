import BaseController from './base.controller.js';
import { User, Challenge, Contribution, Game } from '../models/index.js';
import HttpError from '../utils/HttpError.js';
import { fn, col, } from '../models/sequelize.client.js';


class VoteController extends BaseController {
    constructor() {
        super(); // Pas de modèle Vote
    }

    getRequestOptions(req) {
        return [];
    }

    // POST : Ajouter un vote (participation) à un challenge
    async voteForChallenge(req, res, next) {
        try {
            const { challengeId } = req.params;
            const userId = req.user_id; // récupéré via le middleware d'auth

            if (!userId) {
                throw new HttpError('Utilisateur non authentifié', 401);
            }

            const user = await User.findByPk(userId);
            const challenge = await Challenge.findByPk(challengeId);

            if (!user || !challenge) {
                throw new HttpError('User ou Challenge non trouvé', 404);
            }

            // Vérifier si le vote existe déjà
            const alreadyVoted = await user.hasParticipated_challenge(challenge);
            if (alreadyVoted) {
                throw new HttpError('Vous avez déjà voté pour ce challenge', 409);
            }

            await user.addParticipated_challenge(challenge);
            res.json({ success: true, message: 'Vote enregistré !' });
        } catch (error) {
            next(error);
        }
    }

    // 1. Récupérer le nombre total de votes sur un challenge
    // Les votes = participants dans user_challenge
    async getChallengeVoteCount(req, res, next) {
        try {
            const { challengeId } = req.params;

            const challenge = await Challenge.findByPk(challengeId, {
                include: [
                    {
                        model: User,
                        as: 'participants',
                        attributes: ['id'],
                        through: { attributes: [] }
                    }
                ]
            });

            if (!challenge) {
                throw new HttpError('Challenge non trouvé', 404);
            }

            const voteCount = challenge.participants ? challenge.participants.length : 0;

            res.json({
                challenge_id: challengeId,
                challenge_name: challenge.name,
                total_votes: voteCount
            });

        } catch (error) {
            next(error);
        }
    }

    // 2. Récupérer le nombre total de votes sur une contribution (participation)
    // Les votes = contributeurs dans user_contribution
    async getContributionVoteCount(req, res, next) {
        try {
            const { contributionId } = req.params;

            const contribution = await Contribution.findByPk(contributionId, {
                include: [
                    {
                        model: User,
                        as: 'creator',
                        attributes: ['pseudo']
                    },
                    {
                        model: Challenge,
                        as: 'challenge',
                        attributes: ['name']
                    },
                    {
                        model: User,
                        as: 'contributors',
                        attributes: ['id'],
                        through: { attributes: [] }
                    }
                ]
            });

            if (!contribution) {
                throw new HttpError('Contribution non trouvée', 404);
            }

            const voteCount = contribution.contributors ? contribution.contributors.length : 0;

            res.json({
                contribution_id: contributionId,
                contributor: contribution.creator.pseudo,
                challenge_name: contribution.challenge.name,
                video_url: contribution.video_url,
                total_votes: voteCount
            });

        } catch (error) {
            next(error);
        }
    }

    // 3. Récupérer la liste des utilisateurs avec les meilleures contributions (le plus de votes)
    async getTopContributors(req, res, next) {
        try {
            const { limit = 10 } = req.query;

            const contributorsWithVotes = await User.findAll({
                include: [
                    {
                        model: Contribution,
                        as: 'contributions',
                        include: [
                            {
                                model: User,
                                as: 'contributors',
                                attributes: ['id'],
                                through: { attributes: [] }
                            },
                            {
                                model: Challenge,
                                as: 'challenge',
                                attributes: ['name']
                            }
                        ]
                    }
                ],
                order: [['pseudo', 'ASC']]
            });

            const contributorsStats = contributorsWithVotes
                .map(user => {
                    const totalVotes = user.contributions.reduce((total, contribution) => {
                        return total + (contribution.contributors ? contribution.contributors.length : 0);
                    }, 0);

                    return {
                        user_id: user.id,
                        pseudo: user.pseudo,
                        total_votes: totalVotes,
                        contributions_count: user.contributions.length,
                        contributions: user.contributions.map(contrib => ({
                            id: contrib.id,
                            video_url: contrib.video_url,
                            duration: contrib.duration,
                            challenge_name: contrib.challenge.name,
                            votes_count: contrib.contributors ? contrib.contributors.length : 0
                        }))
                    };
                })
                .filter(user => user.total_votes > 0)
                .sort((a, b) => b.total_votes - a.total_votes)
                .slice(0, parseInt(limit));

            res.json({
                top_contributors: contributorsStats
            });

        } catch (error) {
            next(error);
        }
    }

    // 4. Top challenges par nombre de votes (participants sur user_challenge)
    async getTopChallenges(req_, res, next) {
        try {
            // Jointures:
            // - 'game': relation 1-N (Challenge.belongsTo(Game)) pour récupérer le nom et l'image du jeu lié
            // - 'participants': relation N-N (Challenge.belongsToMany(User) via table 'user_challenge')
            //    utilisée uniquement pour compter les votes (participants). On ne sélectionne pas de colonnes utilisateurs
            //    (attributes: []) et on n'expose pas de champs de la table de jonction (through: { attributes: [] }).
            const rows = await Challenge.findAll({
                include: [
                    { model: Game, as: 'game', attributes: ['name', 'image'] },
                    { model: User, as: 'participants', attributes: [], through: { attributes: [] } },
                ],
                attributes: [
                    // Colonnes du challenge renvoyées
                    'id', 'name', 'level', 'time_limit_minutes',
                    // Agrégat: nombre de participants (votes) grâce à la jointure 'participants'
                    // COUNT(participants.id) est possible car l'include crée la jointure avec l'alias 'participants'
                    [fn('COUNT', col('participants.id')), 'votesCount'],
                    // Nombre total de participants au challenge
                    [fn('COUNT', col('participants.id')), 'totalParticipants']
                ],
                // Groupement nécessaire pour les agrégations et éviter la duplication des lignes
                // On regroupe par l'identifiant du challenge et l'identifiant du jeu inclus
                group: ['Challenge.id', 'game.id'],
                // Tri sur l'alias "votesCount" en DESC pour obtenir les challenges les plus votés en premier
                order: [['votesCount', 'DESC']],
                limit: 10,
                subQuery: false,
                raw: true
            });

            res.json({ top_challenges: rows });
        } catch (error) {
            next(error);
        }
    }

    // POST : Ajouter un vote à une contribution (participation)
    async voteForContribution(req, res, next) {
        try {
            const { contributionId } = req.params;
            const userId = req.user_id; // récupéré via le middleware d'auth

            if (!userId) {
                throw new HttpError('Utilisateur non authentifié', 401);
            }

            const user = await User.findByPk(userId);
            const contribution = await Contribution.findByPk(contributionId);

            if (!user || !contribution) {
                throw new HttpError('User ou contribution non trouvé', 404);
            }

            // Vérifier si le vote existe déjà
            const alreadyVoted = await user.hasCollab_contribution(contribution);
            if (alreadyVoted) {
                throw new HttpError('Vous avez déjà voté pour cette contribution', 409);
            }

            await user.addCollab_contribution(contribution);
            res.json({ success: true, message: 'Vote enregistré !' });
        } catch (error) {
            next(error);
        }
    }
}

export default new VoteController();
import { User, Challenge, Contribution } from '../models/index.js';
import { Sequelize } from 'sequelize';

const voteController = {

    // 1. Récupérer le nombre total de votes sur un challenge
    // Les votes = participants dans user_challenge
    async getChallengeVoteCount(req, res) {
        try {
            const { challengeId } = req.params;

            const challenge = await Challenge.findByPk(challengeId, {
                include: [
                    {
                        model: User,
                        as: 'participants',
                        attributes: ['id'], // On compte juste les participants
                        through: { attributes: [] } // Pas besoin des attributs de la table de jonction
                    }
                ]
            });

            if (!challenge) {
                return res.status(404).json({
                    error: 'Challenge non trouvé'
                });
            }

            const voteCount = challenge.participants ? challenge.participants.length : 0;

            res.json({
                challenge_id: challengeId,
                challenge_name: challenge.name,
                total_votes: voteCount
            });

        } catch (error) {
            console.error('Erreur lors de la récupération des votes du challenge:', error);
            res.status(500).json({
                error: 'Erreur serveur'
            });
        }
    },

    // 2. Récupérer le nombre total de votes sur une contribution (participation)
    // Les votes = contributeurs dans user_contribution
    async getContributionVoteCount(req, res) {
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
                        as: 'contributors', // Les votes via user_contribution
                        attributes: ['id'],
                        through: { attributes: [] }
                    }
                ]
            });

            if (!contribution) {
                return res.status(404).json({
                    error: 'Contribution non trouvée'
                });
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
            console.error('Erreur lors de la récupération des votes de la contribution:', error);
            res.status(500).json({
                error: 'Erreur serveur'
            });
        }
    },

    // 3. Récupérer la liste des utilisateurs avec les meilleures contributions (le plus de votes)
    async getTopContributors(req, res) {
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
                                as: 'contributors', // Les votes de chaque contribution
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

            // Calculer les totaux côté JS
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
                .filter(user => user.total_votes > 0) // Seulement les utilisateurs avec des votes
                .sort((a, b) => b.total_votes - a.total_votes) // Tri par nombre de votes DESC
                .slice(0, parseInt(limit)); // Limite

            res.json({
                top_contributors: contributorsStats
            });

        } catch (error) {
            console.error('Erreur lors de la récupération du top contributors:', error);
            res.status(500).json({
                error: 'Erreur serveur'
            });
        }
    }

};

export default voteController;
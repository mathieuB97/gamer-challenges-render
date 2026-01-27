import api from "../api.js";

/**
 * Créer une nouvelle participation (contribution) pour un challenge
 * @param {Object} payload - { challenge_id, video_url, duration, description? }
 * @returns {Promise<Object>} La contribution créée
 */
export async function createParticipation(payload) {
    if (!payload || !payload.challenge_id || !payload.video_url || !payload.duration) {
        throw new Error("challenge_id, video_url et duration requis pour createParticipation");
    }
    try {
        const data = await api('/contributions', 'POST', payload);
        return data;
    } catch (error) {
        console.error("Erreur dans createParticipation:", error);
        throw error;
    }
}

/**
 * Utiliser le endpoint {{base_url}}/votes/contribution/:id pour enregistrer le vote de l'utilisateur en base pour une contribution donnée. L'id de l'utilisateur sera récupéré depuis le token d'authentification.
    * @param {string|number} contributionId
 */
export async function postOneVoteForOneContribution(contributionId) {
    if (!contributionId) throw new Error("contributionId requis pour postOneVoteForOneContribution");
    try {
        const data = await api(`/votes/contribution/${contributionId}`, 'POST');
        return data;
    } catch (error) {
        console.error("Erreur dans postOneVoteForOneContribution:", error);
        throw error;
    }
}



/**
 * Récupère toutes les contributions sur lesquelles l'utilisateur courant a voté (via la table pivot user_contribution).
 * Utilise le endpoint sécurisé GET /contributions/votes/me
 * @returns {Promise<Array>} Liste des contributions votées par l'utilisateur
 */
export async function getVotesForCurrentUserContributions() {
    try {
        // L'instance api doit déjà gérer l'ajout du token dans les headers
        const data = await api('/contributions/votes/me', 'GET');
        return data;
    } catch (error) {
        console.error('Erreur dans getVotesForCurrentUserContributions:', error);
        throw error;
    }
}

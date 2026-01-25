import api from "../api.js";

/**
 * Utiliser le endpoint {{base_url}}/votes/challenge/:id pour enregistrer le vote de l'utilisateur en base pour un challenge donné. L'id de l'utilisateur sera récupéré depuis le token d'authentification.
    * @param {string|number} challengeId
 */
export async function postOneVoteForOneChallenge(challengeId) {
    if (!challengeId) throw new Error("challengeId requis pour postOneVoteForOneChallenge");
    try {
        const data = await api(`/votes/challenge/${challengeId}`, 'POST');
        return data;
    } catch (error) {
        console.error("Erreur dans postOneVoteForOneChallenge:", error);
        throw error;
    }
}
/**
 * Récupère les challenges d'un jeu par son id
 * @param {string|number} gameId
 * @returns {Promise<Array>} liste des challenges pour ce jeu
 */
export async function getChallengesByGameId(gameId) {
    if (!gameId) throw new Error("gameId requis pour getChallengesByGameId");
    const data = await api(`/games/${gameId}/challenges`);
    if (Array.isArray(data.challenges)) {
        return data.challenges;
    }
    throw new Error("Structure de données invalide : challenges doit être un tableau");
}
/**
 * Récupère le détail d'un challenge par son id
 * @param {string|number} id
 * @returns {Promise<Object>} le challenge ou une erreur
 */
export async function getChallengeDetail(id) {
    if (!id) throw new Error("id requis pour getChallengeDetail");
    try {
        const data = await api(`/challenges/${id}`);
        if (data && typeof data === 'object') {
            return data;
        }
        throw new Error("Challenge introuvable ou réponse invalide");
    } catch (error) {
        // Affiche l'erreur HTTP réelle pour debug
        if (error && error.message) {
            throw new Error(`Erreur API getChallengeDetail: ${error.message}`);
        }
        throw new Error("Erreur inconnue dans getChallengeDetail");
    }
}
// Service pour récupérer les données des challenges depuis l'API

/**
 * Récupère les challenges depuis l'API avec fallback sur les données mock
 * Retourne { data, isMock, errorMsg }
 */
export async function getChallenges() {
    // Utilise api.js pour cibler le bon endpoint
    const data = await api("/challenges");
    if (Array.isArray(data.challenges)) {
        return data.challenges;
    }
    throw new Error("Structure de données invalide : challenges doit être un tableau");
}

/**
 * Récupère les données du leaderboard depuis l'API
 */
export async function getLeaderboard() {
    try {
        const response = await fetch(`${API_BASE_URL}/leaderboard`);

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.leaderboardData) {
            return data.leaderboardData;
        }

        throw new Error("Leaderboard non trouvé");
    } catch (error) {
        console.error("Erreur lors de la récupération du leaderboard:", error);
        return mockLeaderboardData;
    }
}

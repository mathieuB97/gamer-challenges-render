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
    const data = await api("/leaderboard");
    if (Array.isArray(data.leaderboard)) {
        return data.leaderboard;
    }
    throw new Error("Structure de données invalide : leaderboard doit être un tableau");
}

/**
 * Crée un nouveau challenge
 * @param {Object} payload - données du challenge
 * @returns {Promise<Object>} le challenge créé
 */
export async function createChallenge(payload) {
    try {
        const data = await api("/challenges", "POST", payload);
        return data;
    } catch (error) {
        console.error("Erreur dans createChallenge:", error);
        throw error;
    }
}

/**
 * Récupère les 7 derniers challenges créés avec les images des jeux
 * @returns {Promise<Array>} liste des 7 derniers challenges
 */
export async function getLatestChallenges() {
    try {
        const data = await api("/challenges/latest");
        if (Array.isArray(data.challenges)) {
            return data.challenges;
        }
        throw new Error("Structure de données invalide : challenges doit être un tableau");
    } catch (error) {
        console.error("Erreur dans getLatestChallenges:", error);
        throw error;
    }
}
/**
 * Filtre les challenges par jeu, niveau et popularité
 * @param {Object} filters - Objet contenant les paramètres de filtrage
 * @param {string|null} filters.gameId - ID du jeu (optionnel)
 * @param {string|null} filters.level - Niveau de difficulté (easy, medium, hard) (optionnel)
 * @param {string} filters.sortBy - Ordre de tri (recent, popularity, name) (défaut: recent)
 * @returns {Promise<Array>} liste des challenges filtrés
 */
export async function filterChallenges(filters = {}) {
    try {
        const params = new URLSearchParams();
        
        if (filters.gameId) {
            params.append('gameId', filters.gameId);
        }
        if (filters.level) {
            params.append('level', filters.level);
        }
        if (filters.sortBy) {
            params.append('sortBy', filters.sortBy);
        }

        const queryString = params.toString();
        const endpoint = `/challenges/search/filter${queryString ? `?${queryString}` : ''}`;
        
        const data = await api(endpoint);
        if (Array.isArray(data.challenges)) {
            return data.challenges;
        }
        throw new Error("Structure de données invalide : challenges doit être un tableau");
    } catch (error) {
        console.error("Erreur dans filterChallenges:", error);
        throw error;
    }
}
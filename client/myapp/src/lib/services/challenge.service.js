// Service pour récupérer les données des challenges depuis l'API
import api from "../api.js";

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

// Service pour récupérer les données des challenges depuis l'API
import { 
    topChallenges as mockTopChallenges,
    newChallenges as mockNewChallenges,
    ongoingChallenges as mockOngoingChallenges,
    leaderboardData as mockLeaderboardData
} from "../../mock/data.js";

// Configuration de l'API backend
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
/**
 * Récupère les challenges depuis l'API avec fallback sur les données mock
 */
export async function getChallenges() {
    try {
        // Récupérer depuis l'API backend
        const response = await fetch(`${API_BASE_URL}/challenges`);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        
        if (data.challenges) {
            return {
                topChallenges: data.challenges.topChallenges || mockTopChallenges,
                newChallenges: data.challenges.newChallenges || mockNewChallenges,
                ongoingChallenges: data.challenges.ongoingChallenges || mockOngoingChallenges,
            };
        }
        
        throw new Error("Structure de données invalide");
    } catch (error) {
        console.warn("Erreur lors du chargement des données de l'API, utilisation des données mock:", error);
        
        // Fallback sur les données mock
        return {
            topChallenges: mockTopChallenges,
            newChallenges: mockNewChallenges,
            ongoingChallenges: mockOngoingChallenges,
        };
    }
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
        console.warn("Erreur lors du chargement du leaderboard, utilisation des données mock:", error);
        return mockLeaderboardData;
    }
}

/**
 * Récupère tous les challenges et leaderboard
 */
export async function getAllChallengesData() {
    const [challenges, leaderboard] = await Promise.all([
        getChallenges(),
        getLeaderboard()
    ]);

    return {
        ...challenges,
        leaderboardData: leaderboard
    };
}

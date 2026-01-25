import api from "../api.js";
// Service pour récupérer la liste des jeux (games)

export async function getGames() {
    try {
        return await api("/games");
    } catch (error) {
        console.error("Erreur dans getGames:", error);
        return null;
    }
}
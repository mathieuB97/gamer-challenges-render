import api from "../api.js";
// Service pour récupérer un jeu par son id
export async function getGameById(id) {
    if (!id) throw new Error("id requis pour getGameById");
    try {
        return await api(`/games/${id}`);
    } catch (error) {
        console.error("Erreur dans getGameById:", error);
        return null;
    }
}
// Service pour récupérer la liste des jeux (games)

export async function getGames() {
    try {
        return await api("/games");
    } catch (error) {
        console.error("Erreur dans getGames:", error);
        return null;
    }
}
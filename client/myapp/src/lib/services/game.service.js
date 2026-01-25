// Service pour récupérer la liste des jeux (games)
export async function getGames() {
    try {
        const response = await fetch("/api/games");
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des jeux");
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            throw new Error("Réponse non JSON reçue (probablement une page HTML)");
        }
    } catch (error) {
        console.error("Erreur dans getGames:", error);
        return null;
    }
}

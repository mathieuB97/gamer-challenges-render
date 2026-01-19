const API_BASE_URL = 'http://api:3000/api';

export async function getGames() {
    const response = await fetch(`${API_BASE_URL}/games`);
    if (!response.ok) throw new Error('Erreur lors du chargement des jeux');
    return response.json();
}

export async function getGame(id) {
    const response = await fetch(`${API_BASE_URL}/games/${id}`);
    if (!response.ok) throw new Error('Jeu non trouvé');
    return response.json();
}

export async function getChallenges(gameId = null) {
    const url = gameId ? `${API_BASE_URL}/challenges?gameId=${gameId}` : `${API_BASE_URL}/challenges`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erreur lors du chargement des défis');
    return response.json();
}

export async function getChallenge(id) {
    const response = await fetch(`${API_BASE_URL}/challenges/${id}`);
    if (!response.ok) throw new Error('Défi non trouvé');
    return response.json();
}

export async function login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Erreur de connexion');
    return response.json();
}

export async function register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Erreur lors de l\'inscription');
    return response.json();
}

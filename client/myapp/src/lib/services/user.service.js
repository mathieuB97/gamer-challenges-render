// Service pour récupérer un utilisateur par son id
import api from "../api.js";


export async function getUserById(id) {
    try {
        const user = await api(`/user/${id}`);
        return user;
    } catch (e) {
        throw new Error('Utilisateur introuvable');
    }
}

import api from "../api.js";
import { userStore } from "../stores/user.store.js";

// Récupère l'utilisateur courant via /auth/me
export const getCurrentUser = async () => {
    try {
        const user = await api("/auth/me", "GET");
        userStore.set(user);
        return user;
    } catch (error) {
        userStore.set(null);
        return null;
    }
};

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());

export const registerUser = async (user) => {
    return await api("/auth/register", "POST", user);
};

export const loginUser = async ({ emailOrPseudo, password }) => {
    const value = String(emailOrPseudo || "").trim();
    const payload = isEmail(value)
        ? { email: value, password }
        : { pseudo: value, password };

    return await api("/auth/login", "POST", payload);
};
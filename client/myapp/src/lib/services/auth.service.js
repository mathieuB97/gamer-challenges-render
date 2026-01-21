import api from "../api.js";

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
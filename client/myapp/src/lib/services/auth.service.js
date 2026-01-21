import api from "../api.js";

export const registerUser = async (user) => {
    return await api("/auth/register", "POST", user);
};

export const loginUser = async (user) => {
    return await api("/auth/login", "POST", user);
};
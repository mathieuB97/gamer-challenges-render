import api from "../api.js";

export const registerUser = async (user) => {
    return await api("/auth/register", "POST", user);
};
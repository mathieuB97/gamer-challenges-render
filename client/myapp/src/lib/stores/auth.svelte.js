import { writable } from "svelte/store";
import { userStore } from "./user.store.js";
import { getCurrentUser } from "../services/auth.service.js";

export const authStore = writable({ token: "" });

// Login : set token et user
export const setAuth = (token = "", user = null) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  authStore.set({ token });
  userStore.set(user);
};

// Déconnexion
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  authStore.set({ token: "" });
  userStore.set(null);
};

// Hydratation au démarrage et vérification côté serveur
export const getAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    clearAuth();
    return;
  }
  // Vérification côté serveur (API /auth/me)
  const user = await getCurrentUser();
  if (!user) {
    clearAuth();
    return;
  }
  authStore.set({ token });
  userStore.set(user);
};
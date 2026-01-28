import { writable } from "svelte/store";
import { userStore } from "./user.store.js";

export const authStore = writable({ token: null });

// Login : set token et user
export const setAuth = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  authStore.set({ token });
  userStore.set(user);
};

// Déconnexion
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  authStore.set({ token: null });
  userStore.set(null);
};

// Hydratation au démarrage
export const getAuth = () => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  if (token) authStore.set({ token });
  if (userStr) userStore.set(JSON.parse(userStr));
};
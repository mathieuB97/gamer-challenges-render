export const authStore = $state({  token: null,  });
import { userStore } from './user.store.js';

export const setAuth = (token) => {
  localStorage.setItem("token", token);
  authStore.token = token;
};

export const clearAuth = () => {
  authStore.token = null;
  // Déconnect
  // Supprimer user et token du localStorage
  localStorage.removeItem('token');
  // Met à jour le store utilisateur global pour la réactivité
  userStore.set(null);
};

export const getAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      authStore.token = token;
    } catch (e) {
      console.error('Error parsing:', e);
      clearAuth();
    }
  }
};

export const isAuthenticated = () => {
  const result = !!authStore.token;
  console.log('isAuth', result);
  return result;
};
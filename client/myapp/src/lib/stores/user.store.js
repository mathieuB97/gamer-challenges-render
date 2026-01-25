import { writable } from 'svelte/store';

// Store utilisateur courant (null si non connecté)
export const userStore = writable(null);

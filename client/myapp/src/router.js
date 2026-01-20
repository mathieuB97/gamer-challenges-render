import { writable } from 'svelte/store';
import page from 'page';
import Home from './pages/Home.svelte';
import Games from './pages/Games.svelte';
import GameDetail from './pages/GameDetail.svelte';
import Challenges from './pages/Challenges.svelte';
import About from './pages/About.svelte';
import NotFound from './pages/NotFound.svelte';
import Connexion from './pages/Connexion.svelte';
import Register from './pages/Register.svelte';


// Store pour le composant courant et les paramètres
export const currentComponent = writable(Home);
export const params = writable({});

// Configuration des routes
page('/', () => {
    currentComponent.set(Home);
    params.set({});
});

page('/jeux', () => {
    currentComponent.set(Games);
    params.set({});
});

page('/jeux/:id', (ctx) => {
    currentComponent.set(GameDetail);
    params.set({ gameId: ctx.params.id });
});

page('/challenges', () => {
    currentComponent.set(Challenges);
    params.set({});
});

page('/a-propos', () => {
    currentComponent.set(About);
    params.set({});
});

page('/connexion', () => {
    currentComponent.set(Connexion);
    params.set({});
});

page('/inscription', () => {
    currentComponent.set(Register);
    params.set({});
});
// Catch-all pour les routes non trouvées
page('*', () => {
    currentComponent.set(NotFound);
    params.set({});
});

// Démarrer le routeur
page.start();

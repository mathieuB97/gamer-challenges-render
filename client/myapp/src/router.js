import { writable } from 'svelte/store';
import page from 'page';
import Home from './pages/Home.svelte';
import Games from './pages/Games.svelte';
import About from './pages/About.svelte';
import NotFound from './pages/NotFound.svelte';
import Connexion from './pages/Connexion.svelte';
import Register from './pages/Register.svelte';
import ChallengeLists from './pages/ChallengeLists.svelte';
import CreateChallenge from './pages/CreateChallenge.svelte';
import DetailsChallenge from './pages/DetailsChallenge.svelte';
import RGPD from './pages/RGPD.svelte';
import Contact from './pages/Contact.svelte';


// Store pour le composant courant et les paramètres
export const currentComponent = writable(Home);
/** @type {import('svelte/store').Writable<Record<string, any>>} */
export const routeParams = writable({});
export const params = routeParams;

// Configuration des routes
page('/', () => {
    currentComponent.set(Home);
    routeParams.set({});
});

page('/jeux', () => {
    currentComponent.set(Games);
    routeParams.set({});
});

page('/a-propos', () => {
    currentComponent.set(About);
    routeParams.set({});
});

page('/connexion', () => {
    currentComponent.set(Connexion);
    routeParams.set({});
});

page('/inscription', () => {
    currentComponent.set(Register);
    routeParams.set({});
});

// on récupère les challenges d’un jeu spécifique
page('/jeux/:id/challenges', (ctx) => {
    currentComponent.set(ChallengeLists);
    routeParams.set({ gameId: ctx.params.id });
});

// Détail d’un challenge spécifique
page('/detail-challenge/:challengeId/:gameId', (ctx) => {
    currentComponent.set(DetailsChallenge);
    routeParams.set({ challengeId: ctx.params.challengeId, gameId: ctx.params.gameId });
});


page('/jeux/:id/creation-challenge', (ctx) => {
    currentComponent.set(CreateChallenge);
    routeParams.set({ gameId: ctx.params.id });
});

page('/rgpd', () => {
    currentComponent.set(RGPD);
    routeParams.set({});
});

page('/contact', () => {
    currentComponent.set(Contact);
    routeParams.set({});
});

// Catch-all pour les routes non trouvées
page('*', () => {
    currentComponent.set(NotFound);
    routeParams.set({});
});

// Démarrer le routeur
page.start();

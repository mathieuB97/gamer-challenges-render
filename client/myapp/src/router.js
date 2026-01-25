import { writable } from 'svelte/store';
import page from 'page';
import Home from './pages/Home.svelte';
import Games from './pages/Games.svelte';
// import GameDetail from './pages/GameDetail.svelte';
import Challenges from './pages/Challenges.svelte';
import About from './pages/About.svelte';
import NotFound from './pages/NotFound.svelte';
import Connexion from './pages/Connexion.svelte';
import Register from './pages/Register.svelte';
import ChallengeLists from './pages/ChallengeLists.svelte';
import CreateChallenge from './pages/CreateChallenge.svelte';
import DetailsChallenge from './pages/DetailsChallenge.svelte';


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

/*
je pense que cette route n'est pas nécessaire elle serait le détail d'un jeux. Nous avons déjà la page /liste-challenges/:id qui affiche les challenges d'un jeu spécifique
*/
// page('/jeux/:id', (ctx) => {
//    currentComponent.set(GameDetail);
//    routeParams.set({ gameId: ctx.params.id });
// });

page('/detail-challenge', () => {
    currentComponent.set(DetailsChallenge);
    routeParams.set({});
});
/**
 * La route des challenges est commentée car nous avons déjà une route plus spécifique pour les challenges d’un jeu cf. /jeux/:id/challenges
 */
// page('/challenges', () => {
//     currentComponent.set(Challenges);
//     routeParams.set({});
// });

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
// Option: rediriger l’ancienne route
page('/liste-challenges/:id', (ctx) => page.redirect(`/jeux/${ctx.params.id}/challenges`));


page('/jeux/:id/creation-challenge', (ctx) => {
    currentComponent.set(CreateChallenge);
    routeParams.set({ gameId: ctx.params.id });
});

// Catch-all pour les routes non trouvées
page('*', () => {
    currentComponent.set(NotFound);
    routeParams.set({});
});

// Démarrer le routeur
page.start();

<script>
  import Router from 'svelte-spa-router';
  import GamesListPage from './GamesListPage.svelte';
  import GameDetailPage from './GameDetailPage.svelte';

  const routes = {
    '/': GamesListPage,
    '/games': GamesListPage,
    '/games/:id': GameDetailPage
  };
</script>

<main>
  <Router {routes} />
</main>
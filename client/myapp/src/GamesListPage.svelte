<script>
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';

  let games = [];

  onMount(async () => {
    const res = await fetch('http://localhost:3000/games');
    games = await res.json();
  });
</script>

<h1>Liste des Jeux</h1>
<div style="display: grid; gap: 10px;">
  {#each games as game}
    <button on:click={() => push(`/games/${game.id}`)}>
      {game.name}
    </button>
  {/each}
</div>
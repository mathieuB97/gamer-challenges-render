<script>
  export let params = {}; // Récupère l'ID (:id) de l'URL
  import { onMount } from 'svelte';

  let game = null;

  onMount(async () => {
    if (params.id) {
      const res = await fetch(`http://localhost:3000/games/${params.id}`);
      game = await res.json();
    }
  });
</script>

<button on:click={() => window.history.back()}>← Retour</button>

{#if game}
  <h1>Détail de : {game.name}</h1>
  <p>{game.description || "Pas de description disponible"}</p>
{:else}
  <p>Chargement du jeu {params.id}...</p>
{/if}
<script>
  import { onMount } from 'svelte';

  // Variables réactives
  let games = $state([]);
  let loading = $state(true);
  let error = $state(null);

  // Fonction pour appeler ton API
  async function loadGames() {
    try {
      const response = await fetch('http://localhost:3000/games');
      
      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }

      const result = await response.json();
      
      // On extrait les données (vérifie si ton API renvoie directement un tableau ou {data: [...]})
      games = result.data || result; 
      
      console.log("Jeux chargés :", games);
    } catch (err) {
      error = err.message;
      console.error("Erreur de récupération :", err);
    } finally {
      loading = false;
    }
  }

  // Se lance automatiquement quand le composant apparaît à l'écran
  onMount(loadGames);
</script>

<main>
  <h1>Liste des Jeux Disponibles</h1>

  {#if loading}
    <div class="message">Chargement des données en cours...</div>
  {:else if error}
    <div class="message error">⚠️ Impossible de charger les jeux : {error}</div>
  {:else if games.length === 0}
    <div class="message">Aucun jeu trouvé dans la base de données.</div>
  {:else}
    <div class="game-grid">
      {#each games as game}
        <article class="game-card">
          <div class="img-placeholder">🎮</div>
          <h2>{game.name}</h2>
          <p class="category">{game.category}</p>
          
          <div class="actions">
            <button class="btn-info">Liste des challenges</button>
            <button class="btn-action">Créer un défi</button>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</main>

<style>
  /* Style pour la grille et les cartes */
  .game-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }

  .game-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }

  .img-placeholder {
    height: 120px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  .category {
    color: #666;
    font-style: italic;
    margin-bottom: 15px;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  button {
    padding: 10px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
  }

  .btn-info { background: #eee; color: #333; }
  .btn-action { background: #4a90e2; color: white; }

  .message { text-align: center; padding: 50px; font-size: 1.2rem; }
  .error { color: #d0021b; }
</style>
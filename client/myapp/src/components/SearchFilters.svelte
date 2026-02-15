<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { getGames } from '../lib/services/game.service.js';

  const dispatch = createEventDispatcher();

  let games = $state([]);
  let selectedGame = $state('');
  let selectedLevel = $state('');
  let selectedSort = $state('recent');

  const levels = [
    { value: '', label: 'Tous les niveaux' },
    { value: 'easy', label: 'Facile' },
    { value: 'medium', label: 'Moyen' },
    { value: 'hard', label: 'Difficile' },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Récents' },
    { value: 'popularity', label: 'Populaires' },
    { value: 'name', label: 'Par nom (A-Z)' },
  ];

  onMount(async () => {
    try {
      const data = await getGames();
      games = data || [];
    } catch (error) {
      console.error('Erreur lors du chargement des jeux:', error);
      games = [];
    }
  });

  function handleFilter() {
    dispatch('filter', {
      gameId: selectedGame || null,
      level: selectedLevel || null,
      sortBy: selectedSort || 'recent',
    });
  }

  function handleReset() {
    selectedGame = '';
    selectedLevel = '';
    selectedSort = 'recent';
    dispatch('filter', {
      gameId: null,
      level: null,
      sortBy: 'recent',
    });
  }
</script>

<div class="bg-[#12172b] rounded-xl p-6 mb-6">
  <h3 class="text-lg font-bold mb-4">Filtrer les défis</h3>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <!-- Filter by Game -->
    <div class="flex flex-col">
      <label for="game-filter" class="text-sm text-gray-400 mb-2">Jeu</label>
      <select
        id="game-filter"
        bind:value={selectedGame}
        onchange={handleFilter}
        class="px-3 py-2 bg-[#1a2139] border border-[#00d9ff] rounded text-white text-sm hover:border-[#00d9ff] transition-colors"
      >
        <option value="">Tous les jeux</option>
        {#each games as game (game.id)}
          <option value={game.id}>{game.name}</option>
        {/each}
      </select>
    </div>

    <!-- Filter by Level -->
    <div class="flex flex-col">
      <label for="level-filter" class="text-sm text-gray-400 mb-2">Niveau</label>
      <select
        id="level-filter"
        bind:value={selectedLevel}
        onchange={handleFilter}
        class="px-3 py-2 bg-[#1a2139] border border-[#00d9ff] rounded text-white text-sm hover:border-[#00d9ff] transition-colors"
      >
        {#each levels as level (level.value)}
          <option value={level.value}>{level.label}</option>
        {/each}
      </select>
    </div>

    <!-- Sort by Popularity -->
    <div class="flex flex-col">
      <label for="sort-filter" class="text-sm text-gray-400 mb-2">Trier par</label>
      <select
        id="sort-filter"
        bind:value={selectedSort}
        onchange={handleFilter}
        class="px-3 py-2 bg-[#1a2139] border border-[#00d9ff] rounded text-white text-sm hover:border-[#00d9ff] transition-colors"
      >
        {#each sortOptions as option (option.value)}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Reset Button -->
  <button
    onclick={handleReset}
    class="w-full md:w-auto px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm transition-colors"
  >
    Réinitialiser les filtres
  </button>
</div>

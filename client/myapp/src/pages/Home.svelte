<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import ChallengeCard from "../components/ChallengeCard.svelte";
  import SearchFilters from "../components/SearchFilters.svelte";
  import Carousel from "../components/Carousel.svelte";
  import {
    getLeaderboard,
    getLatestChallenges,
    filterChallenges,
  } from "../lib/services/challenge.service.js";
  import {
    topChallenges as mockTopChallenges,
    newChallenges as mockNewChallenges,
    ongoingChallenges as mockOngoingChallenges,
    leaderboardData as mockLeaderboardData,
  } from "../mock/data.js";
  import { getTopChallenges } from "../lib/services/vote.service.js";

  // Initialisation de la variable avec une valeur vide permet d'attendre les données avant de les afficher. Si les données ne peuvent pas être récupérées en base on utilise les données mock.
  let filteredChallenges = $state([]);
  let topChallenges = $state([]);
  let newChallenges = $state([]);
  // TODO ongoingChallenges n'est pas encore implémenté côté backend, on utilise les données mock pour l'instant

  // États initialisés avec les données mock, sont mises à jour avec les vraies données
  let ongoingChallenges = $state(mockOngoingChallenges);
  let leaderboardData = $state(mockLeaderboardData);
  let isLoading = $state(true);
  let isFilterApplied = $state(false);

  let filteredChallengesIndex = $state(0);

  // Fonction pour charger toutes les données
  async function loadAllData() {
    try {
      isLoading = true;

      // Charger les top challenges
      const topResponse = await getTopChallenges();
      topChallenges = topResponse.top_challenges || mockTopChallenges;

      // Charger les nouveaux challenges (7 derniers)
      const latestChallengesData = await getLatestChallenges();
      newChallenges = latestChallengesData || mockNewChallenges;

      // Charger le leaderboard
      const leaderboardResponse = await getLeaderboard();
      leaderboardData = leaderboardResponse || mockLeaderboardData;
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      // Utiliser les données mock en cas d'erreur
      topChallenges = mockTopChallenges;
      newChallenges = mockNewChallenges;
      leaderboardData = mockLeaderboardData;
    } finally {
      isLoading = false;
    }
  }

  // Fonction pour gérer le filtrage
  async function handleFilter(filterParams) {
    try {
      isLoading = true;
      filteredChallengesIndex = 0;

      if (
        !filterParams.gameId &&
        !filterParams.level &&
        filterParams.sortBy === "recent"
      ) {
        // Si aucun filtre n'est appliqué, réinitialiser
        isFilterApplied = false;
        filteredChallenges = [];
      } else {
        // Appliquer le filtre
        const result = await filterChallenges(filterParams);
        filteredChallenges = result || [];
        isFilterApplied = true;
      }
    } catch (error) {
      console.error("Erreur lors du filtrage:", error);
      isFilterApplied = false;
      filteredChallenges = [];
    } finally {
      isLoading = false;
    }
  }

  // Charger les données au montage du composant
  onMount(() => {
    loadAllData();
  });
</script>

<div class="flex flex-col md:flex-row gap-6 w-full">
  <!-- Leaderboard -->
  <div
    class="w-full md:w-64 md:sticky top-20 h-98 md:h-128.5 overflow-hidden py-4 pb-4 md:pb-4 bg-[#12172b] rounded-xl"
  >
    <div class="h-full overflow-y-auto px-4 scrollbar-thumb-gray-600">
      <h2 class="text-xl mb-4">Leaderboard</h2>
      <div class="space-y-4">
        {#each leaderboardData as player, i ((player.rank, i))}
          <div class="relative group cursor-pointer">
            <!-- rank best player-->
            <div
              class="absolute -top-2 -left-2 w-8 h-8 rounded-lg flex items-center justify-center z-10
								{i + 1 === 1
                ? 'bg-linear-to-br from-yellow-400 to-yellow-600'
                : i + 1 === 2
                  ? 'bg-linear-to-br from-gray-300 to-gray-500'
                  : i + 1 === 3
                    ? 'bg-linear-to-br from-amber-600 to-amber-800'
                    : 'bg-linear-to-br from-[#1a2139] to-[#12172b]'}"
            >
              <span class="font-bold">{i + 1 || player.rank}</span>
            </div>
            <!-- Card -->
            <div class="relative overflow-hidden rounded-lg">
              <img
                src={player.game_image ?? player.image}
                alt={player.game_name ?? player.name}
                class="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"
              ></div>
              <div class="absolute bottom-2 left-2 right-2">
                <p class="text-sm mb-0.5">{player.game_name ?? player.name}</p>
                <p class="text-xs text-[#00d9ff] italic">
                  {player.pseudo}
                </p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Challenges Section -->
  <div class="flex-1 space-y-8">
    <!-- Search Filters -->
    <SearchFilters onFilter={handleFilter} />

    {#if isFilterApplied && filteredChallenges.length > 0}
      <Carousel
        items={filteredChallenges}
        cardComponent={ChallengeCard}
        sectionTitle={`Résultats filtrés (${filteredChallenges.length})`}
        chunkSizeMobile={3}
        chunkSizeDesktop={3}
        gridColsMobile={3}
        gridColsDesktop={3}
      />
    {:else if isFilterApplied && filteredChallenges.length === 0}
      <div class="bg-[#12172b] rounded-xl p-8 text-center">
        <p class="text-gray-400">
          Aucun challenge ne correspond à vos critères de recherche.
        </p>
      </div>
    {/if}

    <Carousel
      items={topChallenges}
      cardComponent={ChallengeCard}
      sectionTitle="Top Challenges"
      chunkSizeMobile={2}
      chunkSizeDesktop={3}
      gridColsMobile={2}
      gridColsDesktop={3}
    />

    <Carousel
      items={newChallenges}
      cardComponent={ChallengeCard}
      sectionTitle="Nouveaux challenges"
      chunkSizeMobile={2}
      chunkSizeDesktop={3}
      gridColsMobile={2}
      gridColsDesktop={3}
      cardProps={{ showVotes: false }}
    />

    <Carousel
      items={ongoingChallenges}
      cardComponent={ChallengeCard}
      sectionTitle="Défis en cours"
      chunkSizeMobile={2}
      chunkSizeDesktop={3}
      gridColsMobile={2}
      gridColsDesktop={3}
    />
  </div>
</div>

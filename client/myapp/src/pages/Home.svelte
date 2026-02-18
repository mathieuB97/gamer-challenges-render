<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import ChallengeCard from "../components/ChallengeCard.svelte";
  import SearchFilters from "../components/SearchFilters.svelte";
  import IconArrowLeft from "../components/icon-arrow-left.svelte";
  import IconArrowRight from "../components/icon-arrow-right.svelte";
  import {
    getChallenges,
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

  // Initialisation de la variable avec une valeur vide
  let topChallenges = [];
  let newChallenges = $state([]);
  let filteredChallenges = $state([]);

  // États initialisés avec les données mock, seront mises à jour avec les vraies données
  let ongoingChallenges = $state(mockOngoingChallenges);
  let leaderboardData = $state(mockLeaderboardData);
  let isLoading = $state(true);
  let isFilterApplied = $state(false);

  // Fonction pour diviser un tableau en chunks
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const sliderChunked = writable({ top: [], new: [], filtered: [] });

  $effect(() => {
    sliderChunked.set({
      top: getSliderChunked("top"),
      new: getSliderChunked("new"),
      filtered: getSliderChunked("filtered"),
    });
  });

  // Variables pour tracker l'index de chaque carrousel
  let topChallengesIndex = $state(0);
  let newChallengesIndex = $state(0);
  let ongoingChallengesIndex = $state(0);
  let filteredChallengesIndex = $state(0);

  // Fonction pour adapter le nombre de slides affichés en fonction de la taille de l'écran
  let chunkSize = $state(2);
  function updateChunkSize() {
    chunkSize = window.matchMedia("(min-width: 768px)").matches ? 3 : 2;
  }

  // Fonction utilitaire pour découper les sliders
  function getSliderChunked(type) {
    if (type === "top") return chunkArray(topChallenges, chunkSize);
    if (type === "new") return chunkArray(newChallenges, chunkSize);
    if (type === "filtered") return chunkArray(filteredChallenges, chunkSize);
    if (type === "ongoing") return chunkArray(ongoingChallenges, chunkSize);
    return [];
  }
  // Diviser les challenges en groupes de chunkSize pour les carrousels
  let ongoingChallengesChunked = $derived(
    chunkArray(ongoingChallenges, chunkSize),
  );

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
  // Mutualisation de la mise à jour des chunks pour tous les sliders

  // Charger les données au montage du composant
  onMount(() => {
    loadAllData();
    // Mettre à jour la taille des chunks en fonction de la taille de l'écran
    updateChunkSize();
    window.addEventListener("resize", updateChunkSize);

    // Recharger les données quand la page redevient visible
    // (par exemple après avoir voté sur une page de détail et être revenu)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadAllData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", updateChunkSize);
    };
  });

  // Fonctions de navigation
  const nextSlide = (currentIndex, maxIndex, setIndex) => {
    if (currentIndex < maxIndex - 1) {
      setIndex(currentIndex + 1);
    }
  };

  const prevSlide = (currentIndex, setIndex) => {
    if (currentIndex > 0) {
      setIndex(currentIndex - 1);
    }
  };
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
      <!-- Filtered Challenges Section -->
      <section>
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl">
            Résultats filtrés ({filteredChallenges.length})
          </h2>
          <div class="carousel-navigation flex gap-2">
            {#if filteredChallengesIndex > 0}
              <button
                onclick={() =>
                  prevSlide(
                    filteredChallengesIndex,
                    (index) => (filteredChallengesIndex = index),
                  )}
                class="flex items-center justify-center text-[#00d9ff]"
                title="Précédent"
              >
                <IconArrowLeft />
              </button>
            {/if}

            {#if filteredChallengesIndex < $sliderChunked.filtered.length - 1}
              <button
                onclick={() =>
                  nextSlide(
                    filteredChallengesIndex,
                    $sliderChunked.filtered.length,
                    (index) => (filteredChallengesIndex = index),
                  )}
                class="flex items-center justify-center text-[#00d9ff]"
                title="Suivant"
              >
                <IconArrowRight />
              </button>
            {/if}
          </div>
        </div>
        <div class="relative">
          <!-- Carousel Container -->
          <div class="overflow-hidden">
            <div
              class="flex transition-transform duration-300 ease-in-out"
              style="transform: translateX(-{filteredChallengesIndex * 100}%)"
            >
              {#each $sliderChunked.filtered as chunk}
                <div class="w-full shrink-0 grid grid-cols-3 gap-4">
                  {#each chunk as challenge (challenge.id)}
                    <ChallengeCard {...challenge} />
                  {/each}
                </div>
              {/each}
            </div>
          </div>
        </div>
      </section>
    {:else if isFilterApplied && filteredChallenges.length === 0}
      <div class="bg-[#12172b] rounded-xl p-8 text-center">
        <p class="text-gray-400">
          Aucun challenge ne correspond à vos critères de recherche.
        </p>
      </div>
    {/if}

    <!-- Top Challenges Carousel -->
    <section>
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl">Top Challenges</h2>

        <div class="carousel-navigation flex gap-2">
          {#if topChallengesIndex > 0}
            <button
              onclick={() =>
                prevSlide(
                  topChallengesIndex,
                  (index) => (topChallengesIndex = index),
                )}
              class="flex items-center justify-center text-[#00d9ff]"
              title="Précédent"
            >
              <IconArrowLeft />
            </button>
          {/if}

          {#if topChallengesIndex < $sliderChunked.top.length - 1}
            <button
              onclick={() =>
                nextSlide(
                  topChallengesIndex,
                  $sliderChunked.top.length,
                  (index) => (topChallengesIndex = index),
                )}
              class="flex items-center justify-center text-[#00d9ff]"
              title="Suivant"
            >
              <IconArrowRight />
            </button>
          {/if}
        </div>
      </div>
      <div class="relative">
        <!-- Carousel Container -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-300 ease-in-out"
            style="transform: translateX(-{topChallengesIndex * 100}%)"
          >
            {#each $sliderChunked.top as chunk}
              <div
                class="w-full shrink-0 grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {#each chunk as challenge (challenge.id)}
                  <ChallengeCard {...challenge} />
                {/each}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- New Challenges Carousel -->
    <section>
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl">Nouveaux challenges</h2>
        <div class="carousel-navigation flex gap-2">
          {#if newChallengesIndex > 0}
            <button
              onclick={() =>
                prevSlide(
                  newChallengesIndex,
                  (index) => (newChallengesIndex = index),
                )}
              class="flex items-center justify-center text-[#00d9ff]"
              title="Précédent"
            >
              <IconArrowLeft />
            </button>
          {/if}

          {#if newChallengesIndex < $sliderChunked.new.length - 1}
            <button
              onclick={() =>
                nextSlide(
                  newChallengesIndex,
                  $sliderChunked.new.length,
                  (index) => (newChallengesIndex = index),
                )}
              class="flex items-center justify-center text-[#00d9ff]"
              title="Suivant"
            >
              <IconArrowRight />
            </button>
          {/if}
        </div>
      </div>
      <div class="relative">
        <!-- Carousel Container -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-300 ease-in-out"
            style="transform: translateX(-{newChallengesIndex * 100}%)"
          >
            {#each $sliderChunked.new as chunk}
              <div
                class="w-full shrink-0 grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {#each chunk as challenge (challenge.id)}
                  <ChallengeCard {...challenge} showVotes={false} />
                {/each}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- Ongoing Challenges Carousel -->
    <section>
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl">Défis en cours</h2>
        <div class="flex gap-2">
          <div class="carousel-navigation flex gap-2">
            {#if ongoingChallengesIndex > 0}
              <button
                onclick={() =>
                  prevSlide(
                    ongoingChallengesIndex,
                    (index) => (ongoingChallengesIndex = index),
                  )}
                class="flex items-center justify-center text-[#00d9ff]"
                title="Précédent"
              >
                <IconArrowLeft />
              </button>
            {/if}

            {#if ongoingChallengesIndex < ongoingChallengesChunked.length - 1}
              <button
                onclick={() =>
                  nextSlide(
                    ongoingChallengesIndex,
                    ongoingChallengesChunked.length,
                    (index) => (ongoingChallengesIndex = index),
                  )}
                class="flex items-center justify-center text-[#00d9ff]"
                title="Suivant"
              >
                <IconArrowRight />
              </button>
            {/if}
          </div>
        </div>
      </div>
      <div class="relative">
        <!-- Carousel Container -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-300 ease-in-out"
            style="transform: translateX(-{ongoingChallengesIndex * 100}%)"
          >
            {#each ongoingChallengesChunked as chunk, i}
              <div
                class="w-full shrink-0 grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {#each chunk as challenge (challenge.id)}
                  <ChallengeCard {...challenge} />
                {/each}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

<script>
  import IconGamePad from "../components/icon-game-pad.svelte";
  import IconAdd from "../components/icon-add.svelte";
  import { mockGames as MOCK_GAMES } from "../mock/games.mock.js";
  import { getGames } from "../lib/services/game.service.js";
  import api from "../lib/api.js";
  import { onMount } from "svelte";

  let games = [];
  let isLoading = true;

  // Au montage, on tente de charger les jeux via l'API, sinon fallback mock
  onMount(async () => {
    try {
      const apiGames = await getGames();
      if (apiGames && Array.isArray(apiGames)) {
        // Pour chaque jeu, on va chercher le nombre de challenges via /games/:id/challenges
        const gamesWithCount = await Promise.all(
          apiGames.map(async (game) => {
            try {
              const res = await api(`/games/${game.id}/challenges`);
              // res.challenges doit être un tableau
              const count = Array.isArray(res.challenges)
                ? res.challenges.length
                : undefined;
              return {
                ...game,
                challenges:
                  typeof count === "number" && count > 0 ? count : undefined,
              };
            } catch (e) {
              return { ...game };
            }
          }),
        );
        games = gamesWithCount;
      } else {
        games = MOCK_GAMES;
      }
    } catch (e) {
      games = MOCK_GAMES;
    } finally {
      isLoading = false;
    }
  });
</script>

<main class="container mx-auto px-4 py-8">
  <div class="mb-8">
    <h1 class="text-3xl md:text-4xl mb-3 text-white">
      <span class="text-[#7b2cbf]">Liste</span> des jeux
    </h1>
    <p class="text-white/70">
      Choisissez votre jeu et découvrez les défis de la communauté
    </p>
  </div>

  {#if isLoading}
    <div class="text-white">Chargement des jeux...</div>
  {:else}
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each games as game (game.id)}
        <div
          class="bg-[#141824] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00d9ff]/50 transition-all group cursor-pointer"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              src={game.image}
              alt={game.name}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div
              class="absolute inset-0 bg-linear-to-t from-[#141824] to-transparent"
            ></div>
          </div>

          <div class="p-6">
            <h3 class="text-xl mb-3 text-white">{game.name}</h3>
            <!-- {JSON.stringify(game)} -->
            <div class="flex items-center gap-4 text-sm text-white/60 mb-4">
              <span class="flex items-center gap-1">
                <IconGamePad className="w-4 h-4" />
                {#if typeof game.challenges === "number"}
                  {game.challenges} défis
                {/if}
              </span>
            </div>

            <div class="flex gap-3">
              <a
                href={`/jeux/${game.id}/challenges`}
                class="flex-1 py-2 px-4 text-center rounded-lg border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-white transition-colors text-sm"
                >Liste des challenges</a
              >
              <a
                href={`/jeux/${game.id}/creation-challenge`}
                class="py-2 px-3 rounded-lg bg-linear-to-r from-[#7b2cbf] to-[#00d9ff] hover:opacity-90 transition-opacity text-white"
                aria-label="Créer un défi"
              >
                <IconAdd className="w-5 h-5 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>

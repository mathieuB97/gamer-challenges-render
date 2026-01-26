<script>
  import { onMount, onDestroy } from "svelte";
  import IconAdd from "../components/icon-add.svelte";
  import { getGameById } from "../lib/services/game.service.js";
  // Service pour récupérer les challenges d'un jeu
  import { getChallengesByGameId } from "../lib/services/challenge.service.js";
  import { mockChallenges } from "../mock/challenges.mock.js";
  // Service pour récupérer un utilisateur par id
  import { getUserById } from "../lib/services/user.service.js";
  import { mockGames } from "../mock/games.mock";
  import { mockUsers } from "../mock/users.mock.js";
  // Id du jeu passé par le router (SPA)
  export let gameId;

  // Etat page (liste challenges)
  let challenges = [];
  let loading = true;
  let errorMsg = "";

  // Modal description du jeu
  let isGameModalOpen = false;

  // Infos jeu (dynamique)
  let game = null;
  // Fallback mock si besoin
  const mockGame = mockGames[0];
  // Service pour récupérer les infos du jeu

  function openGameModal() {
    isGameModalOpen = true;
    document.body.style.overflow = "hidden";
  }

  function closeGameModal() {
    isGameModalOpen = false;
    document.body.style.overflow = "";
  }

  function handleKeydown(e) {
    if (e.key === "Escape" && isGameModalOpen) closeGameModal();
  }

  // Si pas d'id, fallback direct sur le mock
  if (!gameId) {
    game = mockGame;
    challenges = mockChallenges.filter((ch) => ch.game_id === mockGame.id);
    loading = false;
  }

  onMount(async () => {
    // Si pas d'id, on a déjà fallback plus haut
    if (!gameId) return;
    window.addEventListener("keydown", handleKeydown);

    // Récupère les infos du jeu
    try {
      game = await getGameById(gameId);
      if (!game) throw new Error("Aucune donnée jeu");
    } catch (error) {
      console.error("Erreur API game:", error);
      game = mockGame;
      errorMsg = "API jeu indisponible : affichage mock.";
    }

    // Récupère les challenges pour ce jeu
    try {
      const gameChallenges = await getChallengesByGameId(gameId ?? mockGame.id);
      challenges = Array.isArray(gameChallenges) ? gameChallenges : [];
      // Pour chaque challenge, récupérer le pseudo du créateur
      await Promise.all(
        challenges.map(async (ch) => {
          if (ch.user_id) {
            try {
              const user = await getUserById(ch.user_id);
              ch.author = user?.pseudo || "Auteur inconnu";
            } catch (e) {
              // fallback mock
              const mockUser = mockUsers.find((u) => u.id === ch.user_id);
              ch.author = mockUser ? mockUser.pseudo : "Auteur inconnu";
            }
          } else {
            ch.author = "Auteur inconnu";
          }
        }),
      );
      if (challenges.length === 0) errorMsg = "Aucun challenge pour ce jeu.";
    } catch (error) {
      console.error("Erreur API challenges:", error);
      challenges = mockChallenges.filter((ch) =>
        gameId ? ch.game_id === Number(gameId) : ch.game_id === mockGame.id,
      );
      // Pour chaque challenge mock, pseudo mock
      challenges.forEach((ch) => {
        const mockUser = mockUsers.find((u) => u.id === ch.user_id);
        ch.author = mockUser ? mockUser.pseudo : "Auteur inconnu";
      });
      errorMsg = "API challenges indisponible : affichage mock.";
    } finally {
      loading = false;
    }
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeydown);
    document.body.style.overflow = "";
  });

  function submitParticipation(challenge) {
    alert(`Participation: ${challenge.title}`);
  }
</script>

<main class="h-full px-4 py-8">
  <section class="mx-auto w-full max-w-6xl">
    <!-- Titre -->
    <div class="mb-6 text-center">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-white">
        <span
          class="bg-linear-to-r from-[#7b2cbf] to-[#00d9ff] bg-clip-text text-transparent"
        >
          Challenges
        </span>
        <span class="text-white/90"> disponibles</span>
      </h1>
    </div>

    <!-- Layout 2 colonnes -->
    <div class="grid gap-4 lg:items-start lg:grid-cols-[360px_1fr]">
      <!-- Colonne gauche : carte jeu -->
      <aside
        class="bg-[#141824] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
      >
        <!-- Image + masque -->
        <div class="relative h-56 w-full">
          <img
            src={game?.image}
            alt={game?.name}
            class="h-full w-full object-cover"
            loading="lazy"
          />
          <!-- Masque ombrage bas -->
          <div
            class="absolute inset-0 bg-linear-to-t from-[#0a0e1a]/95 via-[#0a0e1a]/40 to-transparent"
          ></div>
        </div>

        <!-- Contenu -->
        <div class="p-5 flex flex-col gap-4 flex-1">
          <div>
            <h2 class="text-xl font-bold text-white">{game?.name}</h2>
            <p class="mt-1 text-sm text-white/70">
              Catégorie: {game?.category}
            </p>
            <p>
              Ajouté le: {game?.createdAt
                ? new Date(game.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <!-- Boutons -->
          <div class="mt-5 flex flex-col gap-3">
            <!-- Bouton Description -->
            <button
              type="button"
              class="w-full py-3 rounded-lg border border-[#00d9ff] text-[#00d9ff]
                     hover:bg-[#00d9ff]/10 transition-colors font-medium"
              on:click={openGameModal}
            >
              Description
            </button>

            <!-- Bouton + Créer un défi -->
            {#if game && game.id}
              <a
                href={`/jeux/${game.id}/creation-challenge`}
                class="w-full py-3 rounded-lg
           bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff]
           text-white font-semibold
           hover:opacity-90 transition-opacity
           inline-flex items-center justify-center gap-2"
              >
                <IconAdd size={16} className="shrink-0" />
                <span class="leading-none">Créer un défi</span>
              </a>
            {/if}
          </div>
        </div>
      </aside>

      <!-- Colonne droite : liste -->
      <section
        class="bg-[#141824] border border-white/10 rounded-2xl p-5 lg:p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">
            Challenges disponibles
          </h2>

          <div class="text-sm text-white/60">
            {#if loading}
              Chargement...
            {:else}
              {challenges?.length ?? 0} défis
            {/if}
          </div>
        </div>

        {#if errorMsg}
          <p class="text-xs text-amber-300 mb-4">{errorMsg}</p>
        {/if}

        {#if loading}
          <div class="py-10 text-center text-white/70">
            Chargement des challenges...
          </div>
        {:else if !challenges || challenges.length === 0}
          <div class="py-10 text-center text-white/70">
            Aucun challenge disponible.
          </div>
        {:else}
          <!-- zone scrollable -->
          <div class="max-h-[520px] overflow-auto pr-2 space-y-4 custom-scroll">
            {#each challenges as c (c.id)}
              <article
                class="bg-[#0a0e1a]/50 border border-white/10 rounded-2xl p-4 transition
                       hover:border-[#7b2cbf]/70 hover:shadow-[0_0_0_1px_rgba(123,44,191,0.25)]"
              >
                <!-- Ligne 1 : avatar + titre + note -->
                <div class="flex items-start justify-between gap-4">
                  <div class="flex items-start gap-3 min-w-0">
                    <!-- Avatar -->
                    <div
                      class="h-10 w-10 rounded-full bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff]
                             flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                      aria-hidden="true"
                    >
                      {c.author?.slice(0, 2)?.toUpperCase() ?? "GC"}
                    </div>

                    <!-- Texte -->
                    <div class="min-w-0">
                      <h3
                        class="text-white font-semibold leading-tight truncate"
                      >
                        {c.title ?? c.name}
                      </h3>

                      <p class="text-xs text-white/60 mt-1">
                        Par <span class="text-white/80"
                          >{c.author ?? "Auteur inconnu"}</span
                        >
                      </p>

                      <div
                        class="flex items-center gap-3 mt-2 text-xs flex-wrap"
                      >
                        <span class="text-white/70">🏆 {c.level}</span>
                        <span class="text-white/70"
                          >⚡ {c.difficulty ?? "N/A"}</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Note -->
                  <div
                    class="flex items-center gap-2 text-sm text-white/80 flex-shrink-0"
                  >
                    <span class="text-yellow-300">★</span>
                    <span>{c.rating ?? "N/A"}</span>
                  </div>
                </div>

                <!-- Ligne 2 : boutons -->
                <div class="mt-4 grid grid-cols-2 gap-3">
                  <a
                    href={`/detail-challenge/${c.id}`}
                    class="w-full text-center font-bold py-2.5 rounded-lg border border-white/15 text-white/80
                           hover:bg-white/5 transition"
                  >
                    Détail
                  </a>

                  <button
                    type="button"
                    class="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff]
                           text-white font-semibold hover:opacity-90 transition-opacity"
                    on:click={() => submitParticipation(c)}
                  >
                    Déposer une participation
                  </button>
                </div>
              </article>
            {/each}
          </div>
        {/if}
      </section>
    </div>
  </section>

  <!-- MODAL DESCRIPTION JEU -->
  {#if isGameModalOpen}
    <!-- Overlay -->
    <div class="fixed inset-0 z-40 bg-black/60" on:click={closeGameModal}></div>

    <!-- Modal -->
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        class="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#141824]
               shadow-xl overflow-hidden"
        on:click|stopPropagation
      >
        <!-- Header modal -->
        <div class="flex items-start justify-between gap-4 p-6">
          <div>
            <h2 class="text-2xl font-extrabold text-white">{game.title}</h2>
            <p class="mt-1 text-sm text-white/70">{game.subtitle}</p>
          </div>

          <button
            type="button"
            class="h-10 w-10 rounded-lg border border-white/15 text-white/80
                   hover:bg-white/5 transition flex items-center justify-center"
            on:click={closeGameModal}
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="px-6 pb-6">
          <p class="text-sm leading-relaxed text-white/80">
            {game.description}
          </p>

          <div
            class="mt-5 border-t border-white/10 pt-4 grid grid-cols-2 gap-4 text-sm"
          >
            <div>
              <p class="text-white/60 text-xs">Genre</p>
              <p class="text-white font-semibold">{game.genre}</p>
            </div>

            <div>
              <p class="text-white/60 text-xs">Joueurs</p>
              <p class="text-white font-semibold">{game.players}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  .custom-scroll::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.12);
    border-radius: 999px;
  }
  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.18);
  }
</style>

<script>
  import { onMount } from "svelte";
  import IconAdd from "../components/icon-add.svelte";

  let challenges = [];
  let loading = true;
  let errorMsg = "";

  // Carte jeu (colonne gauche)
  const game = {
    id: 1,
    title: "Apex Legends",
    subtitle: "Battle Royale - 3 joueurs",
    imageUrl:
      "https://images.unsplash.com/photo-1611138290962-2c550ffd4002?w=600&auto=format&fit=crop&q=80",
  };

  // MOCK (pour intégrer la maquette même si l’API ne répond pas encore)
  const mockChallenges = [
    {
      id: 1,
      title: "Victoire sans bouclier",
      author: "ProGamer42",
      level: "Expert",
      difficulty: "Difficile",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Top 1 au pistolet",
      author: "Maka",
      level: "Intermédiaire",
      difficulty: "Moyen",
      rating: 4.0,
    },
    {
      id: 3,
      title: "0 dégâts subis",
      author: "NoHit",
      level: "Expert",
      difficulty: "Difficile",
      rating: 4.8,
    },
    {
      id: 4,
      title: "Win en solo",
      author: "SoloKing",
      level: "Avancé",
      difficulty: "Difficile",
      rating: 4.2,
    },
  ];

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/challenges");
      if (!response.ok) throw new Error("API route not found");
      challenges = await response.json();
    } catch (error) {
      console.error("Erreur API:", error);
      challenges = mockChallenges;
      errorMsg =
        "API indisponible : affichage en démo pour la team : manu micka et brahim ;) .";
    } finally {
      loading = false;
    }
  });

  function openDetail(challenge) {
    alert(`Détail: ${challenge.title}`);
  }

  function submitParticipation(challenge) {
    alert(`Participation: ${challenge.title}`);
  }
</script>

<main class="min-h-[calc(100vh-200px)] px-4 py-8">
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
    <div class="grid gap-4 lg:grid-cols-[360px_1fr]">
      <!-- Colonne gauche : carte jeu -->
      <aside
        class="bg-[#141824] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
      >
        <!-- Image + masque -->
        <div class="relative h-56 w-full">
          <img
            src={game.imageUrl}
            alt={game.title}
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
            <h2 class="text-xl font-bold text-white">{game.title}</h2>
            <p class="mt-1 text-sm text-white/70">{game.subtitle}</p>
          </div>

          <!-- Boutons -->
          <div class="mt-5 flex flex-col gap-3">
            <!-- Bouton Description -->
            <button
              type="button"
              class="w-full py-3 rounded-lg border border-[#00d9ff] text-[#00d9ff]
                     hover:bg-[#00d9ff]/10 transition-colors font-medium"
            >
              Description
            </button>

            <!-- Bouton + Créer un défi -->
            <a
              href={`/jeux/${game.id}/creation-challenge`}
              class="w-full py-3 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff]
                     text-white font-semibold hover:opacity-90 transition-opacity
                     inline-flex items-center justify-center gap-2"
            >
              <IconAdd className="w-5 h-5" />
              <span>Créer un défi</span>
            </a>
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
                             flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      aria-hidden="true"
                    >
                      {c.author?.slice(0, 2)?.toUpperCase() ?? "GC"}
                    </div>

                    <!-- Texte -->
                    <div class="min-w-0">
                      <h3
                        class="text-white font-semibold leading-tight truncate"
                      >
                        {c.title}
                      </h3>

                      <p class="text-xs text-white/60 mt-1">
                        Par <span class="text-white/80">{c.author}</span>
                      </p>

                      <div
                        class="flex items-center gap-3 mt-2 text-xs flex-wrap"
                      >
                        <span class="text-white/70">🏆 {c.level}</span>
                        <span class="text-white/70">⚡ {c.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Note -->
                  <div
                    class="flex items-center gap-2 text-sm text-white/80 flex-shrink-0"
                  >
                    <span class="text-yellow-300">★</span>
                    <span>{c.rating}</span>
                  </div>
                </div>

                <!-- Ligne 2 : boutons -->
                <div class="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    class="w-full py-2.5 rounded-lg border border-white/15 text-white/80 hover:bg-white/5 transition"
                    on:click={() => openDetail(c)}
                  >
                    Détail
                  </button>

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

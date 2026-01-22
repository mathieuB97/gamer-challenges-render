<script>
  import { onMount } from "svelte";

  // Reçu depuis le router (params.set({ challengeId: ctx.params.id }))
  export let challengeId = null;

  let loading = true;
  let errorMsg = "";

  
  let challenge = null;
  let bestChallenges = [];

  // Bloc "activité" (mock en attendant API)
  let activity = {
    challengesCount: 248,
    participants: 1234,
    views: "45.2K"
  };

  // Vote utilisateur (1..5)
  let voteValue = 0;

  // Fallback mock si l'API ne répond pas
  const mockChallenge = {
    id: 1,
    title: "Victoire sans bouclier",
    author: "ProGamer42",
    level: "Expert",
    difficulty: "Difficile",
    rating: 4.5,
    heroImage:
      "https://images.unsplash.com/photo-1611138290962-2c550ffd4002?w=1600&auto=format&fit=crop&q=80",
    description:
      "Remportez une partie complète sans jamais équiper de bouclier corporel. Vous devez compter uniquement sur vos compétences de tir et votre positionnement stratégique.",
    rules: [
      "Aucun bouclier ne doit être équipé durant toute la partie",
      "Vous devez faire partie de l'équipe gagnante",
      "Les objets de soin sont autorisés",
      "Minimum 5 éliminations requises"
    ],
    objectives: [
      { label: "Éliminations minimum", value: "5 kills" },
      { label: "Temps maximum", value: "25 minutes" },
      { label: "Position finale", value: "#1" },
      { label: "Dégâts minimum", value: "1000" }
    ]
  };

  // Mock bloc central (leaderboard)
  const mockBestChallenges = [
    { id: 101, user: "ShadowGamer", level: "7K", points: "1523D", time: "18:32", rating: 4.8, votes: "156v" },
    { id: 102, user: "ProElite99", level: "6K", points: "1445D", time: "19:45", rating: 4.6, votes: "142v" },
    { id: 103, user: "NightHawk", level: "5K", points: "1389D", time: "20:12", rating: 4.5, votes: "128v" },
    { id: 104, user: "ThunderStrike", level: "5K", points: "1256D", time: "21:03", rating: 4.3, votes: "98v" },
    { id: 105, user: "MysticWarrior", level: "6K", points: "1198D", time: "22:18", rating: 4.2, votes: "87v" }
  ];

  // Load data (API -> sinon mock)
  onMount(async () => {
    try {
      if (!challengeId) {
        challenge = mockChallenge;
        bestChallenges = mockBestChallenges;
        errorMsg = "challengeId absent : affichage mock.";
        return;
      }

      // Adapter selon votre infra (docker vs local)
      const response = await fetch(`http://localhost:3000/api/challenges/${challengeId}`);
      if (!response.ok) throw new Error("API route not found");

      challenge = await response.json();
      bestChallenges = mockBestChallenges; // à remplacer quand API leaderboard dispo
    } catch (error) {
      console.error("Erreur API challenge detail:", error);
      challenge = { ...mockChallenge, id: Number(challengeId ?? 1) };
      bestChallenges = mockBestChallenges;
      errorMsg = "API indisponible : affichage mock.";
    } finally {
      loading = false;
    }
  });

  // Actions
  function goBack() {
    window.location.href = "/liste-challenges";
  }

  function openRowDetail(row) {
    alert(`Détail: ${row.user}`);
  }

  function voteForRow(row) {
    alert(`Vote pour: ${row.user}`);
  }

  function submitVote() {
    if (!voteValue) return alert("Choisis une note (1 à 5) avant de voter.");
    alert(`Merci ! Vote envoyé: ${voteValue}/5`);
  }

   /* Icônes */
  import IconChallenge from "../components/icon-challenge.svelte";
  import IconParticipant from "../components/icon-participant.svelte";
  import IconOeil from "../components/icon-oeil.svelte";

</script>

<main class="min-h-[calc(100vh-200px)]">
  <!-- HERO -->
  <section class="relative w-full">
    {#if loading}
      <div class="min-h-[360px] flex items-center justify-center text-white/70">
        Chargement du challenge...
      </div>
    {:else}
      <div class="relative h-[420px] w-full overflow-hidden">
        <img
          src={challenge?.heroImage}
          alt={challenge?.title}
          class="h-full w-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/95 via-[#0a0e1a]/55 to-[#0a0e1a]/10"></div>
      </div>

      <div class="absolute inset-0">
        <div class="mx-auto w-full max-w-6xl px-4 h-full flex flex-col justify-end pb-10">
          <button
            type="button"
            on:click={goBack}
            class="mb-4 inline-flex items-center gap-2 text-white/80 hover:text-white transition"
          >
            <span class="text-lg">←</span>
            <span class="text-sm">Retour aux challenges</span>
          </button>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00d9ff] drop-shadow">
            {challenge?.title}
          </h1>

          <div class="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span>Par <span class="text-white">{challenge?.author}</span></span>
            <span class="inline-flex items-center gap-2"><span class="text-yellow-300">🏆</span>{challenge?.level}</span>
            <span class="inline-flex items-center gap-2"><span class="text-orange-300">⚡</span>{challenge?.difficulty}</span>
            <span class="inline-flex items-center gap-2"><span class="text-yellow-300">★</span>{challenge?.rating}</span>
          </div>

          {#if errorMsg}
            <p class="mt-3 text-xs text-amber-300">{errorMsg}</p>
          {/if}
        </div>
      </div>
    {/if}
  </section>

  <!-- CONTENT -->
  <section class="mx-auto w-full max-w-6xl px-4 py-8">
    <div class="grid gap-4 lg:grid-cols-[1.15fr_0.95fr_0.75fr]">
      <!-- LEFT -->
      <div class="space-y-4">
        <article class="bg-[#141824] border border-white/10 rounded-2xl p-6">
          <h2 class="text-xl font-bold">
            <span class="text-[#00d9ff]">Détails</span>
            <span class="text-white"> du challenge</span>
          </h2>

          <p class="mt-4 text-sm leading-relaxed text-white/80">
            {challenge?.description}
          </p>

          <div class="mt-6">
            <h3 class="text-lg font-semibold text-pink-300">Règles</h3>
            <ul class="mt-3 space-y-2 text-sm text-white/80">
              {#each challenge?.rules ?? [] as rule}
                <li class="flex items-start gap-3">
                  <span class="mt-0.5 text-[#00d9ff]">✔</span>
                  <span>{rule}</span>
                </li>
              {/each}
            </ul>
          </div>
        </article>

        <article class="bg-[#141824] border border-white/10 rounded-2xl p-6">
          <h2 class="text-xl font-bold">
            <span class="text-purple-300">Objectifs</span>
            <span class="text-white"> à atteindre</span>
          </h2>

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            {#each challenge?.objectives ?? [] as obj}
              <div class="bg-[#0a0e1a]/40 border border-white/10 rounded-xl p-4">
                <p class="text-xs text-white/60">{obj.label}</p>
                <p class="mt-2 text-[#00d9ff] font-semibold">{obj.value}</p>
              </div>
            {/each}
          </div>

          <button
            type="button"
            class="mt-5 w-full py-3 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff]
                   text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Participer au challenge
          </button>
        </article>
      </div>

      <!-- MIDDLE -->
      <article class="bg-[#141824] border border-white/10 rounded-2xl p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">
            <span class="text-yellow-300">Meilleurs</span>
            <span class="text-white"> challenges</span>
          </h2>
          <span class="text-xs text-white/60">{bestChallenges?.length ?? 0} entrées</span>
        </div>

        <div class="mt-5 max-h-[520px] overflow-auto pr-2 space-y-3 custom-scroll">
          {#each bestChallenges as row (row.id)}
            <div class="bg-[#0a0e1a]/40 border border-white/10 rounded-2xl p-4">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div
                    class="h-10 w-10 rounded-full bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff]
                           flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  >
                    {row.user.slice(0, 2).toUpperCase()}
                  </div>

                  <div class="min-w-0">
                    <p class="text-white font-semibold truncate">{row.user}</p>
                    <p class="text-xs text-white/60">{row.level} • {row.points}</p>
                    <div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/70">
                      <span>🕒 {row.time}</span>
                      <span class="text-yellow-300">★ {row.rating}</span>
                      <span>{row.votes}</span>
                    </div>
                  </div>
                </div>

                <div class="h-8 w-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs text-white/80">
                  #{String(bestChallenges.indexOf(row) + 1)}
                </div>
              </div>

              <div class="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  class="px-3 py-2 rounded-lg border border-white/15 text-white/80 hover:bg-white/5 transition text-xs"
                  on:click={() => openRowDetail(row)}
                >
                  ▶ Détail
                </button>
                <button
                  type="button"
                  class="px-3 py-2 rounded-lg bg-pink-500/90 hover:bg-pink-500 transition text-white text-xs font-semibold"
                  on:click={() => voteForRow(row)}
                >
                  ❤ Vote
                </button>
              </div>
            </div>
          {/each}
        </div>
      </article>

      <!-- RIGHT -->
      <div class="space-y-4">
        <article class="bg-[#141824] border border-white/10 rounded-2xl p-6">
          <h2 class="text-xl font-bold">
            <span class="text-pink-400">Activité</span>
            <span class="text-white"> du challenge</span>
          </h2>

          <div class="mt-5 space-y-3">
            <div class="bg-[#0a0e1a]/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400
            flex items-center justify-center">
  <IconChallenge class="w-5 h-5 text-white" />
</div>
                <div>
                  <p class="text-xs text-white/60">Challenges</p>
                  <p class="text-[#00d9ff] font-bold">{activity.challengesCount}</p>
                </div>
              </div>
            </div>

            <div class="bg-[#0a0e1a]/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500
            flex items-center justify-center">
  <IconParticipant class="w-5 h-5 text-white" />
</div>
                <div>
                  <p class="text-xs text-white/60">Participants</p>
                  <p class="text-pink-300 font-bold">{activity.participants}</p>
                </div>
              </div>
            </div>

            <div class="bg-[#0a0e1a]/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500
            flex items-center justify-center">
  <IconOeil class="w-5 h-5 text-white" />
</div> 
                <div>
                  <p class="text-xs text-white/60">Vues</p>
                  <p class="text-orange-200 font-bold">{activity.views}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="bg-[#141824] border border-white/10 rounded-2xl p-6">
          <h2 class="text-xl font-bold text-yellow-200">Votez pour ce challenge</h2>
          <p class="mt-2 text-sm text-white/70">Donnez votre avis sur ce challenge</p>

          <div class="mt-4 flex items-center justify-between gap-2">
            {#each [1,2,3,4,5] as n}
              <button
                type="button"
                class="h-10 w-10 rounded-full border border-white/15 text-white/80 hover:bg-white/5 transition
                       {voteValue === n ? 'bg-white/10 border-white/30 text-white' : ''}"
                on:click={() => (voteValue = n)}
              >
                {n}
              </button>
            {/each}
          </div>

          <button
            type="button"
            class="mt-5 w-full py-3 rounded-lg bg-white/10 border border-white/10 text-white/90
                   hover:bg-white/15 transition font-semibold"
            on:click={submitVote}
          >
            Voter
          </button>
        </article>
      </div>
    </div>
  </section>
</main>

<style>
  /* Scrollbar custom */
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
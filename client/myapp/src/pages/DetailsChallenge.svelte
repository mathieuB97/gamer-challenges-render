<script>
  import { onMount } from "svelte";
  import { getCurrentUser } from "../lib/services/auth.service.js";
  import { userStore } from "../lib/stores/user.store.js";
  import IconLike from "../components/icon-like.svelte";
  import IconPlay from "../components/icon-play.svelte";
  import { mockChallenge, mockBestChallenges } from "../mock/challenge.mock.js";
  import { mockChallenges } from "../mock/challenges.mock.js";
  import {
    getChallengeDetail,
    postOneVoteForOneChallenge,
  } from "../lib/services/challenge.service.js";
  import {
    postOneVoteForOneContribution,
    getVotesForCurrentUserContributions,
  } from "../lib/services/contribution.service.js";
  /* Icônes */
  import { Confetti } from "svelte-confetti";
  import { tick } from "svelte";
  import IconChallenge from "../components/icon-challenge.svelte";
  import IconParticipant from "../components/icon-participant.svelte";
  import IconOeil from "../components/icon-oeil.svelte";

  // Affichage confettis à la demande
  let displayConfetti = false;
  function triggerConfetti() {
    displayConfetti = false;
    tick().then(() => {
      displayConfetti = true;
      setTimeout(() => {
        displayConfetti = false;
      }, 2000);
    });
  }

  let currentUser = null;
  let userLoading = true;
  $: $userStore, (currentUser = $userStore);

  // --- Paramètres d'URL ---
  let challengeId = null;
  let gameId = null;
  function extractParams() {
    // Query param
    const urlParams = new URLSearchParams(window.location.search);
    gameId = urlParams.get("gameId");
    // Path param (ex: /challenge/123)
    const pathParts = window.location.pathname.split("/");
    // Cherche un nombre dans le path (id du challenge)
    challengeId = pathParts.find((part) => /^\d+$/.test(part));
  }
  extractParams();

  let loading = true;
  let errorMsg = "";

  let challenge = null;
  let participations = [];

  // Message d'erreur spécifique au vote
  let voteErrorMsg = "";
  // Pour désactiver le bouton après vote
  let hasVoted = false;
  // Pour désactiver le bouton après vote (participation)
  let hasVotedParticipation = false;

  // Liste des IDs de contributions déjà votées par l'utilisateur
  let votedContributionIds = [];

  // Bloc "activité" (mock en attendant API)
  let activity = {
    challengesCount: 248,
    participants: 1234,
    views: "45.2K",
  };

  // Vote utilisateur (1..5)
  let voteValue = 0;
  0;

  // Load data (API -> sinon mock)
  onMount(async () => {
    // Vérifie l'utilisateur connecté et met à jour le store
    userLoading = true;
    await getCurrentUser();
    userLoading = false;

    try {
      if (!challengeId) {
        challenge = mockChallenge;
        participations = mockBestChallenges;
        errorMsg = "challengeId absent : affichage mock.";
        return;
      }

      // Utilise le service getChallengeDetail
      challenge = await getChallengeDetail(challengeId);
      participations = challenge.contributions; // à remplacer quand API leaderboard dispo
      console.log(
        "Détail participation reçu :",
        participations,
        "challenge",
        challenge,
      );

      // Récupère les contributions déjà votées par l'utilisateur
      const votedContributions = await getVotesForCurrentUserContributions();
      votedContributionIds = votedContributions.map((c) => c.id);
    } catch (error) {
      console.error("Erreur API challenge detail:", error);
      challenge = { ...mockChallenge, id: Number(challengeId ?? 1) };
      participations = mockBestChallenges;
      errorMsg = "API indisponible : affichage mock.";
    } finally {
      loading = false;
    }
  });

  // Pour voter sur le challenge principal
  async function voteForAChallenge(challengeId) {
    voteErrorMsg = "";
    if (!challengeId) {
      voteErrorMsg = "Impossible de voter : challenge introuvable";
      return;
    }
    try {
      const result = await postOneVoteForOneChallenge(challengeId);
      hasVoted = true;
      triggerConfetti();
      console.info(
        "Vote enregistré avec succès pour le challenge",
        challengeId,
      );
      return result;
    } catch (error) {
      // Si code 409, afficher uniquement le message du backend
      if (error && error.data && error.data.statusCode === 409) {
        voteErrorMsg = error.data.error;
        hasVoted = true;
      } else {
        voteErrorMsg = "Erreur lors de l'envoi du vote. Veuillez réessayer.";
      }
      console.error("Erreur lors de l'envoi du vote:", error, error.data);
    }
  }

  // Fonctions vides pour les boutons Détail et Vote sur les participations (meilleures participations)
  function openParticipationDetail(row) {}

  async function voteForParticipation(participationId) {
    voteErrorMsg = "";
    if (!participationId) {
      voteErrorMsg = "Impossible de voter : participation introuvable";
      return;
    }
    try {
      const result = await postOneVoteForOneContribution(participationId);
      hasVotedParticipation = true;
      // Met à jour l'UI immédiatement : ajoute l'id à votedContributionIds
      if (!votedContributionIds.includes(participationId)) {
        votedContributionIds = [...votedContributionIds, participationId];
      }
      triggerConfetti();
      console.info(
        "Vote enregistré avec succès pour la contribution",
        participationId,
      );
      return result;
    } catch (error) {
      // Si code 409, afficher uniquement le message du backend
      if (error && error.data && error.data.statusCode === 409) {
        voteErrorMsg = error.data.error;
        hasVoted = true;
      } else {
        voteErrorMsg = "Erreur lors de l'envoi du vote. Veuillez réessayer.";
      }
      console.error("Erreur lors de l'envoi du vote:", error, error.data);
    }
  }
  function submitVote() {
    if (!voteValue) return alert("Choisis une note (1 à 5) avant de voter.");
    alert(`Merci ! Vote envoyé: ${voteValue}/5`);
  }
</script>

<main class="min-h-[calc(100vh-200px)]">
  <!-- HERO -->
  <section class="relative w-full">
    {JSON.stringify(challenge)}
    {#if loading}
      <div class="min-h-[360px] flex items-center justify-center text-white/70">
        Chargement du challenge...
      </div>
    {:else}
      <div class="relative h-[420px] w-full overflow-hidden">
        <img
          src={challenge?.game.image}
          alt={challenge?.name}
          class="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-[#0a0e1a]/95 via-[#0a0e1a]/55 to-[#0a0e1a]/10"
        ></div>
      </div>

      <div class="absolute inset-0">
        <div class="flex items-end h-full w-full mx-auto max-w-6xl px-4 pb-10">
          <div class="col-left">
            <a
              href={gameId ? `/jeux/${gameId}/challenges` : "/liste-challenges"}
              class="mb-4 inline-flex items-center gap-2 text-white/80 hover:text-white transition"
            >
              <span class="text-lg">←</span>
              <span class="text-sm">Retour aux challenges</span>
            </a>

            <h1
              class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00d9ff] drop-shadow"
            >
              {challenge?.name}
            </h1>

            <div
              class="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80"
            >
              <span
                >Par <span class="text-white">{challenge?.creator?.pseudo}</span
                ></span
              >
              <span class="inline-flex items-center gap-2"
                ><span class="text-yellow-300">🏆</span>{challenge?.level}</span
              >
              <span class="inline-flex items-center gap-2"
                ><span class="text-orange-300">⚡</span
                >{challenge?.time_limit_minutes} minutes</span
              >
              <span class="inline-flex items-center gap-2"
                ><span class="text-yellow-300">★</span>{challenge?.rating}</span
              >
            </div>

            {#if errorMsg}
              <p class="mt-3 text-xs text-amber-300">{errorMsg}</p>
            {/if}
          </div>

          <div class="col-right w-[376px] ml-auto">
            {#if voteErrorMsg}
              <p class="mt-2 text-xl font-bold text-amber-300">
                {voteErrorMsg}
              </p>
            {/if}
            {#if displayConfetti}
              <Confetti amount={200} rounded={true} />
            {/if}
          </div>
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

          <p class="mt-4 leading-relaxed text-white/80">
            {challenge?.description}
          </p>

          <div class="mt-6">
            <h3 class="text-lg font-semibold text-pink-300">Règles</h3>
            <p class="mt-3 space-y-2 text-white/80">
              {challenge?.rules}
            </p>
          </div>
        </article>

        <article class="bg-[#141824] border border-white/10 rounded-2xl p-6">
          <h2 class="text-xl font-bold">
            <span class="text-purple-300">Objectifs</span>
            <span class="text-white"> à atteindre</span>
          </h2>

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            {#each challenge?.objectives ?? [] as obj}
              <div
                class="bg-[#0a0e1a]/40 border border-white/10 rounded-xl p-4"
              >
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
        <div class="flex items-center justify-between text-white">
          <h2 class="text-xl font-bold">
            <span class="text-yellow-300">Meilleurs</span>
            participation
          </h2>
          <span class="text-xs text-white/60"
            >{participations?.length ?? 0} entrées</span
          >
        </div>

        <div
          class="mt-5 max-h-[520px] overflow-auto pr-2 space-y-3 custom-scroll"
        >
          {#each participations as participation (participation.id)}
            <div class="bg-[#0a0e1a]/40 border border-white/10 rounded-2xl p-4">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div
                    class="h-10 w-10 rounded-full bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff]
                           flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  >
                    {participation.creator.pseudo.slice(0, 2).toUpperCase()}
                  </div>

                  <div class="min-w-0">
                    <p class="text-white font-semibold truncate">
                      {participation.challenge.name}
                    </p>
                    <p>
                      {participation.creator.pseudo}
                    </p>

                    <!-- <p class="text-xs text-white/60">
                      {row.level} • {row.points}
                    </p> -->
                    <div
                      class="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/70"
                    >
                      <span>🕒 {participation.duration} minutes </span>
                      <!-- <span class="text-yellow-300">★ {participation.rating}</span>
                      <span>{participation.votes}</span> -->
                    </div>
                  </div>
                </div>

                <!-- <div
                  class="h-8 w-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs text-white/80"
                >
                  #{String(participations.indexOf(row) + 1)}
                </div> -->
              </div>

              <div class="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  class="flex flex-row items-end gap-1 px-3 py-2 rounded-lg border border-white/15 text-white/80 hover:bg-white/5 transition text-xs cursor-pointer"
                  on:click={() => openParticipationDetail(participation)}
                >
                  <IconPlay />
                  <span class="leading-3"> Détail </span>
                </button>
                <button
                  type="button"
                  class="flex flex-row items-end gap-1 px-3 py-2 rounded-lg bg-pink-500/90 hover:bg-pink-500 transition text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
                  on:click={() =>
                    voteForParticipation(Number(participation.id))}
                  disabled={votedContributionIds.includes(participation.id)}
                >
                  <IconLike size={16} class="inline-block color-white" />
                  <span class="leading-3"> Vote </span>
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
            <div
              class="bg-[#0a0e1a]/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <div
                  class="h-10 w-10 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400
            flex items-center justify-center"
                >
                  <IconChallenge class="w-5 h-5 text-white" />
                </div>
                <div>
                  <p class="text-xs text-white/60">Challenges</p>
                  <p class="text-[#00d9ff] font-bold">
                    {activity.challengesCount}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-[#0a0e1a]/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <div
                  class="h-10 w-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500
            flex items-center justify-center"
                >
                  <IconParticipant class="w-5 h-5 text-white" />
                </div>
                <div>
                  <p class="text-xs text-white/60">Participants</p>
                  <p class="text-pink-300 font-bold">{activity.participants}</p>
                </div>
              </div>
            </div>

            <div
              class="bg-[#0a0e1a]/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <div
                  class="h-10 w-10 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500
            flex items-center justify-center"
                >
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
          <h2 class="text-xl font-bold text-yellow-200">
            Votez pour ce challenge
          </h2>
          <p class="mt-2 text-sm text-white/70">
            Donnez votre avis sur ce challenge
          </p>

          <div class="mt-4 flex items-center justify-between gap-2">
            {#each [1, 2, 3, 4, 5] as n}
              <button
                type="button"
                class="h-10 w-10 rounded-full border border-white/15 text-white/80 hover:bg-white/5 transition
                       {voteValue === n
                  ? 'bg-white/10 border-white/30 text-white'
                  : ''}"
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

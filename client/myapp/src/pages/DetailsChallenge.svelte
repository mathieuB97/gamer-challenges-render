<script>
  import { onMount } from "svelte";
  import { tick } from "svelte";
  import { Confetti } from "svelte-confetti";

  import { getCurrentUser } from "../lib/services/auth.service.js";
  import { params } from "../router.js";

  import IconLike from "../components/icon-like.svelte";
  import IconPlay from "../components/icon-play.svelte";
  import IconChallenge from "../components/icon-challenge.svelte";
  import IconParticipant from "../components/icon-participant.svelte";
  import IconOeil from "../components/icon-oeil.svelte";
  import IconArrowLeft from "../components/icon-arrow-left.svelte";

  import ParticipationModal from "../components/ParticipationModal.svelte";
  import ContributionDetailModal from "../components/ContributionDetailModal.svelte";

  import { mockChallenge, mockBestChallenges } from "../mock/challenge.mock.js";

  import {
    getChallengeDetail,
    postOneVoteForOneChallenge,
  } from "../lib/services/challenge.service.js";

  import {
    postOneVoteForOneContribution,
    getVotesForCurrentUserContributions,
  } from "../lib/services/contribution.service.js";

  // ---------------------------------------------
  // Confettis (bouton vote du challenge)
  // ---------------------------------------------
  let displayConfetti = $state(false);

  function triggerConfetti() {
    displayConfetti = false;
    tick().then(() => {
      displayConfetti = true;
      setTimeout(() => {
        displayConfetti = false;
      }, 2000);
    });
  }

  // ---------------------------------------------
  // Confettis (bouton vote rose par participation)
  // ---------------------------------------------
  let confettiForParticipation = $state(null);

  function triggerConfettiForParticipation(id) {
    confettiForParticipation = id;
    setTimeout(() => {
      confettiForParticipation = null;
    }, 1800);
  }

  // ---------------------------------------------
  // User
  // ---------------------------------------------
  let currentUser = $state(null);
  let userLoading = $state(true);

  // ---------------------------------------------
  // Params URL (via store params du router)
  // ---------------------------------------------

  // ---------------------------------------------
  // Data
  // ---------------------------------------------
  let loading = $state(true);
  let errorMsg = $state("");

  let challenge = $state(null);
  let participations = $state([]);

  let voteErrorMsg = $state("");
  let hasVoted = $state(false);

  // ids des contributions déjà votées
  let votedContributionIds = $state([]);

  // Bloc "activité" (mock)
  let activity = {
    challengesCount: 248,
    participants: 1234,
    views: "45.2K",
  };

  // Vote utilisateur (hard, medium, easy)
  let levelOptions = ["hard", "medium", "easy"];
  let selectedLevel = $state(null);

  onMount(async () => {
    userLoading = true;
    currentUser = await getCurrentUser();
    userLoading = false;

    try {
      if (!$params.challengeId) {
        challenge = mockChallenge;
        participations = mockBestChallenges;
        errorMsg = "challengeId absent : affichage mock.";
        return;
      }

      challenge = await getChallengeDetail($params.challengeId);
      participations = challenge.contributions;

      if (currentUser) {
        const votedContributions = await getVotesForCurrentUserContributions();
        votedContributionIds = votedContributions.map((c) => c.id);
      }
    } catch (error) {
      console.error("Erreur API challenge detail:", error);
      challenge = { ...mockChallenge, id: Number($params.challengeId ?? 1) };
      participations = mockBestChallenges;
      errorMsg = "API indisponible : affichage mock.";
    } finally {
      loading = false;
    }
  });

  // ---------------------------------------------
  // Modals
  // ---------------------------------------------
  let isContributionDetailModalOpen = $state(false);
  let selectedContribution = $state(null);
  let isParticipationModalOpen = $state(false);

  function openParticipationDetail(contribution) {
    selectedContribution = contribution;
    isContributionDetailModalOpen = true;
  }

  function openParticipationModal() {
    isParticipationModalOpen = true;
    document.body.style.overflow = "hidden";
  }

  // ---------------------------------------------
  // Vote challenge principal
  // ---------------------------------------------
  async function voteForAChallenge(challengeId) {
    voteErrorMsg = "";

    if (!currentUser) {
      voteErrorMsg = "Vous devez être connecté pour voter.";
      return;
    }
    if (!challengeId) {
      voteErrorMsg = "Impossible de voter : challenge introuvable";
      return;
    }

    try {
      const result = await postOneVoteForOneChallenge(challengeId);

      hasVoted = true;
      triggerConfetti(); // ✅ confettis bouton principal

      return result;
    } catch (error) {
      if (error?.data?.statusCode === 409) {
        voteErrorMsg = error.data.error;
        hasVoted = true;
      } else {
        voteErrorMsg = "Erreur lors de l'envoi du vote. Veuillez réessayer.";
      }
      console.error("Erreur lors de l'envoi du vote:", error, error?.data);
    }
  }

  // ---------------------------------------------
  // Vote participation (bouton rose)
  // ---------------------------------------------
  async function voteForParticipation(participationId) {
    voteErrorMsg = "";

    if (!currentUser) {
      voteErrorMsg = "Vous devez être connecté pour voter.";
      return;
    }
    if (!participationId) {
      voteErrorMsg = "Impossible de voter : participation introuvable";
      return;
    }

    try {
      const result = await postOneVoteForOneContribution(participationId);

      // update UI (désactive le bouton)
      if (!votedContributionIds.includes(participationId)) {
        votedContributionIds = [...votedContributionIds, participationId];
      }

      // ✅ confettis sur LE bouton rose cliqué
      triggerConfettiForParticipation(participationId);

      return result;
    } catch (error) {
      if (error?.data?.statusCode === 409) {
        voteErrorMsg = error.data.error;
      } else {
        voteErrorMsg = "Erreur lors de l'envoi du vote. Veuillez réessayer.";
      }
      console.error("Erreur vote participation:", error, error?.data);
    }
  }

  function submitLevel() {
    alert(`Niveau sélectionné : ${selectedLevel}`);
  }
</script>

<main class="h-full">
  <!-- HERO -->
  <section class="relative w-full">
    {#if loading}
      <div class="min-h-90 flex items-center justify-center text-white/70">
        Chargement du challenge...
      </div>
    {/if}

    {#if !loading}
      <div class="relative h-105 w-full overflow-hidden">
        <img
          src={challenge?.game?.image || mockChallenge?.game?.image || ""}
          alt={challenge?.name}
          class="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-[#0a0e1a]/95 via-[#0a0e1a]/55 to-[#0a0e1a]/10"
        ></div>
      </div>

      <div class="absolute inset-0">
        <div class="flex items-end h-full w-full mx-auto px-6 pb-10">
          <div class="col-left">
            <a
              href={$params.gameId
                ? `/jeux/${$params.gameId}/challenges`
                : "/liste-challenges"}
              class="mb-4 inline-flex items-center gap-2 text-xl text-white/80 hover:text-white transition"
            >
              <span><IconArrowLeft /></span>
              <span>Retour aux challenges</span>
            </a>

            <h1
              class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00d9ff] drop-shadow"
            >
              {challenge?.name}
            </h1>

            <div
              class="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80"
            >
              <span>
                Par <span class="text-white">{challenge?.creator?.pseudo}</span>
              </span>
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

            <button
              type="button"
              onclick={() => voteForAChallenge(challenge?.id)}
              class="mt-3 w-full py-3 px-6 rounded-lg bg-linear-to-r from-[#7b2cbf] to-[#00d9ff]
                     text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
              disabled={userLoading || !currentUser || hasVoted}
            >
              {userLoading
                ? "Vérification..."
                : !currentUser
                  ? "Connectez-vous pour voter"
                  : "Voter pour ce challenge"}
            </button>

            {#if displayConfetti}
              <Confetti amount={180} noGravity xSpread={0.1} duration={1600} />
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </section>

  <!-- CONTENT -->
  <section class="mx-auto w-full">
    <div class="grid gap-4 lg:grid-cols-[1.15fr_0.95fr_0.75fr]">
      <!-- LEFT -->
      <div class="space-y-4">
        <article class="bg-[#141824] border border-white/10 rounded-2xl p-6">
          <h2 class="text-2xl font-bold">
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
          <h2 class="text-2xl font-bold">
            <span class="text-purple-300">Challenge</span><br />
            <span class="text-white"
              >{challenge?.name || "nom du challenge"}</span
            >
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
            class="w-full py-3 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff] text-white font-semibold hover:opacity-90 transition-opacity"
            class:opacity-50={!currentUser}
            class:cursor-not-allowed={!currentUser}
            onclick={openParticipationModal}
            disabled={!currentUser}
          >
            Déposer une participation
          </button>
        </article>
      </div>

      <!-- MIDDLE -->
      <article class="bg-[#141824] border border-white/10 rounded-2xl p-6">
        <div class="flex items-center justify-between text-white">
          <h2 class="text-2xl font-bold">
            <span class="text-yellow-300">Meilleurs</span> participation
          </h2>
          <span class="text-xs text-white/60">
            {participations?.length ?? 0} entrées
          </span>
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
                    <p>{participation.creator.pseudo}</p>

                    <div
                      class="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/70"
                    >
                      <span>🕒 {participation.duration} minutes </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  class="flex flex-row items-end gap-1 px-3 py-2 rounded-lg border border-white/15 text-white/80 hover:bg-white/5 transition text-xs cursor-pointer"
                  onclick={() => openParticipationDetail(participation)}
                  disabled={!currentUser}
                >
                  <IconPlay />
                  <span class="leading-3"> Détail </span>
                </button>

                <!-- ✅ BOUTON ROSE + CONFETTIS -->
                <button
                  type="button"
                  class="relative flex flex-row items-end gap-1 px-3 py-2 rounded-lg
                         bg-pink-500/90 hover:bg-pink-500 transition text-white
                         text-xs font-semibold cursor-pointer disabled:opacity-50"
                  onclick={() => voteForParticipation(Number(participation.id))}
                  disabled={!currentUser ||
                    votedContributionIds.includes(participation.id)}
                >
                  <IconLike size={16} />
                  <span class="leading-3"> Vote </span>

                  {#if confettiForParticipation === participation.id}
                    <div class="absolute inset-0 pointer-events-none">
                      <Confetti
                        amount={180}
                        noGravity
                        xSpread={0.1}
                        duration={1600}
                      />
                    </div>
                  {/if}
                </button>
              </div>
            </div>
          {/each}
        </div>
      </article>

      <!-- RIGHT -->
      <div class="space-y-4">
        <article class="bg-[#141824] border border-white/10 rounded-2xl p-6">
          <h2 class="text-2xl font-bold">
            <span class="text-pink-400">Activité</span>
            <span class="text-white"> du challenge</span>
          </h2>

          <div class="mt-5 space-y-3">
            <div
              class="bg-[#0a0e1a]/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <div
                  class="h-10 w-10 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center"
                >
                  <IconChallenge />
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
                  class="h-10 w-10 rounded-xl bg-linear-to-r from-pink-500 to-purple-500 flex items-center justify-center"
                >
                  <IconParticipant />
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
                  class="h-10 w-10 rounded-xl bg-linear-to-r from-orange-400 to-pink-500 flex items-center justify-center"
                >
                  <IconOeil />
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
          <h2 class="text-2xl font-bold text-yellow-200">
            Estimez la difficulté du challenge
          </h2>
          <p class="mt-2 text-white/70">
            Partagez votre avis votre ressenti sur la difficulté de ce challenge
            afin d'aider la communauté.
          </p>

          <div class="mt-4 flex items-center justify-between gap-2">
            {#each levelOptions as level}
              <button
                type="button"
                class="h-10 w-24 rounded-full border border-white/15 text-white/80 hover:bg-white/5 transition {selectedLevel ===
                level
                  ? 'bg-white/10 border-white/30 text-white'
                  : ''}"
                onclick={() => (selectedLevel = level)}
                disabled={!currentUser}
              >
                {level}
              </button>
            {/each}
          </div>

          <button
            type="button"
            class="mt-5 w-full py-3 rounded-lg bg-white/10 border border-white/10 text-white/90 hover:bg-white/15 transition font-semibold"
            class:opacity-50={!currentUser}
            class:cursor-not-allowed={!currentUser}
            onclick={submitLevel}
            disabled={!currentUser}
          >
            {#if !currentUser}
              Vous n'êtes pas connecté
            {:else}
              Partager mon évaluation
            {/if}
          </button>
        </article>
      </div>
    </div>
  </section>
</main>

<!-- MODAL CONTRIBUTION DETAIL -->
{#if isContributionDetailModalOpen}
  <ContributionDetailModal
    bind:isOpen={isContributionDetailModalOpen}
    contribution={selectedContribution}
  />
{/if}

<!-- MODAL PARTICIPATION -->
{#if isParticipationModalOpen}
  <ParticipationModal bind:isOpen={isParticipationModalOpen} {challenge} />
{/if}

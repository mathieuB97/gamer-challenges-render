<script>
  import AdviceBloc from "../components/AdviceBloc.svelte";
  import ButtonSubmit from "../components/ButtonSubmit.svelte";
  import Hero from "../components/Hero.svelte";
  import IconArrowLeft from "../components/icon-arrow-left.svelte";
  import LabelInput from "../components/LabelInput.svelte";
  import { routeParams } from "../router";
  import { createChallenge } from "../lib/services/challenge.service.js";

  let formData = $state({
    challengeName: "",
    challengeTitle: "",
    pseudo: "",
    challengeObjective: "",
    time_limit_minutes: "",
    challengeSelect: "",
  });

  let loading = $state(false);
  let errorMsg = $state("");
  let successMsg = $state("");

  async function handleOnSubmit(event) {
    event.preventDefault();

    errorMsg = "";
    successMsg = "";
    loading = true;

    try {
      const gameId = parseInt($routeParams.gameId, 10);

      if (!gameId || isNaN(gameId)) {
        throw new Error(`ID de jeu invalide: ${$routeParams.gameId}`);
      }

      const payload = {
        name: formData.challengeName,
        description: formData.challengeObjective,
        rules: "Respecter les règles du jeu",
        level: formData.challengeSelect,
        time_limit_minutes: String(formData.time_limit_minutes),
        game_id: gameId,
      };

      await createChallenge(payload);

      // Afficher une confirmation
      successMsg = "Défi envoyé ✓";

      // Réinitialiser le formulaire après 5s
      setTimeout(() => {
        formData = {
          challengeName: "",
          challengeTitle: "",
          pseudo: "",
          challengeObjective: "",
          time_limit_minutes: "",
          challengeSelect: "",
        };
        successMsg = "";
      }, 5000);
    } catch (error) {
      errorMsg =
        error.message ||
        "Erreur lors de la création du challenge. Veuillez réessayer.";
    } finally {
      loading = false;
    }
  }
</script>

<div class="h-full flex items-start justify-center">
  <div class="mycontainer w-full">
    <div class="goback text-white/70">
      <a
        class="flex gap-2 font-bold hover:text-white mb-6 transition-colors"
        href={`/jeux/${$routeParams.gameId}/challenges`}
      >
        <IconArrowLeft className="w-5 h-5" />
        Retour
      </a>
    </div>

    <Hero
      title={{ default: "Créer un", highlight: "défi" }}
      paragraph="Lancez un nouveau challenge à la communauté"
      className="mb-8"
    />

    <div
      class="w-2xl max-w-full m-auto bg-[#141824] border border-white/10 rounded-2xl p-8"
    >
      {#if errorMsg}
        <div
          class="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-sm"
        >
          {errorMsg}
        </div>
      {/if}

      {#if successMsg}
        <div
          class="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/40 text-green-300 text-sm"
        >
          {successMsg}
        </div>
      {/if}

      <form class="space-y-4" onsubmit={handleOnSubmit}>
        <LabelInput
          id="pseudo"
          name="pseudo"
          label="Votre pseudo"
          type="text"
          bind:value={formData.pseudo}
          placeholder="votre pseudo"
          required={true}
          mandatory={true}
        />

        <LabelInput
          id="name"
          name="name"
          label="Nom du challenge"
          type="text"
          bind:value={formData.challengeName}
          placeholder="nom du challenge"
          required={true}
          mandatory={true}
        />

        <LabelInput
          id="time-limit-minutes"
          name="time-limit-minutes"
          label="Temps limite (en minutes)"
          type="number"
          bind:value={formData.time_limit_minutes}
          placeholder="le temps a effectué (en minutes)"
          required={true}
          mandatory={true}
        />

        <label for="level-select">Choisissez un niveaux de difficulté:</label>

        <select
          name="challenge-select"
          id="challenge-select"
          class="bg-[#0a0e1a] border border-white/20"
          bind:value={formData.challengeSelect}
        >
          <option value="">--Veuillez choisir une option--</option>
          <option value="easy">Easy ❤️</option>
          <option value="medium">Medium ⚔️</option>
          <option value="hard">Hard 💀</option>
        </select>

        <LabelInput
          id="challenge-objective"
          name="challenge-objective"
          label="Objectif du défi"
          type="text-area"
          bind:value={formData.challengeObjective}
          placeholder="objectif du défi"
          required={true}
          mandatory={true}
        />
        <p class="text-white/70 mx-auto block mb-6">
          Expliquez clairement ce que les joueurs doivent accomplir pour réussir
          ce défi
        </p>

        <div class="buttons flex">
          <ButtonSubmit
            variant="secondary"
            text="Annuler"
            className="max-w-73 mx-auto block"
            type="reset"
            disabled={loading}
          />
          <ButtonSubmit
            variant="primary"
            text={loading ? "Envoi en cours..." : "Soumettre le défi"}
            className="max-w-73 mx-auto block"
            disabled={loading}
          />
        </div>
      </form>
    </div>

    <AdviceBloc
      title="Conseils pour créer un bon défi"
      adviceList={[
        "Soyez clair et précis dans la description de l'objectif",
        "Assurez-vous que le défi est réalisable mais stimulant",
        "Indiquez toutes les conditions nécessaires pour valider le défi",
        "Évitez les défis qui nécessitent de tricher ou d'enfreindre les règles du jeu",
      ]}
    />
  </div>
</div>

<style>
</style>

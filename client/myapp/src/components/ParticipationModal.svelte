<script>
  import { createParticipation } from "../lib/services/contribution.service.js";

  // Props reçu depuis la page parent (ChallengeLists.svelte & DetailsChallenge.svelte) 
  export let challenge = null; // L'objet challenge complet -> on récupère .id automatiquement
  export let isOpen = false; // Contrôle l'affiche du pop-up (true = visible)

  // Variables locales du pop-up du formulaire
  let videoUrl = ""; // lien de la vidéo saisi par l'utilisateur
  let duration = ""; // Durée saisie (en minutes ou secondes selon le modèle back)
  let loading = false; // Indique si l'envoi API est en cours → désactive les boutons
  let errorMsg = ""; // Message d'erreur affiché en rouge
  let successMsg = ""; // Message de succès affiché en vert

  // Ferme le pop-up et réinitialise tout
  function closeModal() {
    isOpen = false;
    resetForm();
  }

  // Vide les champs et messages après fermeture ou succès
  function resetForm() {
    videoUrl = "";
    duration = "";
    successMsg = "";
    errorMsg = "";
  }

  // Fonction principale : appelée au submit du formulaire
  async function handleSubmit() {
    errorMsg = "";
    successMsg = "";
  
  // Validation simple avant envoi
    if (!videoUrl || !duration) {
      errorMsg = "URL vidéo et durée sont obligatoires.";
      return;
    }

    if (isNaN(duration) || Number(duration) <= 0) {
      errorMsg = "Durée doit être un nombre positif.";
      return;
    }

    loading = true;

    try {
      // Payload envoyé à l'API – challenge_id récupéré automatiquement depuis la prop challenge
      const payload = {
        challenge_id: challenge?.id, // ID du challenge pris automatiquement (pas saisi manuellement)
        video_url: videoUrl,
        duration: Number(duration),
      };

      // Appel API réel pour créer la participation
      await createParticipation(payload);

      // Succès : affiche message + ferme le pop-up après 1,5 s
      successMsg = "Participation envoyée ✓";
      setTimeout(() => {
        resetForm();
        closeModal();
      }, 1500);
    } catch (error) {
      errorMsg = error.message || "Erreur lors de l'envoi.";
      console.error("Erreur participation:", error);
    } finally {
      loading = false;
    }
  }

  // Ferme le pop-up avec la touche Échap
  function handleKeydown(e) {
    if (e.key === "Escape" && isOpen) closeModal();
  }
</script>

<!-- Écoute la touche Échap sur toute la fenêtre -->
<svelte:window on:keydown={handleKeydown} />

<!-- Le pop-up s'affiche seulement quand isOpen est true -->
{#if isOpen}
  <!-- Fond semi-transparent qui ferme le pop-up au clic extérieur -->
  <div class="fixed inset-0 z-40 bg-black/60" on:click={closeModal}></div>

  <!-- Conteneur centré du pop-up -->
  <div class="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div
      class="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#141824]
                   shadow-xl overflow-hidden"
      on:click|stopPropagation
    >
      <!-- En-tête du pop-up -->
      <div class="flex items-start justify-between gap-4 p-6">
        <div>
          <h2 class="text-2xl font-extrabold text-white">
            Déposer une participation
          </h2>
          <!-- Affiche le nom du challenge pour rappeler sur quel défi on participe -->
          <p class="mt-1 text-sm text-white/70">{challenge?.name}</p>
        </div>

        <button
          type="button"
          class="h-10 w-10 rounded-lg border border-white/15 text-white/80
                           hover:bg-white/5 transition flex items-center justify-center"
          on:click={closeModal}
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>

      <!-- Corps : messages + formulaire -->
      <div class="px-6 pb-6">
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

        <!-- Formulaire qui déclenche handleSubmit au submit -->
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <!-- Champ URL vidéo -->
          <div>
            <label
              for="videoUrl"
              class="block text-sm font-semibold text-white mb-2"
            >
            <!-- ← Texte du label (corrigé pour éviter l'erreur de compilation) -->
            </label>
            <input
              id="videoUrl"
              type="url"
              placeholder="https://example.com/video.mp4"
              bind:value={videoUrl}
              class="w-full px-4 py-2 rounded-lg bg-[#0a0e1a] border border-white/10
                                   text-white placeholder-white/40 focus:border-[#00d9ff]/50 focus:outline-none"
              disabled={loading}
            />
          </div>

          <!-- Champs Durée -->
          <div>
            <label
              for="duration"
              class="block text-sm font-semibold text-white mb-2"
            >
              Durée (minutes) *
            </label>
            <input
              id="duration"
              type="number"
              placeholder="5"
              bind:value={duration}
              min="1"
              class="w-full px-4 py-2 rounded-lg bg-[#0a0e1a] border border-white/10
                                   text-white placeholder-white/40 focus:border-[#00d9ff]/50 focus:outline-none"
              disabled={loading}
            />
          </div>

          <!-- Boutons Annuler / Envoyer -->
          <div class="mt-6 flex gap-3">
            <button
              type="button"
              class="flex-1 py-2.5 rounded-lg border border-white/15 text-white/80
                                   hover:bg-white/5 transition font-medium"
              on:click={closeModal}
              disabled={loading}
            >
              Annuler
            </button>

            <button
              type="submit"
              class="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff]
                                   text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
  input,
  textarea {
    transition: border-color 0.2s;
  }
</style>

<script>
  /**
   * @typedef {Object} Props
   * @property {any} [contribution]
   * @property {boolean} [isOpen]
   */

  /** @type {Props} */
  let { contribution = null, isOpen = $bindable(false) } = $props();

  function closeModal() {
    isOpen = false;
  }

  function handleKeydown(e) {
    if (e.key === "Escape" && isOpen) closeModal();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <!-- Overlay -->
  <div
    class="w-full max-w-md rounded-2xl border border-white/10 bg-[#141824] shadow-xl overflow-hidden"
    role="dialog"
    aria-modal="true"
    tabindex="0"
    onclick={(e) => e.stopPropagation()}
    onkeydown={(e) =>
      (e.key === "Enter" || e.key === " ") && e.stopPropagation()}
  >
    <div class="flex items-start justify-between gap-4 p-6">
      <h2 class="text-2xl font-extrabold text-white">Détail participation</h2>

      <button
        type="button"
        class="h-10 w-10 rounded-lg border border-white/15 text-white/80
                           hover:bg-white/5 transition flex items-center justify-center"
        onclick={closeModal}
        aria-label="Fermer"
      >
        ✕
      </button>
    </div>

    <!-- Body -->
    <div class="px-6 pb-6 space-y-4">
      <!-- URL Vidéo -->
      <a
        href={contribution?.video_url}
        target="_blank"
        rel="noopener noreferrer"
        class="text-[#00d9ff] hover:underline text-sm break-all"
      >
        {contribution?.video_url}
      </a>

      <!-- Durée -->
      <div>
        <p class="text-sm text-white/70 mb-2">Durée</p>
        <p class="text-white/90">{contribution?.duration} minutes</p>
      </div>
    </div>
  </div>
{/if}

<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import IconArrowLeft from "./icon-arrow-left.svelte";
  import IconArrowRight from "./icon-arrow-right.svelte";

  export let items = [];
  export let chunkSizeMobile = 2;
  export let chunkSizeDesktop = 3;
  export let cardComponent; // Composant à utiliser pour chaque item (ex: ChallengeCard)
  export let cardProps = {};
  export let showVotes = undefined; // Optionnel, pour compatibilité
  export let gridColsMobile = 2;
  export let gridColsDesktop = 3;
  export let sectionTitle = "";

  // Index du slide courant
  let currentIndex = 0;
  let chunkSize = chunkSizeMobile;
  const chunked = writable([]);

  function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  function updateChunkSize() {
    chunkSize = window.matchMedia("(min-width: 768px)").matches
      ? chunkSizeDesktop
      : chunkSizeMobile;
    chunked.set(chunkArray(items, chunkSize));
    // Si l'index courant dépasse le max, on le ramène à la fin
    chunked.subscribe((chunks) => {
      if (currentIndex > chunks.length - 1) {
        currentIndex = Math.max(0, chunks.length - 1);
      }
    });
  }

  $: chunked.set(chunkArray(items, chunkSize));

  onMount(() => {
    updateChunkSize();
    window.addEventListener("resize", updateChunkSize);
    return () => window.removeEventListener("resize", updateChunkSize);
  });

  function nextSlide() {
    chunked.subscribe((chunks) => {
      if (currentIndex < chunks.length - 1) {
        currentIndex += 1;
      }
    })();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex -= 1;
    }
  }
</script>

<section>
  {#if sectionTitle}
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl">{sectionTitle}</h2>
      <div class="carousel-navigation flex gap-2">
        {#if currentIndex > 0}
          <button
            on:click={prevSlide}
            class="flex items-center justify-center text-[#00d9ff]"
            title="Précédent"
          >
            <IconArrowLeft />
          </button>
        {/if}
        {#if $chunked.length > 1 && currentIndex < $chunked.length - 1}
          <button
            on:click={nextSlide}
            class="flex items-center justify-center text-[#00d9ff]"
            title="Suivant"
          >
            <IconArrowRight />
          </button>
        {/if}
      </div>
    </div>
  {/if}
  <div class="relative">
    <div class="overflow-hidden">
      <div
        class="flex transition-transform duration-300 ease-in-out"
        style="transform: translateX(-{currentIndex * 100}%);"
      >
        {#each $chunked as chunk}
          <div
            class="w-full shrink-0 grid grid-cols-{gridColsMobile} md:grid-cols-{gridColsDesktop} gap-4"
          >
            {#each chunk as item (item.id)}
              <svelte:component
                this={cardComponent}
                {...item}
                {...cardProps}
                {showVotes}
              />
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* Ajoute ici des styles spécifiques si besoin */
</style>

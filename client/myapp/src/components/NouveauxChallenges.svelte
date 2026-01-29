<script>
  import ChallengeCard from "./ChallengeCard.svelte";
  import IconArrowLeft from "./icon-arrow-left.svelte";
  import IconArrowRight from "./icon-arrow-right.svelte";

  export let challenges = [];
  export let title = "Nouveaux Challenges";

  let currentIndex = 0;

  $: chunkedChallenges = chunkArray(challenges, 3);
  $: maxIndex = chunkedChallenges.length;

  function chunkArray(array, size) {
    if (!array || array.length === 0) return [];
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  function nextSlide() { if (currentIndex < maxIndex - 1) currentIndex += 1; }
  function prevSlide() { if (currentIndex > 0) currentIndex -= 1; }
</script>

<section class="nouveaux-challenges">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-3xl font-bold text-white">{title}</h2>
    {#if maxIndex > 1}
      <div class="flex gap-2">
        <button on:click={prevSlide} class="btn-nav" disabled={currentIndex === 0}>
          <IconArrowLeft />
        </button>
        <button on:click={nextSlide} class="btn-nav" disabled={currentIndex === maxIndex - 1}>
          <IconArrowRight />
        </button>
      </div>
    {/if}
  </div>

  <div class="overflow-hidden rounded-xl">
    <div class="flex transition-transform duration-500 ease-in-out" style="transform: translateX(-{currentIndex * 100}%)">
      {#each chunkedChallenges as chunk, i (i)}
        <div class="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each chunk as challenge (challenge.id)}
            <ChallengeCard {challenge} />
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .btn-nav {
    background: #1e293b;
    border: 1px solid #334155;
    padding: 0.5rem;
    border-radius: 9999px;
    color: #00d9ff;
    cursor: pointer;
  }
  .btn-nav:disabled { opacity: 0.2; cursor: not-allowed; }
  .btn-nav:hover:not(:disabled) { background: #334155; }
</style>
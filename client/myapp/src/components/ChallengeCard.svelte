<script>
  import IconLike from "./icon-like.svelte";
  import IconParticipant from "./icon-participant.svelte";
  
  // En Svelte 5 (runes mode), utiliser $props() pour déstructurer toutes les propriétés
  let {
    id,
    title,
    challengeName,
    image,
    likes,
    participants,
    name,
    votesCount,
    totalParticipants,
    game,
    ...restProps
  } = $props();

  // Extraire les infos du jeu (peut venir de différentes sources)
  const gameName = game?.name ?? restProps["game.name"] ?? title;
  const gameImg = game?.image ?? restProps["game.image"] ?? image ?? "/src/assets/default-game.jpg";

  // Variable locale pour tracker les likes
  let localLikes = $state(0);
  let displayVotes = $derived((votesCount ?? likes ?? 0) + localLikes);

  function increment() {
    localLikes += 1;
  }
</script>

<div class="relative overflow-hidden rounded-xl bg-[#181e2e] shadow-md">
  <div class="relative w-full h-32 bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden">
    {#if gameImg && gameImg !== "/src/assets/default-game.jpg"}
      <img
        {id}
        src={gameImg}
        alt={gameName ?? title}
        class="w-full h-full object-cover"
      />
    {:else}
      <div class="flex flex-col items-center justify-center text-gray-400">
        <svg class="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-xs">Aucune image</span>
      </div>
    {/if}
  </div>
  <div class="p-4">
    <h3 class="font-bold text-lg mb-1">{name ?? challengeName}</h3>
    <p class="text-sm text-gray-400 mb-2">{gameName ?? title}</p>
    <div class="flex items-center justify-between text-xs text-gray-400">
      <button
        on:click={increment}
        class="flex items-end gap-2 text-[#00D9FF] cursor-pointer"
      >
        <IconLike className="w-6 h-6" />
        <span class="leading-3">
          {displayVotes}
        </span>
      </button>
      <button
        class="flex items-end gap-2 leading-3 text-[#00D9FF] cursor-pointer"
      >
        <IconParticipant />
        <span class="leading-3">
          {totalParticipants ?? participants}
        </span>
      </button>
    </div>
  </div>
</div>

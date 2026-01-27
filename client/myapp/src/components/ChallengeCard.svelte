<script>
  import IconLike from "./icon-like.svelte";
  import IconParticipant from "./icon-participant.svelte";
  export let id; // mock prop & DB prop
  export let title; // mock prop
  export let challengeName; // mock prop
  export let image; // mock prop
  export let likes; // mock prop

  export let participants;
  export let name; // DB prop
  export let votesCount; // DB prop
  export let totalParticipants; // DB prop

  let restObj = { ...$$restProps };
  const gameName = restObj["game.name"];
  const gameImg = restObj["game.image"];

  function increment() {
    likes += 1;
  }
</script>

<div class="relative overflow-hidden rounded-xl bg-[#181e2e] shadow-md">
  <img
    {id}
    src={gameImg ?? image}
    alt={gameName ?? title}
    class="w-full h-32 object-cover"
  />
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
          {votesCount ?? likes}
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

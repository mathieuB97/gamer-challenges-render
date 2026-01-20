<script>
  export let id;
  export let title;
  export let challengeName;
  export let image;
  export let likes;
  export let participants;


  function increment() {
    likes += 1;
  }
</script>

<div class="relative overflow-hidden rounded-xl bg-[#181e2e] shadow-md">
  <img src={image} alt={title} class="w-full h-32 object-cover" />
  <div class="p-4">
    <h3 class="font-bold text-lg mb-1">{challengeName}</h3>
    <p class="text-sm text-gray-400 mb-2">{title}</p>
    <div class="flex items-center justify-between text-xs text-gray-400">
      <span on:click={increment} style="cursor: pointer;">👍 {likes}</span>
      <span>👥 {participants}</span>
    </div>
  </div>
</div>

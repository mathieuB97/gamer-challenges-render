<script>
  export let id = "";
  export let name = "";
  export let label = "";
  export let type = "text";
  export let value = "";
  export let placeholder = "";
  export let required = false;
  export let mandatory = false;
</script>

<label for={id} class="block text-sm mb-2 text-white/70">
  {label}
  {#if mandatory}
    <span class="text-red-500">*</span>
  {/if}
</label>

{#if type === "text-area"}
  <textarea
    {id}
    {name}
    bind:value
    {placeholder}
    {required}
    class="w-full px-4 py-3 bg-[#0a0e1a] border border-white/20 rounded-xs
           focus:border-[#00d9ff] focus:outline-none transition-colors
           h-32 resize-none"
  ></textarea>

{:else}
  <div class="relative">
    <input
      {type}
      {id}
      {name}
      bind:value
      {placeholder}
      {required}
      class="w-full px-4 py-3 pr-10 bg-[#0a0e1a]
             border border-white/20 rounded-xs
             focus:border-[#00d9ff] focus:outline-none transition-colors"
    />

    {#if type === "number"}
      <div class="absolute right-0 top-0 h-full flex flex-col">
        <button
            type="button"
            class="h-1/2 px-2 bg-[#141824]
                    border-l border-white/10
                    hover:bg-[#1a1f35]
                    text-white/70"
            on:click={() => value = Number(value || 0) + 1}
            tabindex="-1">
            ▲
        </button>
        
        <button
            type="button"
            class="h-1/2 px-2 bg-[#141824]
                    border-l border-t border-white/10
                    hover:bg-[#1a1f35]
                    text-white/70"
            on:click={() => value = Math.max(0, Number(value || 0) - 1)}
            tabindex="-1">
            ▼
        </button>
      </div>
    {/if}
  </div>
{/if}

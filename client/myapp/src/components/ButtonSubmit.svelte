<script>
    export let text = "Add btn text";
    export let className = "";
    export let variant = "primary";
    /** @type {'button' | 'submit' | 'reset'} */
    export let type = "submit";
</script>

{#if variant === "secondary"}
    <button
        {type}
        class="w-full mt-3 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors cursor-pointer {className}"
    >
        {text}
    </button>
{:else}
    <button
        {type}
        class="w-full mt-3 py-3 rounded-lg bg-linear-to-r from-[#7b2cbf] to-[#00d9ff] hover:opacity-90 transition-opacity font-bold cursor-pointer {className}"
    >
        {text}
    </button>
{/if}

<style>
</style>

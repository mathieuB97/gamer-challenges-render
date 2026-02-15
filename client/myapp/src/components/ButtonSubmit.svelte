<script>
    
    /**
     * @typedef {Object} Props
     * @property {string} [text]
     * @property {string} [className]
     * @property {string} [variant]
     * @property {'button' | 'submit' | 'reset'} [type]
     */

    /** @type {Props} */
    let {
        text = "Add btn text",
        className = "",
        variant = "primary",
        type = "submit"
    } = $props();
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

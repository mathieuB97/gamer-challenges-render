<script>
    /**
     * @typedef {Object} Props
     * @property {string} [className]
     * @property {string} [title]
     * @property {any} [adviceList]
     */

    /** @type {Props} */
    let { className = "", title = "Advice Title", adviceList = ["liste a remplir", "avec des conseils"] } = $props();
</script>

<div
    class="w-2xl max-w-full m-auto advice-block mt-6 p-6 bg-[#141824] border border-white/10 rounded-xl {className}"
>
    <h3 class="text-lg mb-3 text-[#00d9ff]">{title}</h3>
    <ul class="space-y-2 text-sm text-white/70">
        {#each adviceList as advice}
            <li class="flex items-start">
                <span class="text-white mr-2">•</span>
                {advice}
            </li>
        {/each}
    </ul>
</div>

<style>
</style>

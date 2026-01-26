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
        class="w-full px-4 py-3 bg-[#0a0e1a] border border-white/20 rounded-xs focus:border-[#00d9ff] focus:outline-none transition-colors h-32 resize-none"
    ></textarea>
{:else}
    <input
        {type}
        {id}
        {name}
        {value}
        {placeholder}
        {required}
        class="w-full px-4 py-3 bg-[#0a0e1a] border border-white/20 rounded-xs focus:border-[#00d9ff] focus:outline-none transition-colors"
    />
{/if}

<style>
</style>

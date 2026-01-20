<script>
    export let text = "Add btn text";
    export let className = "";
</script>

<button
    type="submit"
    class="w-full mt-3 py-3 rounded-lg bg-linear-to-r from-[#7b2cbf] to-[#00d9ff] hover:opacity-90 transition-opacity font-bold cursor-pointer {className}"
>
    {text}
</button>

<style>
</style>

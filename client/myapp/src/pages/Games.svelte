<script>
    import { onMount } from "svelte";

    let games = [];
    let loading = true;

    onMount(async () => {
        try {
            const response = await fetch("http://api:3000/api/games");
            if (!response.ok) throw new Error("Erreur lors du chargement");
            games = await response.json();
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            loading = false;
        }
    });
</script>

<div class="h-full flex items-center justify-center">
    <h1 class="text-6xl font-bold text-white mb-4">Page list de jeux</h1>
</div>

<style>
</style>

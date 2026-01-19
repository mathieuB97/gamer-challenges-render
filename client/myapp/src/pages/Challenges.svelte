<script>
    import { onMount } from "svelte";

    let challenges = [];
    let loading = true;

    onMount(async () => {
        try {
            const response = await fetch("http://api:3000/api/challenges");
            if (!response.ok) throw new Error("Erreur lors du chargement");
            challenges = await response.json();
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            loading = false;
        }
    });
</script>

<div class="h-full flex items-center justify-center">
    <h1 class="text-6xl font-bold text-white mb-4">
        Page liste des challenges
    </h1>
</div>

<style>
</style>

<script>
    import { onMount } from "svelte";

    let { gameId } = $props();

    let game = null;
    let challenges = [];
    let loading = true;

    onMount(async () => {
        try {
            const gameResponse = await fetch(
                `http://api:3000/api/games/${gameId}`,
            );
            if (!gameResponse.ok) throw new Error("Jeu non trouvé");
            game = await gameResponse.json();

            const challengesResponse = await fetch(
                `http://api:3000/api/challenges?gameId=${gameId}`,
            );
            if (challengesResponse.ok) {
                challenges = await challengesResponse.json();
            }
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            loading = false;
        }
    });
</script>

<div class="h-full flex items-center justify-center relative">
    <div class="btn-back absolute top-6 left-6">
        <a
            href="/games"
            class="text-blue-400 hover:text-blue-300 mb-6 inline-block"
            >← Retour</a
        >
    </div>
    <h1 class="text-6xl font-bold text-white mb-4">Page détail d'un jeu</h1>
</div>

<style>
</style>

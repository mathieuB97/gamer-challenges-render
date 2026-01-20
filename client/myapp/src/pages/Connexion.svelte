<script>
    import { onMount } from "svelte";

    onMount(async () => {
        try {
            const response = await fetch("http://api:3000/api/auth/login");
            if (!response.ok) throw new Error("Erreur lors du chargement");
            return await response.json();
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            return false;
        }
    });
</script>

<div class="h-full flex items-center justify-center">
    <h1 class="text-6xl font-bold text-white mb-4">Pages formulaire de connexion</h1>
</div>

<style>
</style>

<script>
    import { onMount } from "svelte";
    import BrandLogo from "../components/Brand-logo.svelte";

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
    function handleSubmit(params) {
        
    }

    const formData = {
        email: "",
        password: ""
    };

    const isLoading = false;

    function navigateToSignup() {
        window.location.href = "/inscription";
    }
</script>

<main class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
        <BrandLogo />

        <div class="bg-[#141824] border border-white/10 rounded-2xl p-8">
            <h2 class="text-2xl mb-6 text-center text-white">Connexion</h2>
            
            <!-- {#if error}
                <div class="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                    {error}
                </div>
            {/if} -->

            <form on:submit={handleSubmit} class="space-y-6">
                <div>
                    <label for="email" class="block text-sm mb-2 text-white/70">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        bind:value={formData.email}
                        class="w-full px-4 py-3 bg-[#0a0e1a] border border-white/10 rounded-lg focus:border-[#00d9ff] focus:outline-none transition-colors"
                        placeholder="votre@email.com"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label for="password" class="block text-sm mb-2 text-white/70">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        bind:value={formData.password}
                        class="w-full px-4 py-3 bg-[#0a0e1a] border border-white/10 rounded-lg focus:border-[#00d9ff] focus:outline-none transition-colors"
                        placeholder="••••••••"
                        required
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    class="w-full py-3 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Connexion..." : "Se connecter"}
                </button>
            </form>

            <p class="text-center text-white/70 text-sm mt-6">
                Pas encore de compte ?{' '}
                <a href="/inscription" class="text-[#00d9ff] hover:underline cursor-pointer">
                    S'inscrire
                </a>
            </p>
        </div>
    </div>
</main>
<style>
</style>

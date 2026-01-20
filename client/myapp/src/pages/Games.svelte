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

    const MOCK_GAMES = [
  {
    id: '1',
    title: 'Apex Legends',
    image: 'https://images.unsplash.com/photo-1611138290962-2c550ffd4002?w=600',
    challenges: 45,
    players: 1250,
  },
  {
    id: '2',
    title: 'Valorant',
    image: 'https://images.unsplash.com/photo-1761164034378-573f87613427?w=600',
    challenges: 38,
    players: 980,
  },
  {
    id: '3',
    title: 'League of Legends',
    image: 'https://images.unsplash.com/photo-1635372730136-06b29022281c?w=600',
    challenges: 52,
    players: 1580,
  },
  {
    id: '4',
    title: 'Fortnite',
    image: 'https://images.unsplash.com/photo-1568816684224-f752669b15b7?w=600',
    challenges: 41,
    players: 1120,
  },
  {
    id: '5',
    title: 'Call of Duty',
    image: 'https://images.unsplash.com/photo-1572289758057-3e0f4327833b?w=600',
    challenges: 33,
    players: 890,
  },
  {
    id: '6',
    title: 'Rocket League',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600',
    challenges: 27,
    players: 750,
  },
];
    function navigateToGameDetail(gameId) {
        window.location.href = `/games/${gameId}`;
    }

    function navigateToCreateChallenge(gameId) {
        window.location.href = `/games/${gameId}/create-challenge`;
    }

</script>

<main class="container mx-auto px-4 py-8">
    <div class="mb-8">
        <h1 class="text-3xl md:text-4xl mb-3 text-white">
            <span class="text-[#7b2cbf]">Liste</span> des jeux
        </h1>
        <p class="text-white/70">
            Choisissez votre jeu et découvrez les défis de la communauté
        </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each MOCK_GAMES as game (game.id)}
            <div class="bg-[#141824] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00d9ff]/50 transition-all group cursor-pointer">
                <div class="relative h-48 overflow-hidden">
                    <img
                        src={game.image}
                        alt={game.title}
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-[#141824] to-transparent" />
                </div>

                <div class="p-6">
                    <h3 class="text-xl mb-3 text-white">{game.title}</h3>
                    
                    <div class="flex items-center gap-4 text-sm text-white/60 mb-4">
                        <span class="flex items-center gap-1">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 6h4v4H6V6m8 0h4v4h-4V6M6 14h4v4H6v-4m8 0h4v4h-4v-4"/>
                            </svg>
                            {game.challenges} défis
                        </span>
                        <span>{game.players} joueurs</span>
                    </div>

                    <div class="flex gap-3">
                        <button
                            on:click={() => navigateToGameDetail(game.id)}
                            class="flex-1 py-2 px-4 text-center rounded-lg border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-white transition-colors text-sm"
                        >
                            Liste des challenges
                        </button>
                        <button
                            on:click={() => navigateToCreateChallenge(game.id)}
                            class="py-2 px-3 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff] hover:opacity-90 transition-opacity text-white"
                        >
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
</style>

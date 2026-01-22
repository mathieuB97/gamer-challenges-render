<script>
    import ChallengeCard from "../components/ChallengeCard.svelte";
    import { Carousel, ControlButton, Alert } from "flowbite-svelte";

    // Fonction pour diviser un tableau en chunks
    const chunkArray = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };

    // Variables pour tracker l'index de chaque carrousel
    let topChallengesIndex = $state(0);
    let newChallengesIndex = $state(0);
    let ongoingChallengesIndex = $state(0);

    // !!!!Exemple de données, à remplacer!!!!
    let topChallenges = [
        {
            id: 1,
            title: "Nom du jeu",
            challengeName: "Nom du défi",
            image: "https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
            likes: 234,
            participants: 120,
        },
        {
            id: 2,
            title: "Nom du jeu",
            challengeName: "Nom du défi",
            image: "https://images.unsplash.com/photo-1765430847336-596f709e8b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
            likes: 234,
            participants: 120,
        },
        {
            id: 3,
            title: "Nom du jeu",
            challengeName: "Nom du défi",
            image: "https://images.unsplash.com/photo-1635372730136-06b29022281c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
            likes: 234,
            participants: 120,
        },
        {
            id: 7,
            title: "Nom du jeu",
            challengeName: "Nom du défi",
            image: "https://images.unsplash.com/photo-1760604359369-45675611f750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
            likes: 234,
            participants: 120,
        },
        
    ];

    // !!!!Exemple de données, à remplacer!!!!
    let newChallenges = [
        {
            id: 7,
            title: "Nom du jeu",
            challengeName: "Nom du défi",
            image: "https://images.unsplash.com/photo-1760604359369-45675611f750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
            likes: 234,
            participants: 120,
        },
        {
            id: 8,
            title: "Nom du jeu",
            challengeName: "Nom du défi",
            image: "https://images.unsplash.com/photo-1698300113381-6c5df7400fbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
            likes: 234,
            participants: 120,
        },
        {
            id: 9,
            title: "Nom du jeu",
            challengeName: "Nom du défi",
            image: "https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
            likes: 234,
            participants: 120,
        },
    ];
    // !!!!Exemple de données, à remplacer!!!!
    let leaderboardData = [
        {
            rank: 1,
            name: "Nom du jeu",
            pseudo: "Pseudo meilleur joueur",
            image: "https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        },
        {
            rank: 2,
            name: "Nom du jeu",
            pseudo: "Pseudo meilleur joueur",
            image: "https://images.unsplash.com/photo-1765430847336-596f709e8b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        },
        {
            rank: 3,
            name: "Nom du jeu",
            pseudo: "Pseudo meilleur joueur",
            image: "https://images.unsplash.com/photo-1635372730136-06b29022281c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        },
        {
            rank: 4,
            name: "Nom du jeu",
            pseudo: "Pseudo meilleur joueur",
            image: "https://images.unsplash.com/photo-1759167625075-ee6173d53f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        },
        {
            rank: 5,
            name: "Nom du jeu",
            pseudo: "Pseudo meilleur joueur",
            image: "https://images.unsplash.com/photo-1765430847336-596f709e8b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        },
        {
            rank: 6,
            name: "Nom du jeu",
            pseudo: "Pseudo meilleur joueur",
            image: "https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        },
        {
            rank: 7,
            name: "Nom du jeu",
            pseudo: "Pseudo meilleur joueur",
            image: "https://images.unsplash.com/photo-1765430847336-596f709e8b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        },
        {
            rank: 8,
            name: "Nom du jeu",
            pseudo: "Pseudo meilleur joueur",
            image: "https://images.unsplash.com/photo-1635372730136-06b29022281c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        },
        {
            rank: 9,
            name: "Nom du jeu",
            pseudo: "Pseudo meilleur joueur",
            image: "https://images.unsplash.com/photo-1759167625075-ee6173d53f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        },
        {
            rank: 10,
            name: "Nom du jeu",
            pseudo: "Pseudo meilleur joueur",
            image: "https://images.unsplash.com/photo-1765430847336-596f709e8b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
        },
    ];
    // !!!!Exemple de données, à remplacer!!!!
    let ongoingChallenges = [
        {
            id: 20,
            title: "Nom du jeu",
            challengeName: "Nom du défi",
            image: "https://images.unsplash.com/photo-1759167625075-ee6173d53f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
            likes: 234,
            participants: 120,
        },
        {
            id: 2,
            title: "Nom du jeu",
            challengeName: "Nom du défi",
            image: "https://images.unsplash.com/photo-1765430847336-596f709e8b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
            likes: 234,
            participants: 120,
        },
        {
            id: 9,
            title: "Nom du jeu",
            challengeName: "Nom du défi",
            image: "https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
            likes: 234,
            participants: 120,
        },
    ];

    // Diviser les challenges en groupes de 3
    let topChallengesChunked = chunkArray(topChallenges, 3);
    let newChallengesChunked = chunkArray(newChallenges, 3);
    let ongoingChallengesChunked = chunkArray(ongoingChallenges, 3);
</script>

<div class="flex flex-col md:flex-row gap-8 w-full">
    <!-- Leaderboard -->
    <div
        class="w-full md:w-64 bg-[#12172b] rounded-xl sticky top-20 h-[530px] overflow-hidden py-4"
    >
        <div class="h-full overflow-y-auto px-4 py-4 scrollbar-thumb-gray-600">
            <h2 class="text-xl mb-4">Leaderboard</h2>
            <div class="space-y-4">
                {#each leaderboardData as player (player.rank)}
                    <div class="relative group cursor-pointer">
                        <!-- rank best player-->
                        <div
                            class="absolute -top-2 -left-2 w-8 h-8 rounded-lg flex items-center justify-center z-10
								{player.rank === 1
                                ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
                                : player.rank === 2
                                  ? 'bg-gradient-to-br from-gray-300 to-gray-500'
                                  : player.rank === 3
                                    ? 'bg-gradient-to-br from-amber-600 to-amber-800'
                                    : 'bg-gradient-to-br from-[#1a2139] to-[#12172b]'}"
                        >
                            <span class="font-bold">{player.rank}</span>
                        </div>
                        <!-- Card -->
                        <div class="relative overflow-hidden rounded-lg">
                            <img
                                src={player.image}
                                alt={player.name}
                                class="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                            ></div>
                            <div class="absolute bottom-2 left-2 right-2">
                                <p class="text-sm mb-0.5">{player.name}</p>
                                <p class="text-xs text-[#00d9ff] italic">
                                    {player.pseudo}
                                </p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <!-- Challenges Section -->
    <div class="flex-1 space-y-8">
        <!-- Top Challenges Carousel -->
        <section>
            <div class="mb-6">
                <h2 class="text-2xl">Top Challenges</h2>
            </div>
            <div class="max-w-6xl">
                <Carousel images={topChallengesChunked} duration={0} bind:index={topChallengesIndex}>
                    {#snippet slide({ index })}
                        <div class="grid grid-cols-3 gap-4 w-full p-4">
                            {#each topChallengesChunked[index] as challenge (challenge.id)}
                                <ChallengeCard {...challenge} />
                            {/each}
                        </div>
                    {/snippet}
                    {#if topChallengesChunked.length > 1}
                        <div class="flex gap-4 justify-center mt-4">
                            {#if topChallengesIndex > 0}
                                <ControlButton name="Previous" forward={false} onclick={() => topChallengesIndex--} />
                            {:else}
                                <div class="w-10"></div>
                            {/if}
                            {#if topChallengesIndex < topChallengesChunked.length - 1}
                                <ControlButton name="Next" forward={true} onclick={() => topChallengesIndex++} />
                            {:else}
                                <div class="w-10"></div>
                            {/if}
                        </div>
                    {/if}
                </Carousel>
            </div>
        </section>

        <!-- New Challenges Carousel -->
        <section>
            <div class="mb-6">
                <h2 class="text-2xl">Nouveaux challenges</h2>
            </div>
            <div class="max-w-6xl">
                <Carousel images={newChallengesChunked} duration={0} bind:index={newChallengesIndex}>
                    {#snippet slide({ index })}
                        <div class="grid grid-cols-3 gap-4 w-full p-4">
                            {#each newChallengesChunked[index] as challenge (challenge.id)}
                                <ChallengeCard {...challenge} />
                            {/each}
                        </div>
                    {/snippet}
                    {#if newChallengesChunked.length > 1}
                        <div class="flex gap-4 justify-center mt-4">
                            {#if newChallengesIndex > 0}
                                <ControlButton name="Previous" forward={false} onclick={() => newChallengesIndex--} />
                            {:else}
                                <div class="w-10"></div>
                            {/if}
                            {#if newChallengesIndex < newChallengesChunked.length - 1}
                                <ControlButton name="Next" forward={true} onclick={() => newChallengesIndex++} />
                            {:else}
                                <div class="w-10"></div>
                            {/if}
                        </div>
                    {/if}
                </Carousel>
            </div>
        </section>

        <!-- Ongoing Challenges Carousel -->
        <section>
            <div class="mb-6">
                <h2 class="text-2xl">Défis en cours</h2>
            </div>
            <div class="max-w-6xl">
                <Carousel images={ongoingChallengesChunked} duration={0} bind:index={ongoingChallengesIndex}>
                    {#snippet slide({ index })}
                        <div class="grid grid-cols-3 gap-4 w-full p-4">
                            {#each ongoingChallengesChunked[index] as challenge (challenge.id)}
                                <ChallengeCard {...challenge} />
                            {/each}
                        </div>
                    {/snippet}
                    {#if ongoingChallengesChunked.length > 1}
                        <div class="flex gap-4 justify-center mt-4">
                            {#if ongoingChallengesIndex > 0}
                                <ControlButton name="Previous" forward={false} onclick={() => ongoingChallengesIndex--} />
                            {:else}
                                <div class="w-10"></div>
                            {/if}
                            {#if ongoingChallengesIndex < ongoingChallengesChunked.length - 1}
                                <ControlButton name="Next" forward={true} onclick={() => ongoingChallengesIndex++} />
                            {:else}
                                <div class="w-10"></div>
                            {/if}
                        </div>
                    {/if}
                </Carousel>
            </div>
        </section>
    </div>
</div>

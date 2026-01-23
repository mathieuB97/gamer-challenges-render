<script>
    import ChallengeCard from "../components/ChallengeCard.svelte";
    import IconArrowLeft from "../components/icon-arrow-left.svelte";
    import IconArrowRight from "../components/icon-arrow-right.svelte";
    import {
        topChallenges,
        newChallenges,
        ongoingChallenges,
        leaderboardData,
    } from "../mock/data.js";

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

    // Diviser les challenges en groupes de 3
    let topChallengesChunked = chunkArray(topChallenges, 3);
    let newChallengesChunked = chunkArray(newChallenges, 3);
    let ongoingChallengesChunked = chunkArray(ongoingChallenges, 3);

    // Fonctions de navigation
    const nextSlide = (currentIndex, maxIndex, setIndex) => {
        if (currentIndex < maxIndex - 1) {
            setIndex(currentIndex + 1);
        }
    };

    const prevSlide = (currentIndex, setIndex) => {
        if (currentIndex > 0) {
            setIndex(currentIndex - 1);
        }
    };
</script>

<div class="flex flex-col md:flex-row gap-6 w-full">
    <!-- Leaderboard -->
    <div
        class="w-full md:w-64 bg-[#12172b] rounded-xl sticky top-20 h-132.5 overflow-hidden py-4"
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
            <div class="mb-6 flex items-center justify-between">
                <h2 class="text-2xl">Top Challenges</h2>

                {#if topChallengesIndex > 0}
                    <button
                        onclick={() =>
                            prevSlide(
                                topChallengesIndex,
                                (index) => (topChallengesIndex = index),
                            )}
                        class="flex items-center justify-center"
                        title="Précédent"
                    >
                        <IconArrowLeft />
                    </button>
                {/if}

                {#if topChallengesIndex < topChallengesChunked.length - 1}
                    <button
                        onclick={() =>
                            nextSlide(
                                topChallengesIndex,
                                topChallengesChunked.length,
                                (index) => (topChallengesIndex = index),
                            )}
                        class="flex items-center justify-center"
                        title="Suivant"
                    >
                        <IconArrowRight />
                    </button>
                {/if}
            </div>
            <div class="relative">
                <!-- Carousel Container -->
                <div class="overflow-hidden">
                    <div
                        class="flex transition-transform duration-300 ease-in-out"
                        style="transform: translateX(-{topChallengesIndex *
                            100}%)"
                    >
                        {#each topChallengesChunked as chunk, i}
                            <div class="w-full shrink-0 grid grid-cols-3 gap-4">
                                {#each chunk as challenge (challenge.id)}
                                    <ChallengeCard {...challenge} />
                                {/each}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </section>

        <!-- New Challenges Carousel -->
        <section>
            <div class="mb-6 flex items-center justify-between">
                <h2 class="text-2xl">Nouveaux challenges</h2>
                <div class="flex gap-2">
                    {#if newChallengesIndex > 0}
                        <button
                            onclick={() =>
                                prevSlide(
                                    newChallengesIndex,
                                    (index) => (newChallengesIndex = index),
                                )}
                            class="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                            title="Précédent"
                        >
                            ←
                        </button>
                    {/if}

                    {#if newChallengesIndex < newChallengesChunked.length - 1}
                        <button
                            onclick={() =>
                                nextSlide(
                                    newChallengesIndex,
                                    newChallengesChunked.length,
                                    (index) => (newChallengesIndex = index),
                                )}
                            class="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                            title="Suivant"
                        >
                            →
                        </button>
                    {/if}
                </div>
            </div>
            <div class="relative">
                <!-- Carousel Container -->
                <div class="overflow-hidden">
                    <div
                        class="flex transition-transform duration-300 ease-in-out"
                        style="transform: translateX(-{newChallengesIndex *
                            100}%)"
                    >
                        {#each newChallengesChunked as chunk, i}
                            <div class="w-full shrink-0 grid grid-cols-3 gap-4">
                                {#each chunk as challenge (challenge.id)}
                                    <ChallengeCard {...challenge} />
                                {/each}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </section>

        <!-- Ongoing Challenges Carousel -->
        <section>
            <div class="mb-6 flex items-center justify-between">
                <h2 class="text-2xl">Défis en cours</h2>
                <div class="flex gap-2">
                    {#if ongoingChallengesIndex > 0}
                        <button
                            onclick={() =>
                                prevSlide(
                                    ongoingChallengesIndex,
                                    (index) => (ongoingChallengesIndex = index),
                                )}
                            class="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                            title="Précédent"
                        >
                            ←
                        </button>
                    {/if}

                    {#if ongoingChallengesIndex < ongoingChallengesChunked.length - 1}
                        <button
                            onclick={() =>
                                nextSlide(
                                    ongoingChallengesIndex,
                                    ongoingChallengesChunked.length,
                                    (index) => (ongoingChallengesIndex = index),
                                )}
                            class="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                            title="Suivant"
                        >
                            →
                        </button>
                    {/if}
                </div>
            </div>
            <div class="relative">
                <!-- Carousel Container -->
                <div class="overflow-hidden">
                    <div
                        class="flex transition-transform duration-300 ease-in-out"
                        style="transform: translateX(-{ongoingChallengesIndex *
                            100}%)"
                    >
                        {#each ongoingChallengesChunked as chunk, i}
                            <div class="w-full shrink-0 grid grid-cols-3 gap-4">
                                {#each chunk as challenge (challenge.id)}
                                    <ChallengeCard {...challenge} />
                                {/each}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>

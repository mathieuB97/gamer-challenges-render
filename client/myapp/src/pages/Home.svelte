<script>
    import ChallengeCard from "../components/ChallengeCard.svelte";

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
    ];
</script>

<div class="flex flex-col md:flex-row gap-8 w-full">
    <!-- Leaderboard -->
    <div class="w-full md:w-64 bg-[#12172b] rounded-xl p-4 h-fit sticky top-40">
        <h2 class="text-xl mb-4">Leaderboard</h2>
        <div class="space-y-3">
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

    <!-- Challenges Section -->
    <div class="flex-1 space-y-8">
        <!-- Top Challenges -->
        <section>
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl">Top Challenges</h2>
                <span
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M5 12H19"
                            stroke="#00D9FF"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M12 5L19 12L12 19"
                            stroke="#00D9FF"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg></span
                >
            </div>
            <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto"
            >
                {#each topChallenges as challenge (challenge.id)}
                    <ChallengeCard {...challenge} />
                {/each}
            </div>
        </section>

        <!-- New Challenges -->
        <section>
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl">Nouveaux challenges</h2>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M5 12H19"
                        stroke="#00D9FF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12 5L19 12L12 19"
                        stroke="#00D9FF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each newChallenges as challenge (challenge.id)}
                    <ChallengeCard {...challenge} />
                {/each}
            </div>
        </section>
    </div>
</div>

<style>
</style>

<script>
  import BrandLogo from "../components/Brand-logo.svelte";

  import IconCercle from "../components/icon-cercle.svelte";
  import IconTrophy from "../components/icon-trophy.svelte";
  import IconCommunauty from "../components/icon-communauty.svelte";

  const features = [
    {
      title: "Défis variés",
      desc: "Des challenges pour tous les niveaux et tous les styles de jeu.",
      icon: IconCercle,
      accent: "default"
    },
    {
      title: "Classements",
      desc: "Comparez vos performances et grimpez dans les leaderboards.",
      icon: IconTrophy,
      accent: "default"
    },
    {
      title: "Communauté",
      desc: "Rejoignez une communauté active et passionnée de gamers.",
      icon: IconCommunauty,
      accent: "warm"
    }
  ];
</script>

<main class="min-h-[calc(100vh-200px)] px-4 py-12">
  <section class="mx-auto w-full max-w-6xl">
    <!-- HERO -->
    <div class="flex flex-col items-center text-center">
      <div class="mb-6">
        <BrandLogo />
      </div>

     <h1 class="text-center font-extrabold leading-tight">
  <span class="block text-white text-2xl">
    À propos de
  </span>

  <span
    class="block bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff]
           bg-clip-text text-transparent
           text-3xl sm:text-4xl md:text-5xl"
  >
    GamerChallenges
  </span>
</h1> 

      <p class="mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
        La plateforme ultime pour défier et repousser vos limites dans vos jeux préférés.
      </p>
    </div>

    <!-- MISSION -->
    <div class="mt-10 bg-[#141824] border border-white/10 rounded-2xl p-6 sm:p-8">
      <h2 class="text-lg font-semibold text-[#00d9ff]">Notre mission</h2>

      <p class="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
        GamerChallenges est né de la passion pour le gaming et la compétition saine. Notre objectif est de créer une
        communauté dynamique où les joueurs peuvent se lancer des défis, partager leurs exploits et progresser ensemble.
      </p>

      <p class="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
        Que vous soyez un joueur occasionnel ou un compétiteur acharné, notre plateforme vous offre un espace pour vous
        surpasser, vous amuser et rencontrer d’autres passionnés.
      </p>
    </div>

   <!-- 3 CARTES -->
<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {#each features as f}
    <article
      class="bg-[#141824] border border-white/10 rounded-2xl p-6
             flex flex-col items-center text-center
             min-h-[170px]"
    >
      <!-- Badge icône -->
      <div
        class="mb-4 h-14 w-14 rounded-2xl flex items-center justify-center
               {f.accent === 'warm'
                 ? 'bg-gradient-to-r from-orange-500/90 to-rose-500/80'
                 : 'bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff]'}"
        aria-hidden="true"
      >
        <div class="h-7 w-7 text-white">
          <svelte:component this={f.icon} />
        </div>
      </div>

      <h3 class="text-base font-semibold text-white leading-tight">
        {f.title}
      </h3>

      <p class="mt-2 text-xs sm:text-sm text-white/70 max-w-[220px] leading-snug">
        {f.desc}
      </p>
    </article>
  {/each}
</div>

    <!-- CTA -->
    <div
      class="mt-10 bg-gradient-to-r from-[#7b2cbf]/40 to-[#00d9ff]/30 border border-white/10 rounded-2xl p-6 sm:p-8"
    >
      <div class="flex flex-col items-center gap-5 text-center sm:gap-6">
        <div>
          <h2 class="text-xl font-bold sm:text-2xl text-white">Rejoignez l’aventure</h2>
          <p class="mt-2 text-sm text-white/80 sm:text-base">
            Créez un compte, choisissez un jeu et lancez vos premiers challenges.
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="/inscription"
            class="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:opacity-90 transition-opacity"
          >
            S'inscrire
          </a>

          <a
            href="/jeux"
            class="inline-flex items-center justify-center rounded-lg border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Voir les jeux
          </a>
        </div>
      </div>
    </div>

    
  </section>
</main>

<style>
  /*  Tailwind */
</style>
<script>
  import BrandLogo from "./Brand-logo.svelte";
  import { authStore, clearAuth } from "../lib/stores/auth.svelte";

  let mobileMenuOpen = false;
</script>

<header
  class="border-b border-white/10 bg-[#0a0e1a]/95 backdrop-blur-sm sticky top-0 z-50 px-4 md:px-2"
>
  <div class="mx-auto py-3">
    <div class="flex items-center justify-between gap-2">
      <!-- Burger Menu (Mobile) -->
      <!-- <span
        on:click={() => mobileMenuOpen = !mobileMenuOpen}
        class="md:hidden p-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
      >
        {#if mobileMenuOpen}
          <span class="w-5 h-5">x</span>
        {:else}
          <Menu class="w-5 h-5" />
        {/if}
      </span> -->

      <!-- Logo - Responsive -->
      <a href="/">
        <BrandLogo />
      </a>

      <!-- Navigation Desktop -->
      <nav class="hidden md:flex items-center gap-8">
        <a href="/jeux"> Jeux </a>
        <a href="/a-propos"> À propos </a>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        {#if authStore.token}
          <a
            href="/deconnexion"
            on:click={clearAuth}
            class="px-3 sm:px-4 py-2 rounded-lg border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-white transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            Déconnexion
          </a>
        {:else}
          <a
            href="/inscription"
            class="hidden sm:block px-4 sm:px-6 py-2 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff] hover:opacity-90 transition-opacity text-sm sm:text-base whitespace-nowrap"
          >
            Inscription
          </a>
          <a
            href="/connexion"
            class="px-3 sm:px-4 py-2 rounded-lg border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-white transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            Connexion
          </a>
        {/if}
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
      <nav class="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-3">
        <a
          href="/jeux"
          class="block w-full text-left text-foreground hover:text-[#00d9ff] transition-colors py-2"
        >
          Jeux
        </a>

        <a
          href="/a-propos"
          class="block w-full text-left text-foreground hover:text-[#00d9ff] transition-colors py-2"
        >
          À propos
        </a>

        {#if authStore.token}
          <a
            href="/deconnexion"
            on:click|preventDefault={clearAuth}
            class="block w-full px-3 py-2 rounded-lg border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-white transition-colors text-center sm:hidden"
          >
            Déconnexion
          </a>
        {:else}
          <a
            href="/inscription"
            class="block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff] hover:opacity-90 transition-opacity text-center sm:hidden"
          >
            Inscription
          </a>
          <a
            href="/connexion"
            class="block w-full px-3 py-2 rounded-lg border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-white transition-colors text-center sm:hidden"
          >
            Connexion
          </a>
        {/if}
      </nav>
    {/if}
  </div>
</header>

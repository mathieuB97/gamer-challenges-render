<script>
  import BrandLogo from './Brand-logo.svelte';
  
  let mobileMenuOpen = false;
  function onNavigate(page) {

  }
</script>

<header class="border-b border-white/10 bg-[#0a0e1a]/95 backdrop-blur-sm sticky top-0 z-50">
  <div class="container mx-auto px-4 py-3">
    <div class="flex items-center justify-between gap-2">
      <!-- Burger Menu (Mobile) -->
      <span
        on:click={() => mobileMenuOpen = !mobileMenuOpen}
        class="md:hidden p-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
      >
        {#if mobileMenuOpen}
          <span class="w-5 h-5">x</span>
        {:else}
          <!-- <Menu class="w-5 h-5" /> -->
        {/if}
      </span>

      <!-- Logo - Responsive -->
      <BrandLogo />

      <!-- Navigation Desktop -->
      <nav class="hidden md:flex items-center gap-8">
        <a href="/games">
          Jeux
        </a>
        <a href="/a-propos">
          À propos
        </a>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <a href="/signup"
          class="hidden sm:block px-4 sm:px-6 py-2 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff] hover:opacity-90 transition-opacity text-sm sm:text-base whitespace-nowrap"
        >
          Inscription
        </a>

        <a href="/login"
          class="px-3 sm:px-4 py-2 rounded-lg border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-white transition-colors text-sm sm:text-base whitespace-nowrap"
        >
          Connexion
        </a>
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
      <nav class="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-3">
        <a href="/games"
          class="block w-full text-left text-foreground hover:text-[#00d9ff] transition-colors py-2"
        >
          Jeux
        </a>

        <a href="/a-propos"
          class="block w-full text-left text-foreground hover:text-[#00d9ff] transition-colors py-2"
        >
          À propos
        </a>

        <a href="/signup"
          class="block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff] hover:opacity-90 transition-opacity text-center sm:hidden"
        >
          Inscription
        </a>
      </nav>
    {/if}
  </div>
</header>

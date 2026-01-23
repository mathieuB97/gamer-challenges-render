<script>
  import { onMount, onDestroy } from "svelte";
  import BrandLogo from "./Brand-logo.svelte";
  import { authStore, clearAuth } from "../lib/stores/auth.svelte";

  // Icônes menu burger (dans le même dossier components)
  import IconMenuBurger from "./icon-Menu-burger.svelte";
  import IconCloseMenuBurger from "./icon-close-Menu-burger.svelte";

  let mobileMenuOpen = false;
  let mobileMenuEl; // référence du conteneur du menu mobile

  function toggleMobileMenu(event) {
    // évite que le click sur le bouton soit pris comme un "click extérieur"
    event.stopPropagation();
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  function handleClickOutside(event) {
    if (!mobileMenuOpen) return;

    // si on clique en dehors du menu => on ferme
    if (mobileMenuEl && !mobileMenuEl.contains(event.target)) {
      mobileMenuOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener("pointerdown", handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener("pointerdown", handleClickOutside);
  });
</script>

<header class="border-b border-white/10 bg-[#0a0e1a]/95 backdrop-blur-sm sticky top-0 z-50 px-4 md:px-2">
  <div class="mx-auto py-3">
    <div class="flex items-center justify-between gap-2">
      <!-- Burger (mobile only) -->
      <button
        type="button"
        class="md:hidden p-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
        aria-label="Menu"
        on:click={toggleMobileMenu}
      >
        {#if mobileMenuOpen}
          <IconCloseMenuBurger class="w-5 h-5" />
        {:else}
          <IconMenuBurger class="w-5 h-5" />
        {/if}
      </button>

      <!-- Logo -->
      <a href="/" class="shrink-0">
        <BrandLogo />
      </a>

      <!-- Navigation Desktop -->
      <nav class="hidden md:flex items-center gap-8">
        <a href="/jeux">Jeux</a>
        <a href="/a-propos">À propos</a>
      </nav>

      <!-- Actions (Desktop + bouton mobile top) -->
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        {#if authStore.token}
          <a
            href="/deconnexion"
            on:click|preventDefault={() => {
              clearAuth();
            }}
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

    {#if mobileMenuOpen}
      <!-- Overlay (clic extérieur) -->
      <div
        class="fixed inset-0 z-40 bg-black/40 md:hidden"
        on:click={closeMobileMenu}
      ></div>

      <!-- Mobile Menu -->
      <nav
        bind:this={mobileMenuEl}
        class="fixed top-[64px] left-0 right-0 z-50 md:hidden
               bg-[#0a0e1a] border-t border-white/10
               px-4 py-4 space-y-3"
        on:pointerdown|stopPropagation
      >
        <a
          href="/jeux"
          class="block w-full text-left text-white/90 hover:text-[#00d9ff] transition-colors py-2"
          on:click={closeMobileMenu}
        >
          Jeux
        </a>

        <a
          href="/a-propos"
          class="block w-full text-left text-white/90 hover:text-[#00d9ff] transition-colors py-2"
          on:click={closeMobileMenu}
        >
          À propos
        </a>

        {#if authStore.token}
          <a
            href="/deconnexion"
            on:click|preventDefault={() => {
              clearAuth();
              closeMobileMenu();
            }}
            class="block w-full px-3 py-2 rounded-lg border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-white transition-colors text-center"
          >
            Déconnexion
          </a>
        {:else}
          <a
            href="/inscription"
            class="block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff] hover:opacity-90 transition-opacity text-center"
            on:click={closeMobileMenu}
          >
            Inscription
          </a>

          <!-- ✅ Connexion SUPPRIMÉ du menu burger -->
        {/if}
      </nav>
    {/if}
  </div>
</header>
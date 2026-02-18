<script>
  import { onMount, onDestroy } from "svelte";
  import BrandLogo from "./Brand-logo.svelte";
  import { authStore, clearAuth, getAuth } from "../lib/stores/auth.svelte";
  import IconMenuBurger from "./icon-Menu-burger.svelte";
  import IconCloseMenuBurger from "./icon-close-Menu-burger.svelte";
  import Avatar from "./Avatar.svelte";

  let mobileMenuOpen = $state(false);
  let mobileMenuEl = $state();

  // Toggle menu mobile
  function toggleMobileMenu(event) {
    event.preventDefault();
    mobileMenuOpen = !mobileMenuOpen;
    console.log("trigger toggle");
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  onMount(() => {
    getAuth(); // hydrate token et userStore depuis localStorage
  });
</script>

{#if mobileMenuOpen}
  <!-- Overlay -->
  <div
    class="absolute h-full inset-0 z-40 md:hidden backdrop-blur-xs"
    role="button"
    tabindex="0"
    onclick={toggleMobileMenu}
    onkeydown={(e) =>
      (e.key === "Enter" || e.key === " ") && toggleMobileMenu()}
  ></div>
{/if}
<header
  class="border-b border-white/10 bg-[#0a0e1a]/95 backdrop-blur-sm sticky top-0 z-50 px-4 md:px-2"
>
  <div class="mx-auto py-3">
    <div class="flex flex-nowrap w-full items-center justify-between gap-2">
      <!-- Burger (mobile only) -->
      <button
        type="button"
        class="shrink-0 md:hidden p-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
        aria-label="Menu"
        onclick={toggleMobileMenu}
      >
        {#if mobileMenuOpen}
          <IconCloseMenuBurger />
        {:else}
          <IconMenuBurger />
        {/if}
      </button>

      <!-- Logo -->
      <a href="/" class="shrink sm:shrink-0 min-w-0">
        <BrandLogo className="w-full max-w-[140px] sm:max-w-[206px] h-auto" />
      </a>

      <!-- Navigation Desktop -->
      <nav class="hidden md:flex items-center gap-8">
        <a href="/jeux">Jeux</a>
        <a href="/a-propos">À propos</a>
      </nav>

      <!-- Actions -->
      <div class="flex shrink sm:shrink-0 min-w-0 items-center gap-2 sm:gap-3">
        {#if $authStore.token}
          <div class="flex items-center gap-3">
            <Avatar size={36} />
            <button
              onclick={clearAuth}
              class="hidden md:flex px-3 sm:px-4 py-2 rounded-lg border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-white transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              Déconnexion
            </button>
          </div>
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
      <!-- Mobile Menu -->
      <nav
        bind:this={mobileMenuEl}
        class="fixed top-[64px] left-0 right-0 z-50 md:hidden bg-[#0a0e1a] border-t border-white/10 px-4 py-4 space-y-3"
        onpointerdown={(e) => e.stopPropagation()}
      >
        <a
          href="/"
          class="block w-full text-left text-white/90 hover:text-[#00d9ff] py-2"
          onclick={closeMobileMenu}>Accueil</a
        >
        <a
          href="/jeux"
          class="block w-full text-left text-white/90 hover:text-[#00d9ff] py-2"
          onclick={closeMobileMenu}>Jeux</a
        >
        <a
          href="/a-propos"
          class="block w-full text-left text-white/90 hover:text-[#00d9ff] py-2"
          onclick={closeMobileMenu}>À propos</a
        >

        {#if $authStore.token}
          <button
            onclick={() => {
              clearAuth();
              closeMobileMenu();
            }}
            class="w-full px-3 py-2 rounded-lg border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-white transition-colors"
          >
            Déconnexion
          </button>
        {:else}
          <a
            href="/inscription"
            class="block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff] hover:opacity-90 transition-opacity text-center"
            onclick={closeMobileMenu}>Inscription</a
          >
        {/if}
      </nav>
    {/if}
  </div>
</header>

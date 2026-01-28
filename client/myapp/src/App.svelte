<script>
  import "./styles/app.css";
  import { currentComponent, params } from "./router.js";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import { onMount } from "svelte";
  import { getAuth } from "./lib/stores/auth.svelte";
  import { getCurrentUser } from "./lib/services/auth.service.js";

  onMount(async () => {
    // 1️⃣ Récupère le token depuis localStorage
    getAuth();

    // 2️⃣ Récupère l'utilisateur courant depuis l'API
    await getCurrentUser();
  });
</script>

<div class="h-screen flex flex-col w-full max-w-7xl m-auto bg-[#0a0e1a]">
  <Header />
  <main class="flex-1 pt-4 pb-18 px-2">
    <svelte:component this={$currentComponent} {...$params} />
  </main>
  <Footer />
</div>
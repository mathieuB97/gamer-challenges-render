<script>
	import "./styles/app.css";
	import { currentComponent, params } from "./router.js";
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
</script>

<div class="h-screen flex flex-col w-7xl m-auto mt-0 mb-0 bg-[#0a0e1a]">
	<Header />

	<main class="flex-1">
		<svelte:component this={$currentComponent} {...$params} />
	</main>

	<Footer />
</div>

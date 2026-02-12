<script>
	export let contribution = null;
	export let isOpen = false;

	function closeModal() {
		isOpen = false;
	}

	function handleKeydown(e) {
		if (e.key === "Escape" && isOpen) closeModal();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	<!-- Overlay -->
	<div class="fixed inset-0 z-40 bg-black/60" on:click={closeModal}></div>

	<!-- Modal -->
	<div class="fixed inset-0 z-50 flex items-center justify-center px-4">
		<div
			class="w-full max-w-md rounded-2xl border border-white/10 bg-[#141824]
                   shadow-xl overflow-hidden"
			on:click|stopPropagation
		>
			<!-- Header -->
			<div class="flex items-start justify-between gap-4 p-6">
				<h2 class="text-2xl font-extrabold text-white">Détail participation</h2>

				<button
					type="button"
					class="h-10 w-10 rounded-lg border border-white/15 text-white/80
                           hover:bg-white/5 transition flex items-center justify-center"
					on:click={closeModal}
					aria-label="Fermer"
				>
					✕
				</button>
			</div>

			<!-- Body -->
			<div class="px-6 pb-6 space-y-4">
				<!-- URL Vidéo -->
				<div>
					<p class="text-sm text-white/70 mb-2">Vidéo</p>
					<a
						href={contribution?.video_url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-[#00d9ff] hover:underline text-sm break-all"
					>
						{contribution?.video_url}
					</a>
				</div>

				<!-- Durée -->
				<div>
					<p class="text-sm text-white/70 mb-2">Durée</p>
					<p class="text-white/90">{contribution?.duration} minutes</p>
				</div>
			</div>
		</div>
	</div>
{/if}

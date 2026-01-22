<script>
    export let title = {
        default: "Mettre un titre",
        highlight: "accrocheur ici",
    };
    export let paragraph = "Ajouter un paragraphe descriptif ici";
    export let className = "";
</script>

<div
    class="hero w-full relative h-64 md:h-80 rounded-2xl overflow-hidden {className}"
>
    <img
        src="https://images.unsplash.com/photo-1611138290962-2c550ffd4002?w=600"
        alt="Bandeau illustrant la création d'un défi"
        class="w-full h-full object-cover"
    />
    <div
        class="gradient absolute -bottom-8 inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/50 to-transparent"
    ></div>
    <div class="text absolute bottom-6 left-6">
        <h1 class="text-3xl md:text-4xl mb-2">
            {title.default}
            <span class="text-[#7b2cbf]">{title.highlight} </span>
        </h1>
        <p class="text-white/70">{paragraph}</p>
    </div>
</div>

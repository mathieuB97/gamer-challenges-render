<script>
    import AdviceBloc from "../components/AdviceBloc.svelte";

    import ButtonSubmit from "../components/ButtonSubmit.svelte";
    import Hero from "../components/Hero.svelte";
    import LabelInput from "../components/LabelInput.svelte";
    let formData = {
        challengeName: "",
        challengeTitle: "",
        pseudo: "",
        challengeObjective: "",
    };

    function handleInput(field, event) {
        formData[field] = event.target.value;
    }

    function createChallenge(event) {
        console.log("e.target", event.target);

        event.preventDefault();
        const formData = new FormData(event.target);
        const challengeName = formData.get("challenge-name");
        const challengeTitle = formData.get("challenge-title");
        const pseudo = formData.get("pseudo");
        const challengeObjective = formData.get("challenge-objective");
        // Here you would typically send formData to your backend API
        console.log("Challenge créé avec les données :", {
            challengeName,
            challengeTitle,
            pseudo,
            challengeObjective,
        });
    }
</script>

<div class="h-full flex items-start justify-center">
    <div class="mycontainer w-full">
        <div class="goback text-white/70">
            <a
                class="flex gap-2 font-bold hover:text-white mb-6 transition-colors"
                href="/challenges"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-arrow-left w-5 h-5"
                    ><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"
                    ></path></svg
                >
                Retour
            </a>
        </div>
        <Hero
            title={{ default: "Créer un", highlight: "défi" }}
            paragraph="Lancez un nouveau challenge à la communauté"
            className="mb-8"
        />

        <div
            class="w-2xl max-w-full m-auto bg-[#141824] border border-white/10 rounded-2xl p-8"
        >
            <form class="space-y-4" on:submit={createChallenge}>
                <LabelInput
                    id="challenge-name"
                    name="challenge-name"
                    label="Nom du challenge"
                    type="text"
                    value={formData.challengeName}
                    placeholder="nom du challenge"
                    required={true}
                    mandatory={true}
                    on:input={(e) => handleInput("challengeName", e)}
                />

                <LabelInput
                    id="challenge-title"
                    name="challenge-title"
                    label="Titre du challenge"
                    type="text"
                    value={formData.challengeTitle}
                    placeholder="titre du challenge"
                    required={true}
                    mandatory={true}
                    on:input={(e) => handleInput("challengeTitle", e)}
                />

                <LabelInput
                    id="pseudo"
                    name="pseudo"
                    label="Votre pseudo"
                    type="text"
                    value={formData.pseudo}
                    placeholder="votre pseudo"
                    required={true}
                    mandatory={true}
                    on:input={(e) => handleInput("pseudo", e)}
                />

                <LabelInput
                    id="challenge-objective"
                    name="challenge-objective"
                    label="Objectif du défi"
                    type="text-area"
                    value={formData.challengeObjective}
                    placeholder="objectif du défi"
                    required={true}
                    mandatory={true}
                    on:input={(e) => handleInput("challengeObjective", e)}
                />
                <p class="text-white/70 mx-auto block mb-6">
                    Expliquez clairement ce que les joueurs doivent accomplir
                    pour réussir ce défi
                </p>

                <div class="buttons flex">
                    <ButtonSubmit
                        variant="secondary"
                        text="Annuler"
                        className="max-w-73 mx-auto block"
                        type="reset"
                    />
                    <ButtonSubmit
                        variant="primary"
                        text="S'inscrire"
                        className="max-w-73 mx-auto block"
                    />
                </div>
            </form>
        </div>

        <AdviceBloc
            title="Conseils pour créer un bon défi"
            adviceList={[
                "Soyez clair et précis dans la description de l'objectif",
                "Assurez-vous que le défi est réalisable mais stimulant",
                "Indiquez toutes les conditions nécessaires pour valider le défi",
                "Évitez les défis qui nécessitent de tricher ou d'enfreindre les règles du jeu",
            ]}
        />
    </div>
</div>

<style>
</style>

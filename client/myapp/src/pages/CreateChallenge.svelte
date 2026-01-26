<script>
    import AdviceBloc from "../components/AdviceBloc.svelte";
    import ButtonSubmit from "../components/ButtonSubmit.svelte";
    import Hero from "../components/Hero.svelte";
    import IconArrowLeft from "../components/icon-arrow-left.svelte";
    import LabelInput from "../components/LabelInput.svelte";
    import { routeParams } from "../router";

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
        const challengeSelect = formData.get("challenge-select");
        const pseudo = formData.get("pseudo");
        const challengeObjective = formData.get("challenge-objective");
        const time_limit_minutes = formData.get("time-limit-minutes");
        // Here you would typically send formData to your backend API
        console.log("Challenge créé avec les données :", {
            challengeName,
            challengeSelect,
            pseudo,
            challengeObjective,
            time_limit_minutes,
        });
    }
</script>

<div class="h-full flex items-start justify-center">
    <div class="mycontainer w-full">
        <div class="goback text-white/70">
            <a
                class="flex gap-2 font-bold hover:text-white mb-6 transition-colors"
                href={`/jeux/${$routeParams.gameId}/challenges`}
            >
                <IconArrowLeft className="w-5 h-5" />
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
                    id="name"
                    name="name"
                    label="Nom du challenge"
                    type="text"
                    value={formData.challengeName}
                    placeholder="nom du challenge"
                    required={true}
                    mandatory={true}
                    on:input={(e) => handleInput("challengeName", e)}
                />

                <LabelInput
                    id="time-limit-minutes"
                    name="time-limit-minutes"
                    label="Temps limite (en minutes)"
                    type="number"
                    value={formData.time_limit_minutes}
                    placeholder="le temps a éffectué (en minutes)"
                    required={true}
                    mandatory={true}
                    on:input={(e) => handleInput("time_limit_minutes", e)}
                />

                <label for="level-select">Choisissez un niveaux de difficulté:</label>

                <select name="challenge-select" id="challenge-select" class="bg-[#0a0e1a] border border-white/20">
                <option value={formData.challengeSelect}>--Veuillez choisir une option--</option>
                <option value="Low">Low ❤️</option>
                <option value="Medium">Medium ⚔️</option>
                <option value="Hard">Hard 💀</option>
                </select>

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
                        text="Soumettre le défi"
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

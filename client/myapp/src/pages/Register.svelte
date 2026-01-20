<script>
    import LabelInput from "../components/LabelInput.svelte";
    import ButtonSubmit from "../components/ButtonSubmit.svelte";
    import { onMount } from "svelte";
    import BrandLogo from "../components/Brand-logo.svelte";

    onMount(async () => {
        try {
            const response = await fetch("http://api:3000/api/auth/register");
            if (!response.ok) throw new Error("Erreur lors du chargement");
            return await response.json();
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            return false;
        }
    });
    let formData = {
        pseudo: "",
        email: "",
        password: "",
    };

    function register(e) {
        const formDataObj = new FormData(e.target);
        const data = Object.fromEntries(formDataObj);
        alert(JSON.stringify(data));
    }

    function handleInput(field, event) {
        formData[field] = event.target.value;
    }
</script>

<div class="h-full flex flex-col items-center justify-center p-4">
    <div class="mb-6">
        <BrandLogo />
    </div>

    <div
        class="w-md max-w-full bg-[#141824] border border-white/10 rounded-2xl p-8"
    >
        <h2 class="text-2xl mb-6 text-center">Inscription</h2>

        <form class="space-y-4" onsubmit={register}>
            <LabelInput
                id="pseudo"
                name="pseudo"
                label="Pseudo"
                type="text"
                value={formData.pseudo}
                placeholder="votre pseudo"
                required={true}
                mandatory={true}
                on:input={(e) => handleInput("pseudo", e)}
            />

            <LabelInput
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                placeholder="votre email"
                required={true}
                mandatory={true}
                on:input={(e) => handleInput("email", e)}
            />

            <LabelInput
                id="password"
                name="password"
                label="Mot de passe"
                type="password"
                value={formData.password}
                placeholder="votre mot de passe"
                required={true}
                mandatory={true}
                on:input={(e) => handleInput("password", e)}
            />

            <ButtonSubmit
                text="S'inscrire"
                className="max-w-73 mx-auto block"
            />

            <p class=" mx-auto block">
                Déjà un compte ?<a href="/connexion"> Se connecter</a>
            </p>
        </form>
    </div>
</div>

<style>
</style>

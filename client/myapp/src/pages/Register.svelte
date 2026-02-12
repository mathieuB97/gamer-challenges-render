<script>
    import LabelInput from "../components/LabelInput.svelte";
    import ButtonSubmit from "../components/ButtonSubmit.svelte";
    import BrandLogo from "../components/Brand-logo.svelte";
    import { registerUser } from "../lib/services/auth.service";
    import page from "page";

    let formData = {
        pseudo: "",
        email: "",
        password: "",
    };

    async function register(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const pseudo = formData.get("pseudo");
        const email = formData.get("email");
        const password = formData.get("password");
        try {
            // Call your API to register the user
            await registerUser({ pseudo, email, password });
            // Redirect to login page after successful registration
            page("/connexion");
        } catch (e) {
            // form.error = "Une erreur est survenue lors de l'inscription.";
            throw new Error("Une erreur est survenue lors de l'inscription.");
        }
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
                Déjà un compte ?
                <a href="/connexion"
                 class="text-[#00d9ff] hover:underline cursor-pointer"> Se connecter</a>
            </p>
        </form>
    </div>
</div>

<style>
</style>

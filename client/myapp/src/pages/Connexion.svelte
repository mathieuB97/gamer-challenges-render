<script>
    import BrandLogo from "../components/Brand-logo.svelte";
    import LabelInput from "../components/LabelInput.svelte";
    import { loginUser } from "../lib/services/auth.service";
    import page from "page";

    const formData = {
        emailOrPseudo: "",
        password: "",
    };

    let isLoading = false;

    async function login(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const emailOrPseudo = formData.get("emailOrPseudo");
        const password = formData.get("password");
        try {
            // Call your API to register the user
            await loginUser({ emailOrPseudo, password });
            console.log("Utilisateur connecté :", emailOrPseudo, password);
            page("/");
        } catch (e) {
            // form.error = "Une erreur est survenue lors de l'inscription.";
            throw new Error("Une erreur est survenue lors de l'inscription.");
        }
    }
    function handleInput(field, event) {
        formData[field] = event.target.value;
    }
</script>

<main
    class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12"
>
    <div class="h-full flex flex-col items-center justify-center p-4">
        <div class="mb-6">
            <BrandLogo />
        </div>
        <div class="bg-[#141824] border border-white/10 rounded-2xl p-8">
            <h2 class="text-2xl mb-6 text-center text-white">Connexion</h2>

            <form class="space-y-4" onsubmit={login}>
                <LabelInput
                    id="emailOrPseudo"
                    name="emailOrPseudo"
                    label="Votre email ou votre pseudo"
                    type="text"
                    value={formData.emailOrPseudo}
                    placeholder="votre email ou votre pseudo"
                    mandatory={true}
                    required={true}
                    on:input={(e) => handleInput("emailOrPseudo", e)}
                />

                <LabelInput
                    id="password"
                    name="password"
                    label="Mot de passe"
                    type="password"
                    value={formData.password}
                    placeholder="Votre mot de passe"
                    mandatory={true}
                    required={true}
                    on:input={(e) => handleInput("password", e)}
                />

                <button
                    type="submit"
                    class="w-full py-3 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Connexion..." : "Se connecter"}
                </button>
            </form>

            <p class="text-center text-white/70 text-sm mt-6">
                Pas encore de compte ?{" "}
                <a
                    href="/inscription"
                    class="text-[#00d9ff] hover:underline cursor-pointer"
                >
                    S'inscrire
                </a>
            </p>
        </div>
    </div>
</main>

<style>
</style>

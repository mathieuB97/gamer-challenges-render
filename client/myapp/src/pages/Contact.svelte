<script>
  import LabelInput from "../components/LabelInput.svelte";

  let formData = $state({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  let errors = $state({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  let showSuccessPopup = $state(false);

  function validateForm() {
    errors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Le nom est requis";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "L'email est requis";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "L'email est invalide";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = "Le sujet est requis";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Le message est requis";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = "Le message doit contenir au moins 10 caractères";
      isValid = false;
    }

    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Afficher le popup de succès
    showSuccessPopup = true;

    // Réinitialiser le formulaire
    formData = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
    errors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    // Fermer le popup après 5 secondes
    setTimeout(() => {
      showSuccessPopup = false;
    }, 5000);
  }
</script>

<div
  class="min-h-screen bg-gradient-to-b from-[#0a0e1a] to-[#1a1f3a] pt-20 pb-12"
>
  <div class="container mx-auto px-4 max-w-4xl">
    <h1 class="text-4xl font-bold text-white mb-2 text-center">
      Nous contacter
    </h1>
    <p class="text-center text-gray-400 mb-12">
      Vous avez une question ou une suggestion ? N'hésitez pas à nous envoyer un
      message.
    </p>

    <div class="grid md:grid-cols-2 gap-12">
      <!-- Formulaire -->
      <div>
        <form onsubmit={handleSubmit} class="space-y-6">
          <div>
            <!-- <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
              Nom
            </label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              class="w-full px-4 py-2 bg-[#1a1f3a] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors {errors.name ? 'border-red-500 focus:border-red-500' : 'border-[#00d9ff]/20 focus:border-[#00d9ff]'}"
              placeholder="Votre nom"
            /> -->
            <LabelInput
              id="name"
              type="text"
              bind:value={formData.name}
              placeholder="Votre nom"
              label="Nom"
            />
            {#if errors.name}
              <p class="text-red-400 text-sm mt-1">❌ {errors.name}</p>
            {/if}
          </div>

          <div>
            <!-- <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              class="w-full px-4 py-2 bg-[#1a1f3a] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors {errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#00d9ff]/20 focus:border-[#00d9ff]'}"
              placeholder="votre@email.com"
            /> -->
            <LabelInput
              id="email"
              type="email"
              bind:value={formData.email}
              placeholder="votre@email.com"
              label="Email"
            />
            {#if errors.email}
              <p class="text-red-400 text-sm mt-1">❌ {errors.email}</p>
            {/if}
          </div>

          <div>
            <!-- <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">
              Sujet
            </label>
            <input
              type="text"
              id="subject"
              bind:value={formData.subject}
              class="w-full px-4 py-2 bg-[#1a1f3a] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors {errors.subject ? 'border-red-500 focus:border-red-500' : 'border-[#00d9ff]/20 focus:border-[#00d9ff]'}"
              placeholder="Sujet de votre message"
            /> -->
            <LabelInput
              id="subject"
              type="text"
              bind:value={formData.subject}
              placeholder="Sujet de votre message"
              label="Sujet"
            />
            {#if errors.subject}
              <p class="text-red-400 text-sm mt-1">❌ {errors.subject}</p>
            {/if}
          </div>

          <div>
            <!-- <label for="message" class="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              bind:value={formData.message}
              rows="5"
              class="w-full px-4 py-2 bg-[#1a1f3a] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors resize-none {errors.message ? 'border-red-500 focus:border-red-500' : 'border-[#00d9ff]/20 focus:border-[#00d9ff]'}"
              placeholder="Votre message..."
            /> -->
            <LabelInput
              id="message"
              type="text-area"
              bind:value={formData.message}
              placeholder="Votre message..."
              label="Message"
            />
            {#if errors.message}
              <p class="text-red-400 text-sm mt-1">❌ {errors.message}</p>
            {/if}
          </div>

          <!-- <button
            type="submit"
            class="w-full px-6 py-3 bg-[#00d9ff] text-[#0a0e1a] font-semibold rounded-lg hover:bg-[#00c4ff] transition-colors"
          >
            Envoyer
          </button> -->
          <button
            type="submit"
            class="w-full py-3 rounded-lg bg-gradient-to-r from-[#7b2cbf] to-[#00d9ff] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Envoyer
          </button>
        </form>
      </div>

      <!-- Informations -->
      <div class="space-y-8">
        <div class="bg-[#1a1f3a]/50 border border-[#00d9ff]/20 rounded-lg p-6">
          <h3 class="text-xl font-semibold text-[#00d9ff] mb-4">📧 Email</h3>
          <p class="text-gray-300">
            <a
              href="mailto:contact@gamerchallenge.com"
              class="hover:text-[#00d9ff] transition-colors"
            >
              contact@gamerchallenge.com
            </a>
          </p>
          <p class="text-sm text-gray-400 mt-2">
            Nous répondons généralement dans les 48 heures.
          </p>
        </div>

        <div class="bg-[#1a1f3a]/50 border border-[#00d9ff]/20 rounded-lg p-6">
          <h3 class="text-xl font-semibold text-[#00d9ff] mb-4">
            💬 Réseaux sociaux
          </h3>
          <div class="space-y-3 text-gray-300">
            <p>
              Retrouvez-nous sur les réseaux sociaux pour les dernières
              actualités et mises à jour.
            </p>
            <div class="flex gap-4 mt-4">
              <a
                href="https://discord.gg/"
                target="_blank"
                rel="noopener"
                class="text-[#00d9ff] hover:underline">Discord</a
              >
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener"
                class="text-[#00d9ff] hover:underline">Twitter</a
              >
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener"
                class="text-[#00d9ff] hover:underline">Instagram</a
              >
            </div>
          </div>
        </div>

        <div class="bg-[#1a1f3a]/50 border border-[#00d9ff]/20 rounded-lg p-6">
          <h3 class="text-xl font-semibold text-[#00d9ff] mb-4">
            ⏰ Heures de disponibilité
          </h3>
          <div class="space-y-2 text-gray-300 text-sm">
            <p><strong>Lundi - Vendredi:</strong> 9h00 - 18h00</p>
            <p><strong>Samedi - Dimanche:</strong> 10h00 - 16h00</p>
            <p class="text-xs text-gray-400 mt-3">
              Heure d'Europe de l'Ouest (GMT+1)
            </p>
          </div>
        </div>

        <div class="bg-[#1a1f3a]/50 border border-[#00d9ff]/20 rounded-lg p-6">
          <h3 class="text-xl font-semibold text-[#00d9ff] mb-4">
            🚀 Partenariats
          </h3>
          <p class="text-gray-300 text-sm">
            Vous êtes intéressé par un partenariat ? Écrivez-nous avec le sujet
            "Partenariat" pour que nous puissions discuter ensemble.
          </p>
        </div>
      </div>
    </div>

    <!-- FAQ rapide -->
    <div
      class="mt-16 bg-[#1a1f3a]/50 border border-[#00d9ff]/20 rounded-lg p-8"
    >
      <h2 class="text-2xl font-semibold text-[#00d9ff] mb-6">
        Questions fréquentes
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-semibold text-white mb-2">
            Comment signaler un bug ?
          </h4>
          <p class="text-gray-400 text-sm">
            Décrivez le bug en détail dans le formulaire avec le sujet
            "Signalement de bug". Incluez des étapes pour le reproduire.
          </p>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-2">
            Comment envoyer une suggestion ?
          </h4>
          <p class="text-gray-400 text-sm">
            Nous adorons les suggestions ! Utilisez le formulaire avec le sujet
            "Suggestion" pour partager vos idées.
          </p>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-2">
            Quel est le délai de réponse ?
          </h4>
          <p class="text-gray-400 text-sm">
            Nous nous efforçons de répondre à tous les messages dans les 48
            heures maximum.
          </p>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-2">Problème de compte ?</h4>
          <p class="text-gray-400 text-sm">
            Si vous avez un problème d'accès, nous vous aiderons rapidement à le
            résoudre.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Popup de succès -->
{#if showSuccessPopup}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div
      class="bg-[#1a1f3a] border border-[#00d9ff] rounded-lg p-8 max-w-md mx-4 shadow-2xl animate-in"
    >
      <div class="text-center">
        <div class="text-6xl mb-4">🎉</div>
        <h3 class="text-2xl font-bold text-white mb-2">Succès !</h3>
        <p class="text-gray-300 mb-6">
          Votre message a bien été envoyé avec succès !
        </p>
        <p class="text-gray-400 text-sm mb-4">
          Merci de nous avoir contacté. Nous vous répondrons dès que possible.
        </p>
        <div class="w-full bg-[#00d9ff] h-1 rounded-full overflow-hidden">
          <div class="bg-[#00d9ff] h-full w-full animate-shrink"></div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    background-color: #0a0e1a;
  }

  @keyframes shrink {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  :global(.animate-shrink) {
    animation: shrink 5s linear forwards;
  }

  :global(.animate-in) {
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>

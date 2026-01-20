<script>
  // Variables pour l'Inscription
  let regPseudo = "";
  let regEmail = "";
  let regPassword = "";

  // Variables pour la Connexion
  let loginPseudo = "";
  let loginPassword = "";

  // État de la session
  let token = "";
  let userData = null;
  let message = { text: "", type: "" };

  const API_URL = "http://localhost:3000/auth";

  function setNotify(msg, isError = false) {
    message = { text: msg, type: isError ? "error" : "success" };
  }

  // 1. ROUTE : /auth/register
  async function handleRegister() {
    if (!regEmail.includes('@')) return setNotify("Email invalide", true);
    
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          pseudo: regPseudo, 
          email: regEmail, 
          name: regPseudo, // name est requis par ton controller
          password: regPassword 
        })
      });
      const data = await res.json();
      if (res.ok) setNotify("Compte créé pour " + data.pseudo);
      else setNotify(data.message || "Erreur inscription", true);
    } catch (err) {
      setNotify("API inaccessible", true);
    }
  }

  // 2. ROUTE : /auth/login
  async function handleLogin() {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: loginPseudo, password: loginPassword })
      });
      const data = await res.json();
      if (res.ok) {
        token = data.token;
        setNotify("Connexion réussie ! Token stocké.");
      } else {
        setNotify(data.message || "Identifiants incorrects", true);
      }
    } catch (err) {
      setNotify("Erreur serveur", true);
    }
  }

  // 3. ROUTE : /auth/me
  async function fetchMe() {
    try {
      const res = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) userData = data;
      else setNotify("Token invalide ou expiré", true);
    } catch (err) {
      setNotify("Impossible de récupérer le profil", true);
    }
  }
</script>

<main>
  <h1>Gamer Challenges Dashboard</h1>

  {#if message.text}
    <div class="banner {message.type}">{message.text}</div>
  {/if}

  <div class="grid">
    <section class="card">
      <h2>1. Inscription</h2>
      <input type="text" bind:value={regPseudo} placeholder="Pseudo" />
      <input type="email" bind:value={regEmail} placeholder="Email (ex: test@test.com)" />
      <input type="password" bind:value={regPassword} placeholder="Mot de passe" />
      <button class="reg-btn" on:click={handleRegister}>Créer mon compte</button>
    </section>

    <section class="card">
      <h2>2. Connexion</h2>
      <input type="text" bind:value={loginPseudo} placeholder="Pseudo" />
      <input type="password" bind:value={loginPassword} placeholder="Mot de passe" />
      <button class="login-btn" on:click={handleLogin}>Se connecter</button>
    </section>
  </div>

  <section class="card profile-section">
    <h2>3. Vérification du Profil (/auth/me)</h2>
    <div class="status">
      Token : <span>{token ? "✅ Présent" : "❌ Absent (connectez-vous)"}</span>
    </div>
    <button disabled={!token} on:click={fetchMe}>Interroger l'API avec le Token</button>

    {#if userData}
      <div class="user-details">
        <p><strong>ID :</strong> {userData.id}</p>
        <p><strong>Pseudo :</strong> {userData.pseudo || userData.username}</p>
        <p><strong>Rôle :</strong> {userData.role?.name || "Non défini"}</p>
      </div>
    {/if}
  </section>
</main>

<style>
  :global(body) { background-color: #0f172a; color: white; font-family: 'Segoe UI', sans-serif; }
  main { max-width: 900px; margin: 40px auto; padding: 20px; }
  h1 { text-align: center; margin-bottom: 40px; color: #38bdf8; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .card { background: #1e293b; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
  input { display: block; width: 100%; margin-bottom: 15px; padding: 12px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: white; box-sizing: border-box; }
  button { width: 100%; padding: 12px; border-radius: 6px; border: none; font-weight: bold; cursor: pointer; transition: 0.2s; }
  button:disabled { background: #475569; cursor: not-allowed; }
  .reg-btn { background: #0ea5e9; color: white; }
  .login-btn { background: #10b981; color: white; }
  .profile-section { margin-top: 20px; text-align: center; }
  .banner { padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: bold; }
  .success { background: #065f46; border: 1px solid #10b981; }
  .error { background: #7f1d1d; border: 1px solid #ef4444; }
  .user-details { margin-top: 20px; padding: 15px; background: #0f172a; border-radius: 8px; text-align: left; border-left: 4px solid #38bdf8; }
</style>
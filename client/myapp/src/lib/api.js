import ApiError from "./utils/ApiError";

export default async function api(endpoint, method = "GET", body = undefined) {
    const headers = { "Content-Type": "application/json" };
    const token = localStorage.getItem("token");
    // N'ajoute pas Authorization pour les endpoints d'auth
    if (token && !endpoint.startsWith("/auth")) {
        headers.Authorization = `Bearer ${token}`;
    }

    const options = { method, headers };
    if (method !== "GET" && body !== undefined) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, options);

    // Pour DELETE (204 No Content), pas de body JSON
    if (response.status === 204) {
        return null;
    }
    // IMPORTANT : Extraire le JSON AVANT de throw
    const data = await response.json();

    if (!response.ok) {
        const error = new ApiError(data.message || `HTTP error ${response.status}`, data);

        // Déconnexion automatique sur 401 (token expiré)
        if (response.status === 401) {
            throw new ApiError("Unauthorized");
            // clearAuth(); // ← authStore.token = null → UI se met à jour instantanément
        }

        error.status = response.status
        error.data = data
        throw error;
    }

    return data;
}
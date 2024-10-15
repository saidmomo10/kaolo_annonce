// services/auth.ts
import apiClient from './axios';

export const redirectToProvider = async (provider: string) => {
  try {
    const response = await apiClient.get(`/auth/redirect/${provider}`);
    window.location.href = response.request.responseURL;
  } catch (error) {
    console.error("Failed to redirect to OAuth provider:", error);
  }
};


// services/auth.ts (suite)
export const handleProviderCallback = async (provider: string, searchParams: URLSearchParams) => {
    try {
      // Envoyer le code récupéré dans l'URL pour obtenir le token
      const response = await apiClient.get(`/auth/callback/${provider}`, {
        params: {
          code: searchParams.get('code'), // Par exemple pour Google OAuth
          state: searchParams.get('state') // Pour gérer l'état si nécessaire
        }
      });
      
      const token = response.data.token;
      const user = response.data.user;
  
      // Stocker le token et les informations de l'utilisateur
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      return { token, user };
    } catch (error) {
      console.error("OAuth callback error:", error);
      throw error;
    }
  };
  
import axios from 'axios';
import { googleTokenLogin } from 'vue3-google-login';

const backendUrl = import.meta.env.VITE_IMAGE_URL;

const clientHttp = axios.create({
    baseURL: `${backendUrl}/api/`,
    headers: {
        Accept: "application/json",
    }
});

export interface LoginData {
    email: string;
    password: string;
}

export const authService = {
    async login(userdata: LoginData) {
        try {
            const response = await clientHttp.post('auth/login', userdata);
            const { token, user } = response.data.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', user.id);

            return response.data; // Renvoie les données de l'utilisateur
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erreur de connexion");
        }
    },

    async googleLogin() {
        try {
          // Rediriger vers l'endpoint Google de Laravel
          window.location.href = `${backendUrl}/auth/google`;
        } catch (error) {
          throw error;
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
};

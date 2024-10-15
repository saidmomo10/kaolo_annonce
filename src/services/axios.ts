// services/axios.ts
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;


// Configurer l'instance Axios
const apiClient = axios.create({
  baseURL:  `${backendUrl}/api/`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Indispensable pour que Sanctum fonctionne correctement
});

// Intercepteur pour ajouter le token dans les requêtes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;

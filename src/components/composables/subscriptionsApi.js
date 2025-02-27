import { ref } from 'vue';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
export function useSubscription() {
    const token = localStorage.getItem('token');

    const clientHttp = axios.create({
        baseURL: `${backendUrl}/api/`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    const subscriptionData = ref([]);

    // Fonction pour récupérer les données d'abonnement depuis l'API
    const subscription = async () => {
        if (token) {
            try {
                const subscriptionResponse = await clientHttp.get('subscriptions-list');
                if (subscriptionResponse.status === 200) {
                    subscriptionData.value = subscriptionResponse.data;
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Fonction pour activer un abonnement
    async function activateSubscription(id) {
        try {
            const activate = await clientHttp.put(`activateSubscription/${id}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return {
        subscriptionData,
        subscription,
        activateSubscription
    }
}
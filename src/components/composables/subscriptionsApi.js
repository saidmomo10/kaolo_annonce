import { ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

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

    const isLoading = ref(false);
    const error = ref(null);

     // Activer un abonnement via FedaPay
    async function activateSubscription(id) {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await clientHttp.post(`subscriptions/${id}/pay`);
            console.log(response);
            
            if (response.data.payment_url) {
                window.location.href = response.data.payment_url; // Redirection vers FedaPay
            }
            router.push('/');
        } catch (err) {
            error.value = "Erreur lors de l'activation de l'abonnement.";
            console.error("Erreur :", err);
        } finally {
            isLoading.value = false;
        }
    }

    const subscriptionStatut = ref([])
    const subscriptionName = ref([])

    const showSubscription = async () => {
        if (token) {
            try {
                const statusResponse = await clientHttp.get('showSubscription');
                console.log(statusResponse);
                if (statusResponse.status === 200) {
                    subscriptionStatut.value = statusResponse.data.status;
                    subscriptionName.value = statusResponse.data.subscription;
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return {
        subscriptionName,
        subscriptionStatut,
        subscriptionData,
        isLoading,
        error,
        subscription,
        activateSubscription,
        showSubscription
    }
}
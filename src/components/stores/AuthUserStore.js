import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useAuthUserStore = defineStore('AuthUserStore', () => {

    const token = localStorage.getItem('token');

    const clientHttp = axios.create(
        {
            baseURL: `${backendUrl}/api/`,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
    )

    const user = ref({
        name: '',
        email: '',
        // avatar: '',
    });

    const getAuthUser = async () => {
        await clientHttp.get('user')
            .then((response) => {
                user.value = response.data;
            });
    };

    return { user, getAuthUser };
});
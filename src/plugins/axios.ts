import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
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

export default clientHttp;
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useAdStore = defineStore('ad-store', () => {
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

    const ads = ref([])
    const filteredAds = ref([])


    const getAds = async ()=>{
        if (token){
            try{
                // const email = router.currentRoute.params.email;
                const getResponse = await clientHttp.get('livesearch')
        console.log(getResponse);
        
                if(getResponse.status === 200){
                    ads.value = getResponse.data
                    filteredAds.value = ads.value
                }
            } catch(error){
                console.log(error);
                
            }
        }
    }

    // Méthode de filtrage
    // Filtre les annonces en fonction des critères de filtre
    const filter = (query) => {
        filteredAds.value = ads.value.filter(ad => {
            // Filtrage par state (neuf ou usé)
            const matchesstate = query.state.length === 0 || query.state.includes(ad.state.toLowerCase());

            // Filtrage par mode de prix (prix fixe ou négociable)
            const matchesPrice_type = query.price_type.length === 0 || query.price_type.includes(ad.price_type.toLowerCase());

            // Filtrage par plage de prix maximum
            const matchesMaxPrice = ad.price <= query.maxPrice;

            // Filtrage par titre
            const matchesTitle = !query.title || ad.title.toLowerCase().includes(query.title.toLowerCase());

            // Annonce correspondante si elle satisfait tous les critères
            return matchesstate && matchesPrice_type && matchesMaxPrice && matchesTitle;
        });
    };






    const statusData = ref([])
    const showAd = async (id)=>{
        if (token){
            try{
                // const email = router.currentRoute.params.email;
                const statusResponse = await clientHttp.get(`ads/${id}`)
        console.log(statusResponse);
        
                if(statusResponse.status === 200){
                    statusData.value = statusResponse.data
                }
            } catch(error){
                console.log(error);
                
            }
        }
    }

    return{
        ads,
        filteredAds,
        getAds,
        filter,
        showAd,
        statusData
    }

})
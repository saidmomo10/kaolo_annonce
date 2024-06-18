import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useAdStore = defineStore('ad-store', () => {
    const token = localStorage.getItem('token');

    const clientHttp = axios.create(
        {
            baseURL: "http://localhost:8000/api/",
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

    const filter = (query) =>{
        if(query == ''){
            filteredAds.value = ads.value
            return 
        }
        filteredAds.value = ads.value.filter(ad => {
            return (
                ad.title.toLowerCase().includes(query.toLowerCase()) ||
                ad.subcategory.name.toLowerCase().includes(query.toLowerCase()) ||
                ad.state.toLowerCase().includes(query.toLowerCase())
            );
        })
    }



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
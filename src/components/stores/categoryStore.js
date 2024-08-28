import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useCategoryStore = defineStore('category-store', () => {
    const token = localStorage.getItem('token');

    const clientHttp = axios.create(
        {
            baseURL: "https://classifieds-app-back.onrender.com/api/",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
    )

    const categories = ref([])
    const filteredCategories = ref([])

    const categoryAds = ref([])
    const filteredCategoryAds = ref([])


    const getCategories = async ()=>{
        if (token){
            try{
                // const email = router.currentRoute.params.email;
                const getResponse = await clientHttp.get('subcategories')
        console.log(getResponse);
        
                if(getResponse.status === 200){
                    categories.value = getResponse.data
                    filteredCategories.value = categories.value
                }
            } catch(error){
                console.log(error);
                
            }
        }
    }

    const filter = (query) =>{
        if(query == ''){
            filteredCategories.value = categories.value
            return 
        }
        filteredCategories.value = categories.value.filter(category => {
            return (
                category.name.toLowerCase().includes(query.toLowerCase())
            );
        })
    }

    const getAdsCategories = async (id)=>{
        if (token){
            try{
                // const email = router.currentRoute.params.email;
                const response = await clientHttp.get(`subcategories/${id}`)
        console.log(response);
        
                if(response.status === 200){
                    categoryAds.value = response.data
                    filteredCategoryAds.value = categoryAds.value
                }
            } catch(error){
                console.log(error);
                
            }
        }
    }

    const filterAdsCategories = (query) =>{
        if(query == ''){
            filteredCategoryAds.value = categoryAds.value
            return 
        }
        filteredCategoryAds.value = categoryAds.value.filter(categoryAd => {
            return (
                categoryAd.name.toLowerCase().includes(query.toLowerCase())
            );
        })
    }



    // const statusData = ref([])
    // const showcategory = async (id)=>{
    //     if (token){
    //         try{
    //             // const email = router.currentRoute.params.email;
    //             const statusResponse = await clientHttp.get(`categorys/${id}`)
    //     console.log(statusResponse);
        
    //             if(statusResponse.status === 200){
    //                 statusData.value = statusResponse.data
    //             }
    //         } catch(error){
    //             console.log(error);
                
    //         }
    //     }
    // }

    return{
        categories,
        filteredCategories,
        getCategories,
        filter,

        getAdsCategories,
        filterAdsCategories,
        categoryAds,
        filteredCategoryAds
    }

})
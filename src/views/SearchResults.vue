<template>
    <NavBar/>
    <!-- Start Breadcrumbs -->
    <div class="breadcrumbs">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="breadcrumbs-content">
                        <h1 class="page-title">Annonces</h1>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <ul class="breadcrumb-nav">
                        <li>
                            <a href="/guest" v-if="!isLoggedIn">Accueil</a>
                            <a href="/" v-if="isLoggedIn">Accueil</a>
                        </li>
                        <li>Annonces</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Breadcrumbs -->
    <div class="container mt-4">
        <section v-if="ads.length > 0" class="category-page section">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-12">
                    <div class="category-sidebar">
                        <!-- <CheckCondition/>
                        
                        <CategorySide/> -->
                        
                    
                        <!-- End Single Widget -->
                    </div>
                </div>
                <div class="col-12">
                    <div class="category-grid-list">
                        <div class="row">
                            <div class="col-12">
                                <div class="category-grid-topbar">
                                    <div class="row align-items-center">
                                        <div class="col-lg-6 col-md-6 col-12">
                                            <h3 class="title">Résultats de la recherche : "{{ route.query.keyword }}"</h3>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-12">
                                            <nav>
                                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                    <button class="nav-link active" id="nav-grid-tab"
                                                        data-bs-toggle="tab" data-bs-target="#nav-grid" type="button"
                                                        role="tab" aria-controls="nav-grid" aria-selected="true"><i
                                                            class="lni lni-grid-alt"></i></button>
                                                    <button class="nav-link" id="nav-list-tab" data-bs-toggle="tab"
                                                        data-bs-target="#nav-list" type="button" role="tab"
                                                        aria-controls="nav-list" aria-selected="false"><i
                                                            class="lni lni-list"></i></button>
                                                </div>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-content" id="nav-tabContent">
                                    <div class="tab-pane fade show active" id="nav-grid" role="tabpanel"
                                        aria-labelledby="nav-grid-tab">                                        
                                        <div class="row">
                                            
                                            <div class="col-lg-4 col-md-6 col-12" v-for = "ad in ads" :key="ad.id">
                                                <!-- Start Single Item -->
                                                <div class="single-item-grid">
                                                    <div class="image">
                                                        <RouterLink :to="{name: 'adShow', params: {id:ad.id}}"><img :src="getImageUrl(ad.images)" alt="#"></RouterLink>                                                        <i class=" cross-badge lni lni-bolt"></i>
                                                        <span v-if="ad.sold == 'En cours de vente'" class="flat-badge rent">{{ad.sold}}</span>
                                                        <span v-if="ad.sold == 'Vendu'" class="flat-badge sale">{{ad.sold}}</span>                                                    
                                                    </div>
                                                    <div v-if="ad.subcategory" class="content">
                                                        <a href="javascript:void(0)" class="tag">{{ ad.subcategory.name }}</a>
                                                        <h3 class="title">
                                                            <a href="item-details.html">{{ ad.title }}</a>
                                                        </h3>
                                                        <p v-if="ad.department" class="location"><a href="javascript:void(0)"><i class="lni lni-map-marker">
                                                                </i>{{ ad.department.name }}</a></p>
                                                        <ul class="info">
                                                            <li v-if="ad.price" class="price">{{ ad.price }} CFA</li>
                                                            <li v-if="ad.price == null" class="price">À débattre</li>
                                                            <li class="like"><a href="javascript:void(0)"><i
                                                                        class="lni lni-heart"></i></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <!-- End Single Item -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-list" role="tabpanel"
                                        aria-labelledby="nav-list-tab">
                                        <div class="row">
                                            <div class="col-lg-12 col-md-12 col-12" v-for = "ad in ads" :key="ad.id">
                                                <div class="single-item-grid">
                                                    <div class="row align-items-center">
                                                        <div class="col-lg-5 col-md-7 col-12">
                                                            <div class="image">
                                                                <RouterLink :to="{name: 'adShow', params: {id:ad.id}}"><img :src="getImageUrl(ad.images)" alt="#"></RouterLink>
                                                                <i class=" cross-badge lni lni-bolt"></i>
                                                                <span v-if="ad.sold == 'En cours de vente'" class="flat-badge rent">{{ad.sold}}</span>
                                                                <span v-if="ad.sold == 'Vendu'" class="flat-badge sale">{{ad.sold}}</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-7 col-md-5 col-12">
                                                            <div v-if="ad.subcategory" class="content">
                                                                <a href="javascript:void(0)" class="tag">{{ ad.subcategory.name }}</a>
                                                                <h3 class="title">
                                                                    <a href="item-details.html">{{ ad.title }}</a>
                                                                </h3>
                                                                <p class="location"><a href="javascript:void(0)"><i
                                                                            class="lni lni-map-marker">
                                                                        </i>San Francisco</a></p>
                                                                <ul class="info">
                                                                    <li v-if="ad.price" class="price">Prix: {{ ad.price }} CFA</li>
                                                                    <li v-if="ad.price == null" class="price">Prix: À débattre</li>
                                                                    <li class="like"><a href="javascript:void(0)"><i
                                                                                class="lni lni-heart"></i></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="row">
                                            <div class="col-12">
                                                <div class="pagination left">
                                                    <ul class="pagination-list">
                                                        <li v-if="previousPage"><a @click="fetchPrevAds(previousPage)" href="javascript:void(0)"><i class="lni lni-chevron-left"></i></a></li>
                                                        <li v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: currentPage === pageNumber }">
                                                            <a @click="fetchPageAds(pageNumber)" href="javascript:void(0)">{{ pageNumber }}</a>
                                                        </li>
                                                        <li v-if="nextPage"><a @click="fetchNextAds(nextPage)" href="javascript:void(0)"><i class="lni lni-chevron-right"></i></a></li>
                                                    </ul>
                                                </div>
                                                
                                            </div>
                                        </div> -->
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        <div v-else>
        <p>Aucune annonce trouvée.</p>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { authService } from '../services/authService';

const isLoggedIn = computed(() => authService.isAuthenticated());

const route = useRoute()
const keyword = route.query.keyword || ''
const ads = ref<any[]>([])

const backendUrl = import.meta.env.VITE_BACKEND_URL
const imageUrl = import.meta.env.VITE_IMAGE_URL

const clientHttp = axios.create({
baseURL: `${backendUrl}/api/`,
headers: {
    Accept: 'application/json',
}
})

onMounted(() => {
if (keyword) {
    clientHttp.get('/live', { params: { keyword } })
    .then(res => ads.value = res.data)
    .catch(err => console.error(err))
}
})

const getImageUrl = (images: any[]) => {
if (images && images.length > 0) {
    return `${imageUrl}/storage/` + images[0].path
}
return ''
}
</script>
  
  <style scoped>
  .item-image {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .item-image img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
  }
  </style>
  
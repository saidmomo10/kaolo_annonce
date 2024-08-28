<!-- eslint-disable vue/no-parsing-error -->
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
                        <li><a href="index.html">Accueil</a></li>
                        <li>Annonces</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Breadcrumbs -->

    <!-- Start Items Listing Grid -->
    <section class="category-page section">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-12">
                    <div class="category-sidebar">
                        <!-- Start Single Widget -->
                        <!-- <div class="single-widget search">
                            <h3>Search Ads</h3>
                                <form action="">
                                    <input v-model="query" @keyup.enter = "search()" type="text" placeholder="Search Here...">
                                <button @click="search()" type="button"><i class="lni lni-search-alt"></i></button>
                                </form>
                        </div> -->
                        <SearchAds/>
                        <!-- End Single Widget -->
                        <!-- Start Single Widget -->
                        <CategorySide/>
                        <!-- End Single Widget -->
                        <!-- Start Single Widget -->
                        <div class="single-widget range">
                            <h3>Price Range</h3>
                            <input type="range" class="form-range" name="range" step="1" min="100" max="10000"
                                value="10" onchange="rangePrimary.value=value">
                            <div class="range-inner">
                                <label>F</label>
                                <input type="text" id="rangePrimary" placeholder="100" />
                            </div>
                        </div>
                        <!-- End Single Widget -->
                        <!-- Start Single Widget -->
                        <CheckCondition/>
                        <!-- End Single Widget -->
                        <!-- Start Single Widget -->
                        <div class="single-widget banner">
                            <h3>Advertisement</h3>
                            <a href="javascript:void(0)">
                                <img src="" alt="#">
                            </a>
                        </div>
                        <!-- End Single Widget -->
                    </div>
                </div>
                <div class="col-lg-9 col-md-8 col-12">
                    <div class="category-grid-list">
                        <div class="row">
                            <div class="col-12">
                                <div class="category-grid-topbar">
                                    <div class="row align-items-center">
                                        <div class="col-lg-6 col-md-6 col-12">
                                            <h3 class="title">Showing 1-12 of 21 ads found</h3>
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
                                            <div class="col-lg-4 col-md-6 col-12" v-for = "ad in adStore.filteredAds" :key="ad.id">
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
                                                        <p class="location"><a href="javascript:void(0)"><i class="lni lni-map-marker">
                                                                </i>Boston</a></p>
                                                        <ul class="info">
                                                            <li class="price">{{ ad.price }}</li>
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
                                            <div class="col-lg-12 col-md-12 col-12" v-for = "ad in adStore.filteredAds" :key="ad.id">
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
                                                                    <li class="price">{{ ad.price }}</li>
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
    <!-- End Items Listing Grid -->
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import {ref, onMounted} from 'vue';
import SearchAds from '@/components/SearchAds.vue';
import CategorySide from '@/components/CategorySide.vue';
import CheckCondition from '@/components/CheckCondition.vue'
import { RouterLink } from 'vue-router'
// import useAds from '../components/composables/adsApi'

import { useAdStore } from '../components/stores/adStore.js'
const adStore = useAdStore()
adStore.getAds()





// const {nextPage,
//         previousPage,
//         currentPage,
//         totalPages,
//         statusData,
//         fetchPageAds,
//         fetchNextAds,
//         fetchPrevAds,
//         filteredAds,
//         status} = useAds()
// onMounted(fetchPrevAds)
// onMounted(fetchNextAds)
// onMounted(fetchPageAds)
// onMounted(status)
// const { getAds, filter, filteredAds } = useAds()
// onMounted(getAds)
// onMounted(filter)





const getImageUrl = (images: string) => {
  if (images && images.length > 0) {
    return 'https://classifieds-app-back.onrender.com/storage/' + images[0].path;
  }
  return ''; // Ou une image par défaut si aucune image n'est disponible
};



</script>
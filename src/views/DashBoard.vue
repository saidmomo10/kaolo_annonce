<template>
    <NavBar/>
    <!-- Start Breadcrumbs -->
    <div class="breadcrumbs">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="breadcrumbs-content">
                        <h1 class="page-title">My Ads</h1>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <ul class="breadcrumb-nav">
                        <li><a href="index.html">Home</a></li>
                        <li>My Ads</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Breadcrumbs -->

    
    <section class="dashboard section">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-12">
                    <!-- Start Dashboard Sidebar -->
                    <DashboardSidebar/>
                    <!-- Start Dashboard Sidebar -->
                </div>
                <div class="col-lg-9 col-md-8 col-12">
                    <div class="main-content">
                        <!-- Start Details Lists -->
                        <div class="details-lists">
                            <div class="row">
                                <div class="col-lg-4 col-md-4 col-12">
                                    <!-- Start Single List -->
                                    <div class="single-list">
                                        <div class="list-icon">
                                            <i class="lni lni-checkmark-circle"></i>
                                        </div>
                                        <h3 v-if="myAdsData.all">
                                            {{ myAdsData.all.length }}
                                            <span>Annonces totales</span>
                                        </h3>
                                    </div>
                                    <!-- End Single List -->
                                </div>
                                <div class="col-lg-4 col-md-4 col-12">
                                    <!-- Start Single List -->
                                    <div class="single-list two">
                                        <div class="list-icon">
                                            <i class="lni lni-bolt"></i>
                                        </div>
                                        <h3 v-if="myAdsData.all">
                                            {{ myAdsData.sale.length }}
                                            <span>Featured Ads </span>
                                        </h3>
                                    </div>
                                    <!-- End Single List -->
                                </div>
                                <div class="col-lg-4 col-md-4 col-12">
                                    <!-- Start Single List -->
                                    <div class="single-list three">
                                        <div class="list-icon">
                                            <i class="lni lni-emoji-sad"></i>
                                        </div>
                                        <h3>
                                            45
                                            <span>Expired Ads </span>
                                        </h3>
                                    </div>
                                    <!-- End Single List -->
                                </div>
                            </div>
                        </div>
                        <!-- End Details Lists -->
                        <div class="row">
                            <div class="col-lg-6 col-md-12 col-12">
                                <!-- Start Recent Items -->
                                <div class="recent-items dashboard-block">
                                    <h3 class="block-title">Recent Ads</h3>
                                    <ul>
                                        <li>
                                            <div class="image">
                                                <a href="javascript:void(0)"><img src="" alt="#"></a>
                                            </div>
                                            <a href="javascript:void(0)" class="title">iPhone 11 Pro Max</a>
                                            <span class="time">12 Minutes Ago</span>
                                            <span class="remove"><a href="javascript:void(0)"><i class="lni lni-close"></i></a></span>
                                        </li>
                                        <li>
                                            <div class="image">
                                                <a href="javascript:void(0)"><img src="" alt="#"></a>
                                            </div>
                                            <a href="javascript:void(0)" class="title">Polaris 600 Assault 144</a>
                                            <span class="time">5 days Ago</span>
                                            <span class="remove"><a href="javascript:void(0)"><i class="lni lni-close"></i></a></span>
                                        </li>
                                        <li>
                                            <div class="image">
                                                <a href="javascript:void(0)"><img src="" alt="#"></a>
                                            </div>
                                            <a href="javascript:void(0)" class="title">Brand New Bagpack</a>
                                            <span class="time">1 week Ago</span>
                                            <span class="remove"><a href="javascript:void(0)"><i class="lni lni-close"></i></a></span>
                                        </li>
                                        <li>
                                            <div class="image">
                                                <a href="javascript:void(0)"><img src="" alt="#"></a>
                                            </div>
                                            <a href="javascript:void(0)" class="title">Honda Civic VTi 2023</a>
                                            <span class="time">3 week Ago</span>
                                            <span class="remove"><a href="javascript:void(0)"><i class="lni lni-close"></i></a></span>
                                        </li>
                                    </ul>
                                </div>
                                <!-- End Recent Items -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Dashboard Section -->
    <!-- <FooterComponent/> -->

</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
// import FooterComponent from '@/components/FooterComponent.vue';
import DashboardSidebar from '@/components/DashboardSidebar.vue'
import {ref, onMounted, computed} from 'vue'
import {useAds} from '../components/composables/adsApi'

const { myAds, myAdsData } = useAds()
const loading = ref(false);
onMounted(async () => {
    loading.value = true; // Set loading to true before fetching data
    await myAds(); // Fetch data
    loading.value = false; // Set loading to false after data is fetched
});

</script>
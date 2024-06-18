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

    <!-- Start Dashboard Section -->
    <section class="dashboard section">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-12 col-12">
                    <!-- Start Dashboard Sidebar -->
                    <DashboardSidebar/>
                    <!-- Start Dashboard Sidebar -->
                </div>
                <div class="col-lg-9 col-md-12 col-12">
                    <div class="main-content">
                        <div class="dashboard-block mt-0">
                            <div class="row">
                                <h3 class="block-title">Mes annonces</h3>
                                <!-- <AvatarImage/>    -->
                            </div>

                            <nav class="list-nav">
                                <ul>
                                    <li :class="{ active: isAllActive }"><button @click="showAll">Tout</button></li>
                                    <li :class="{ active: isSoldActive }"><button @click="showOnSale">En vente</button></li>
                                    <li :class="{ active: isBuyActive }"><button @click="showSale">Vendus</button></li>
                                    <!-- <li><button >Featured <span>12</span></button></li>
                                    <li><button >Sold <span>02</span></button></li>
                                    <li><button >Active <span>45</span></button></li>
                                    <li><button >Expired <span>55</span></button></li> -->
                                </ul>
                            </nav>
                            <!-- Start Items Area -->
                            <div v-show="currentSection === 'AllItems'" class="my-items">
                                <AllItems/>
                            </div>
                            <div v-show="currentSection === 'Sale'" class="my-items">
                                <Sale/>
                            </div>
                            <div v-show="currentSection === 'OnSale'" class="my-items">
                                <OnSale/>
                            </div>
                            <!-- End Items Area -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Dashboard Section -->


</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import DashboardSidebar from '@/components/DashboardSidebar.vue'
import OnSale from '../components/OnSale.vue';
import AllItems from '../components/AllItems.vue';
import Sale from '../components/Sale.vue'
import NotificationComponent from '../components/NotificationComponent.vue'
import AvatarImage from '../components/AvatarImage.vue'
import { ref } from 'vue';

const isAllActive = ref(true); // Par défaut, "All Ads" est actif
const isSoldActive = ref(false); // "Sold" est inactif par défaut
const isBuyActive = ref(false)

// Méthodes pour changer de section
const showAll = () => {
    currentSection.value = 'AllItems';
    isAllActive.value = true;
    isSoldActive.value = false;
    isBuyActive.value = false;
}

const showOnSale = () => {
    currentSection.value = 'OnSale';
    isAllActive.value = false;
    isSoldActive.value = true;
    isBuyActive.value = false;

}

const showSale = () => {
    currentSection.value = 'Sale';
    isAllActive.value = false;
    isSoldActive.value = false;
    isBuyActive.value = true;

}

// Définition des sections
const currentSection = ref('AllItems');


</script>
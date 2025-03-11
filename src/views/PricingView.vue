<template>
    <NavBar/>
    <!-- Start Breadcrumbs -->
    <div class="breadcrumbs">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="breadcrumbs-content">
                        <h1 class="page-title">Pricing Table</h1>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <ul class="breadcrumb-nav">
                        <li><a href="index.html">Home</a></li>
                        <li>Pricing</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Breadcrumbs -->

    <!-- Start Pricing Table Area -->
    <section class="pricing-table section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <h2 class="wow fadeInUp" data-wow-delay=".4s">Pricing Plan</h2>
                        <p class="wow fadeInUp" data-wow-delay=".6s">There are many variations of passages of Lorem
                            Ipsum available, but the majority have suffered alteration in some form.</p>
                    </div>
                </div>
            </div>
            <div v-if = "subscriptionData" class="row">
                <div  v-for = "sub in subscriptionData" class="col-lg-4 col-md-6 col-12">
                    <!-- Single Table -->
                    <div class="single-table wow fadeInUp" data-wow-delay=".2s">
                        <!-- Table Head -->
                        <div class="table-head">
                            <div class="price">
                                <h2 class="amount">${{ sub.price }}<span class="duration">/ Month</span></h2>
                            </div>
                            <h4 class="title">{{ sub.name }}</h4>
                        </div>
                        <!-- End Table Head -->
                        <!-- Table List -->
                        <ul class="table-list">
                            <li>{{ sub.duration }}</li>
                            <li>{{ sub.description }}</li>
                            <li>Image Gallery</li>
                            <li>30 Days Availablity</li>
                            <li>Non-Featured</li>
                            <li>Business Tagline</li>
                        </ul>
                        <!-- End Table List -->
                        <!-- Table Bottom -->
                            <div class="button">
                                <button @click="activateSubscription(sub.id)" class="btn">Activate</button>                            </div>
                        <!-- End Table Bottom -->
                    </div>
                    <!-- End Single Table-->
                </div>
                <!-- <div class="col-lg-4 col-md-6 col-12">
                    
                    <div class="single-table wow fadeInUp" data-wow-delay=".4s">
                        
                        <div class="table-head">
                            <div class="price">
                                <h2 class="amount">$59<span class="duration">/ Month</span></h2>
                            </div>
                            <h4 class="title">Standard</h4>
                        </div>
                        
                        
                        <ul class="table-list">
                            <li>One Listing</li>
                            <li>Contact Display</li>
                            <li>Image Gallery</li>
                            <li>60 Days Availablity</li>
                            <li>Non-Featured</li>
                            <li>Business Tagline</li>
                        </ul>
                        
                        <div class="button">
                            <a class="btn" href="javascript:void(0)">Select Plan</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="single-table wow fadeInUp" data-wow-delay=".6s">
                        <div class="table-head">
                            <div class="price">
                                <h2 class="amount">$99<span class="duration">/ Month</span></h2>
                            </div>
                            <h4 class="title">Premium</h4>
                        </div>
                        <ul class="table-list">
                            <li>One Listing</li>
                            <li>Contact Display</li>
                            <li>Image Gallery</li>
                            <li>90 Days Availablity</li>
                            <li>Non-Featured</li>
                            <li>Business Tagline</li>
                        </ul>
                        <div class="button">
                            <a class="btn" href="javascript:void(0)">Select Plan</a>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </section>
    <!--/ End Pricing Table Area -->
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import {ref, onMounted} from 'vue'
import { useSubscription } from '../components/composables/subscriptionsApi'


const { subscriptionData, subscription, activateSubscription } = useSubscription()
onMounted(subscription);
</script>
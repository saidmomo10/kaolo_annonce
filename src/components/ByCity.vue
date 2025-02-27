<template>
    <!-- Start Browse Cities Area -->
    <section class="browse-cities section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <h2 class="wow fadeInUp" data-wow-delay=".4s">Browse By Cities</h2>
                        <p class="wow fadeInUp" data-wow-delay=".6s">There are many variations of passages of Lorem
                            Ipsum available, but the majority have suffered alteration in some form.</p>
                    </div>
                </div>
            </div>
            <div class="row ">
                <div v-for="dept in departments" :key="dept" class="col-lg-4 col-md-4 col-12">
                    <!-- Start Single City -->
                    <div class="single-city wow fadeInUp" data-wow-delay=".2s">
                        <router-link :to="'/annonces/' + dept">
                            <div class="image">
                                <img src="../assets/images/hero/hero-bg.jpg" alt="#">
                            </div>
                            <div class="content">
                                <h4 class="name">
                                    {{ dept }}
                                    <span>155 Ads</span>
                                </h4>
                            </div>
                            <div class="more-btn">
                                <i class="lni lni-circle-plus"></i>
                            </div>
                        </router-link>
                    </div>
                    <!-- Start Single City -->
                </div>
            </div>
        </div>
    </section>
    <!-- /End Browse Cities Area -->
</template>

<script setup lang="ts">
const departments = [
  "Atlantique", "Atacora", "Borgou", "Ouémé", "Zou"
];
</script>
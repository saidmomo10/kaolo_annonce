<template>
    <NavBar/>
    <!-- Start Breadcrumbs -->
    <div class="breadcrumbs">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="breadcrumbs-content">
                        <h1 class="page-title">Catégories</h1>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <ul class="breadcrumb-nav">
                        <li><a href="index.html">Accueil</a></li>
                        <li>Catégories</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Breadcrumbs -->


    <section class="cat section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <h2 class="wow fadeInUp" data-wow-delay=".4s">Catégories</h2>
                        <p class="wow fadeInUp" data-wow-delay=".6s">There are many variations of passages of Lorem
                            Ipsum available, but the majority have suffered alteration in some form.</p>
                    </div>
                </div>
            </div>
            <SearchCategories/>
            <div class="row">
                <div class="col-lg-12">
                    <div class="choose-content">
                        <div class="row">
                            <div v-for = "category in categoryStore.filteredCategories" :key="category.id" class="col-lg-4 col-md-6 col-12">
                                <!-- Start Single List -->
                                <RouterLink :to="{ name: 'categoryShow', params: { id: category.id }}">
                                    <div class="single-list wow fadeInUp" data-wow-delay=".4s">
                                        <img :src="getImageUrl(category.icone)" :alt="category.name" width="60px">
                                        <h4>{{ category.name }}</h4>
                                    </div>
                                </RouterLink>
                                <!-- Start Single List -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';
import SearchCategories from '@/components/SearchCategories.vue';
import WOW from 'wow.js';

import { useCategoryStore } from '../components/stores/categoryStore.js'

const categoryStore = useCategoryStore()
categoryStore.getCategories()
categoryStore.getAdsCategories()

 const getImageUrl = (icone: string) =>{
    // Implémentez votre fonction getImageUrl ici
    // Par exemple, si les images ont des chemins relatifs, vous pouvez les préfixer avec une URL de base
    return `http://localhost:8000/storage/${icone}`;
}

// const getImageUrl = (images: string) => {
//   if (images && images.length > 0) {
//     return 'http://localhost:8000/storage/' + images[0].path;
//   }
//   return ''; // Ou une image par défaut si aucune image n'est disponible
// };

onMounted(() => {
    new WOW().init();
});

</script>

<style>
.cat .choose-image img {
  height: 100%;
  width: 100%;
}

.cat .choose-content .title {
  font-size: 32px;
  margin-bottom: 20px;
  line-height: 45px;
  text-transform: capitalize;
  position: relative;
  font-weight: 600;
  padding-bottom: 20px;
}

.cat .choose-content .single-list {
  position: relative;
  margin-top: 30px;
  padding: 40px;
  cursor: pointer;
  /* background-color: #f9f9f9; */
  text-align: center;
  border-radius: 6px;
}

.cat .choose-content .single-list:hover {
  border: 1px solid #e4e4e4;
}

/* .cat .choose-content .single-list i {
  color: #5830E0;
  font-size: 25px;
  display: inline-block;
  margin-bottom: 30px;
  height: 70px;
  width: 0px;
  line-height: 62px;
  text-align: center;
  border-radius: 50%;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
  background-color: #5830E0;
  color: #fff;
  border: 4px solid transparent;
} */

.cat .choose-content .single-list:hover i {
  color: #5830E0;
  background-color: transparent;
  border-color: #5830E0;
}

.cat .choose-content .single-list h4 {
  font-size: 20px;
  font-weight: 600;
  display: block;
  margin-bottom: 15px;
}

.cat .choose-content .single-list p {
  font-size: 16px;
}
</style>
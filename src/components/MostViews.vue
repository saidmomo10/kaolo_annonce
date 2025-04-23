<template>
    <!-- Start Items Grid Area -->
    <section class="items-grid section custom-padding">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <h2 class="wow fadeInUp" data-wow-delay=".4s">Annonces Populaires</h2>
                    </div>
                </div>
            </div>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-grid" role="tabpanel"
                    aria-labelledby="nav-grid-tab">
                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-12" v-for = "ad in mostVisitedAds" :key="ad.id">
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
                                            </i>{{ ad.city.name }}, {{ ad.department.name }}</a></p>
                                    <ul class="info">
                                        <li v-if="ad.price !== null" class="price">{{ ad.price }} CFA</li>
                                        <li v-if="ad.price == null" class="price">{{ ad.price_type }}</li>
                                        <li class="like">{{ ad.views }} vues</li>
                                    </ul>
                                </div>
                            </div>
                            <!-- End Single Item -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import {useAds} from '../components/composables/adsApi'
import {ref, onMounted} from 'vue';
import { DateTime } from "luxon";


const { getMostVisitedAds, mostVisitedAds } = useAds()
onMounted(getMostVisitedAds)

const imageUrl = import.meta.env.VITE_IMAGE_URL
interface AdImage {
    path: string;
    }

    // Fonction pour obtenir l'URL de l'image
    const getImageUrl = (images: AdImage[]) => {
        if (images && images.length > 0) {
            return `${imageUrl}/storage/` + images[0].path;
        }
        return ''; // Ou une image par défaut si aucune image n'est disponible
    };

// Convertir la date en relatif avec Luxon
const fromNow = (date: string) => {
  return DateTime.fromISO(date).setLocale("fr").toRelative();
};

</script>
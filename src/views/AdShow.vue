<template>
    <NavBar/>
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
    <!-- Start Item Details -->
    <section class="item-details section">
        <div class="container" >
            
            <div class="top-area">
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-12">
                        <div class="product-images">
                            <main id="gallery">
                                <div class="main-img">
                                    <img :src="editData.images && editData.images.length > 0 ? getImageUrl(editData.images[0]) : ''" id="current" alt="#">
                                </div>
                                
                                <div class="images">
                                    <!-- <div v-for="(image, index) in editData.images" :key="index" class="images">
                                        <img :src="getImageUrl(image)" alt="" style="width: 100px;">
                                    </div> -->

                                        <div v-for="(image, index) in editData.images"
                                            :key="index" class="column">
                                            <a data-fancybox="gallery" :href="getImageUrl(image)"><img class="img-responsive" :src="getImageUrl(image)" alt="#" /></a>
                                        </div>
                                        
                                </div>
                                
                                
                            </main>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12 col-12">
                        <div class="product-info">
                            <h2 class="title">{{ editData.title }}</h2>
                            <p class="location"><i class="lni lni-map-marker"></i>{{ editData.department }}, {{ editData.city }}</p>
                            <h3 class="price">{{ editData.price }}</h3>
                            
                            <div class="list-info">
                                <div v-if="editData.user">
                                    <div v-if="userData.id == editData.user.id && editData.sold == 'En cours de vente'">
                                        <button id="bt" class="button btn"  @click="handleUpdateStatus">Marquer comme vendu</button>
                                    </div>
                                    <!-- <div v-if="userData.id == statusData.user.id && statusData.ad.sold == 'En cours de vente'">
                                        <button  @click="handleUpdateStatus">Modifier</button>
                                    </div> -->
                                </div>
                                <ul>
                                    <li><span>Condition:</span>{{ editData.state }}</li>
                                    <li><span>Livraison:</span>{{ editData.delivery_status }}</li>
                                    <li><span>Model:</span> Mackbook Pro</li>
                                </ul>
                            </div>
                            <div class="contact-info">
                                <ul>
                                    <li>
                                        <a href="tel:+002562352589" class="call">
                                            <i class="lni lni-phone-set"></i>
                                            {{ editData.phone }}
                                            <span>Call & Get more info</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:{{ editData.user.email }}" class="mail">
                                            <i class="lni lni-envelope"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="social-share">
                                <h4>Share Ad</h4>
                                <ul>
                                    <li><a href="javascript:void(0)" class="facebook"><i class="lni lni-facebook-filled"></i></a></li>
                                    <li><a href="javascript:void(0)" class="twitter"><i class="lni lni-twitter-original"></i></a></li>
                                    <li><a href="javascript:void(0)" class="google"><i class="lni lni-google"></i></a></li>
                                    <li><a href="javascript:void(0)" class="linkedin"><i class="lni lni-linkedin-original"></i></a></li>
                                    <li><a href="javascript:void(0)" class="pinterest"><i class="lni lni-pinterest"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-details-blocks">
                <div class="row">
                    <div class="col-lg-8 col-md-7 col-12">
                        <!-- Start Single Block -->
                        <div class="single-block description">
                            <h3>Description</h3>
                            <p>
                                {{ editData.description }}
                            </p>
                        </div>
                        <!-- End Single Block -->
                        <!-- Start Single Block -->
                        <div class="single-block tags">
                            <h3>Tags</h3>
                            <ul>
                                <li><a href="javascript:void(0)">Bike</a></li>
                                <li><a href="javascript:void(0)">Services</a></li>
                                <li><a href="javascript:void(0)">Brand</a></li>
                                <li><a href="javascript:void(0)">Popular</a></li>
                            </ul>
                        </div>
                        <!-- End Single Block -->
                        <!-- Start Single Block -->
                        <div class="single-block comments">
                            <h3>Commentaires</h3>
                            <!-- Start Single Comment -->
                            <div class="single-comment">
                                <div v-for="commentaire in comment" :key="commentaire.id" class="content">
                                    <h4>{{ commentaire.user.name }}</h4>
                                    <!-- <span>25 Feb, 2023</span> -->
                                    <span>
                                        {{ commentaire.comment }}
                                    </span>
                                    <span>{{ fromNow(commentaire.created_at) }}</span>
                                    <!-- <a href="javascript:void(0)" class="reply"><i class="lni lni-reply"></i> Reply</a> -->
                                </div>
                            </div>
                            <!-- End Single Comment -->
                        </div>
                        <!-- End Single Block -->
                        <!-- Start Single Block -->
                        <div class="single-block comment-form">
                            <h3>Poster un commentaire</h3>
                            <form @submit.prevent = "handleAddComment" action="#">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-box form-group">
                                            <textarea v-model="formData.comment" name="#" class="form-control form-control-custom"
                                                placeholder="Votre Commentaire"></textarea>
                                        </div>
                                        <!-- <input type="hidden" name="user_id" v-model="formData.user_id"> -->
                                    </div>
                                    <div class="col-12">
                                        <div class="button">
                                            <button type="submit" class="btn">Envoyer</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- End Single Block -->
                    </div>
                    <div class="col-lg-4 col-md-5 col-12">
                        <div class="item-details-sidebar">
                            <!-- Start Single Block -->
                            <div class="single-block author">
                                <h3>Auteur</h3>
                                <div v-if="editData.user" class="content">
                                    <img :src="editData.user.avatar" alt="Avatar utilisateur" class="rounded-full w-16 h-16" width="60%">
                                    <h4>{{ editData.user.name }}</h4>
                                    <span>Membre depuis {{ formatDate(editData.user.created_at) }}</span>
                                    <a href="javascript:void(0)" class="see-all">Voir ses annonces</a>
                                </div>
                            </div>
                            
                            <!-- End Single Block -->
                            <!-- Start Single Block -->
                            <div class="single-block contant-seller comment-form ">
                                <h3>Contact Seller</h3>
                                <form action="#" method="POST">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-box form-group">
                                                <input type="text" name="name" class="form-control form-control-custom"
                                                    placeholder="Your Name" />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-box form-group">
                                                <input type="email" name="email"
                                                    class="form-control form-control-custom" placeholder="Your Email" />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-box form-group">
                                                <textarea name="#" class="form-control form-control-custom"
                                                    placeholder="Your Message"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="button">
                                                <button type="submit" class="btn">Send Message</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <!-- End Single Block -->
                            <!-- Start Single Block -->
                            <!-- <div class="single-block ">
                                <h3>Location</h3>
                                <div class="mapouter">
                                    <div class="gmap_canvas"><iframe width="100%" height="300" id="gmap_canvas"
                                            src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                            frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a
                                            href="https://putlocker-is.org"></a><br>
                                        <style>
                                            .mapouter {
                                                position: relative;
                                                text-align: right;
                                                height: 300px;
                                                width: 100%;
                                            }
                                        </style><a href="https://www.embedgooglemap.net">google map code for website</a>
                                        <style>
                                            .gmap_canvas {
                                                overflow: hidden;
                                                background: none !important;
                                                height: 300px;
                                                width: 100%;
                                            }
                                        </style>
                                    </div>
                                </div>
                            </div> -->
                            <!-- End Single Block -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Item Details -->

</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import {ref, onMounted} from 'vue';
import { DateTime } from "luxon";

import { useRoute } from 'vue-router';
import {useAds} from '../components/composables/adsApi'

import Lightgallery from 'lightgallery/vue';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

// Import CSS files for lightGallery
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';

const imageUrl = import.meta.env.VITE_IMAGE_URL


const plugins = ref([lgThumbnail, lgZoom]);

const onInit = () => {
console.log('lightGallery has been initialized');
};

const onBeforeSlide = () => {
console.log('calling before slide');
};

const route = useRoute()

const {showAd, editData, comment, commentData, updateStatus, userData, getUser, formData, addComment,getComment} = useAds()
const index = ref(null);

onMounted(() => {
    const adId = Number(route.params.id); // Récupère l'ID depuis l'URL
    showAd(adId); // Appelle la fonction pour récupérer l'annonce
});

onMounted(getUser);
onMounted(getComment)

function handleUpdateStatus(){
    updateStatus(Number(route.params.id))
}
const handleAddComment = async() =>{
    await addComment(Number(route.params.id))


}

const getImageUrl = (image: any) => {
    if (image && image.path) {
        return `${imageUrl}/storage/` + image.path;
    }
    return ''; // Ou une URL par défaut si aucune image n'est disponible
};

const getAvatarUrl = (avatar: string) =>{
    // Implémentez votre fonction getImageUrl ici
    // Par exemple, si les images ont des chemins relatifs, vous pouvez les préfixer avec une URL de base
    return `${imageUrl}/storage/${avatar}`;
}

const formatDate = (date: string) => {
  return DateTime.fromISO(date).setLocale("fr").toFormat("dd/MM/yyyy HH:mm");
};

// Convertir la date en relatif avec Luxon
const fromNow = (date: string) => {
  return DateTime.fromISO(date).setLocale("fr").toRelative();
};


</script>

<style scoped>
#bt {
  /* text-transform: ; */
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 500;
  padding: 15px 30px;
  background-color: #222222;
  color: #fff;
  border: none;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  border-radius: 4px;
}

#bt:hover {
    background-color: #ff8c00;
    color: #fff;
}
</style>
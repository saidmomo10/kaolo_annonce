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
                                There are many variations of passages of Lorem Ipsum available, but the majority have
                                suffered alteration in some form, by injected humour, or randomised words which don't
                                look even slightly believable.
                            </p>
                            <ul>
                                <li>Model: Apple MacBook Pro 13.3-Inch MYDA2</li>
                                <li>Apple M1 chip with 8-core CPU and 8-core GPU</li>
                                <li>8GB RAM</li>
                                <li>256GB SSD</li>
                                <li>13.3-inch 2560x1600 LED-backlit Retina Display</li>
                            </ul>
                            <p>The generated Lorem Ipsum is therefore always free from repetition, injected humour, or
                                non-characteristic words etc.</p>
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
                            <h3>Comments</h3>
                            <!-- Start Single Comment -->
                            <div class="single-comment">
                                <div v-for="commentaire in comment" :key="commentaire.id" class="content">
                                    <h4>{{ commentaire.user.name }}</h4>
                                    <!-- <span>25 Feb, 2023</span> -->
                                    <span>
                                        {{ commentaire.comment }}
                                    </span>
                                    <span>{{moment(commentaire.created_at).fromNow()}}</span>
                                    <!-- <a href="javascript:void(0)" class="reply"><i class="lni lni-reply"></i> Reply</a> -->
                                </div>
                            </div>
                            <!-- End Single Comment -->
                        </div>
                        <!-- End Single Block -->
                        <!-- Start Single Block -->
                        <div class="single-block comment-form">
                            <h3>Post a comment</h3>
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
                                <h3>Author</h3>
                                <div v-if="editData.user" class="content">
                                    <img src="" alt="#">
                                    <h4>{{ editData.user.name }}</h4>
                                    <span>Member Since {{ editData.user.created_at }}</span>
                                    <a href="javascript:void(0)" class="see-all">See All Ads</a>
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
import moment from 'moment';
import { useRoute } from 'vue-router';
import {useAds} from '../components/composables/adsApi'

import Lightgallery from 'lightgallery/vue';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

// Import CSS files for lightGallery
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';



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
    const intervalId = setInterval(() => {
        showAd(route.params.id); // Appeler la fonction showAd avec le bon paramètre
    }, 2000); // Exécuter toutes les 2 secondes

    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage du composant
});

onMounted(getUser);
onMounted(getComment)

function handleUpdateStatus(){
    updateStatus(route.params.id)
}
const handleAddComment = async() =>{
    await addComment(route.params.id)


}

const getImageUrl = (image: any) => {
    if (image && image.path) {
        return 'https://classifieds-app-back.onrender.com/storage/' + image.path;
    }
    return ''; // Ou une URL par défaut si aucune image n'est disponible
};


</script>

<style scoped>
#bt {
  /* text-transform: ; */
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 500;
  padding: 15px 30px;
  background-color: #5830E0;
  color: #fff;
  border: none;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  border-radius: 4px;
}
</style>
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
                        <li>
                            <a href="/guest" v-if="!isLoggedIn">Accueil</a>
                            <a href="/" v-if="isLoggedIn">Accueil</a>
                        </li>
                        <li>Profile</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- <div v-if="userShow">
        {{ userShow }}
    </div> -->
    <section v-if="userShow.user">
        <div class="p-2">
            <div class="row">
                <div class="col-lg-4">
                    <div class="card mb-4 profile-card">
                        <div class="card-body text-center">
                            <img :src="userShow.user.avatar" class="rounded-circle img-fluid" style="width: 150px;">
                            <h5 class="my-3">{{ userShow.user.name }}</h5>
                            <p class="mb-1">Full Stack Developer</p>
                            <p class="mb-4">Bay Area, San Francisco, CA</p>
                            <div class="d-flex justify-content-center mb-2">
                                <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn">Follow</button>
                                <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn ms-1">Message</button>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card mb-4 mb-lg-0">
                        <div class="card-body p-0">
                            <ul class="list-group list-group-flush rounded-3">
                                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <i class="fas fa-globe fa-lg text-warning"></i>
                                    <p class="mb-0">https://mdbootstrap.com</p>
                                </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <i class="fab fa-github fa-lg text-body"></i>
                                <p class="mb-0">mdbootstrap</p>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <i class="fab fa-twitter fa-lg" style="color: #55acee;"></i>
                                <p class="mb-0">@mdbootstrap</p>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <i class="fab fa-instagram fa-lg" style="color: #ac2bac;"></i>
                                <p class="mb-0">mdbootstrap</p>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <i class="fab fa-facebook-f fa-lg" style="color: #3b5998;"></i>
                                <p class="mb-0">mdbootstrap</p>
                            </li>
                            </ul>
                        </div>
                    </div> -->

                    <div>
                        <div>
                            <button
                            type="button"
                            class="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#updateProfileModal"
                            >
                            📝 Compléter le profil
                            </button>

                            <!-- 📦 Modal Bootstrap -->
                            <div
                            class="modal fade"
                            id="updateProfileModal"
                            tabindex="-1"
                            aria-labelledby="updateProfileModalLabel"
                            aria-hidden="true"
                            >
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="updateProfileModalLabel">Compléter le profil</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
                                        </div>

                                        <div class="modal-body">
                                            <div class="dashboard-block mt-0 profile-settings-block">
                                                <h3 class="block-title">Profile Settings</h3>
                                                <div class="inner-block">
                                                    <!-- <div class="image">
                                                        <img src="../assets/images/clients/client3.svg" alt="#">
                                                    </div> -->
                                                    <form @submit.prevent = "handleComplete" class="profile-setting-form" method="post" action="#">
                                                        <div class="row">
                                                            <div class="col-lg-6 col-12">
                                                                <div class="form-group">
                                                                    <label>Ifu*</label>
                                                                    <input v-model="profile.ifu" name="ifu" type="text" placeholder="">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-12">
                                                                <div class="form-group">
                                                                    <label>RCCM*</label>
                                                                    <input v-model="profile.rccm" name="rccm" type="text" placeholder="">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-12">
                                                                <div class="form-group">
                                                                    <label>Web*</label>
                                                                    <input v-model="profile.website" name="web" type="text" placeholder="">
                                                                </div>
                                                            </div>
                                                    
                                                            <div class="col-12">
                                                                <div class="form-group button mb-0">
                                                                    <button type="submit" class="btn" data-bs-dismiss="modal">Update Profile</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Full Name</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="mb-0">{{ userShow.user.name }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Email</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="mb-0">{{ userShow.user.email }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Phone</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="mb-0">(097) 234-5678</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">IFU</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="mb-0">{{ userShow.user.ifu }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">RCCM</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="mb-0">{{ userShow.user.rccm }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Adresse web</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="mb-0">{{ userShow.user.website }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-grid" role="tabpanel"
                            aria-labelledby="nav-grid-tab">
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-12" v-for = "ad in userShow.ads" :key="ad.id">
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
                                                    </i>{{ ad.city.name}}, {{ ad.department.name }}</a></p>
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





                        <div class="tab-pane fade" id="nav-list" role="tabpanel"
                            aria-labelledby="nav-list-tab">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-12" v-for = "ad in userShow.ads" :key="ad.id">
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
                                                <div class="content">
                                                    <!-- <a href="javascript:void(0)" class="tag">{{ ad.subcategory.name }}</a> -->
                                                    <h3 class="title">
                                                        <a href="item-details.html">{{ ad.title }}</a>
                                                    </h3>
                                                    <p class="location"><a href="javascript:void(0)"><i
                                                                class="lni lni-map-marker">
                                                            </i>San Francisco</a></p>
                                                    <ul class="info">
                                                        <li class="price">{{ ad.price }} CFA</li>
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
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAds } from '@/components/composables/adsApi';
import { useRoute } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import { authService } from '../services/authService';
import { useProfile } from '../components/composables/profileApi'

const { getUser, complete, profile } = useProfile()

onMounted(getUser)

function handleComplete(){
    complete(profile.value)
}



const isLoggedIn = computed(() => authService.isAuthenticated());

const imageUrl = import.meta.env.VITE_IMAGE_URL


const route = useRoute()

const { showUser, userShow } = useAds();

onMounted(() => {
    const userId = route.params.user; // Récupère l'ID utilisateur depuis l'URL
    if (userId) {
        showUser(userId);
    }
});

interface Image {
  path: string;
}

const getImageUrl = (images: Image[]) => {
  if (images && images.length > 0) {
    return `${imageUrl}/storage/` + images[0].path;
  }
  return ''; // Ou une image par défaut si aucune image n'est disponible
};
</script>

<style scoped>
p{
    color: #fff;
}
.profile-card, .card{
    background: #222222;
}

.profile-card .card-body h5{
    color: #ff8c00;
}

.profile-card .card-body p{
    color: #fff;
}

.btn{
    background: #ff8c00;
    color: #fff;
}
</style>
<template>
    <!-- Start Header Area -->
    <header class="header navbar-area">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <div class="nav-inner">
                        <nav class="navbar navbar-expand-lg">
                            <router-link v-if="!isLoggedIn" to="/guest"><img src="../assets/images/logo/logo.png" alt="Logo" width="80px"></router-link>
    
                            <!-- Lien vers la page d'accueil pour les utilisateurs -->
                            <router-link v-if="isLoggedIn" to="/"><img src="../assets/images/logo/logo.png" alt="Logo" width="80px"></router-link>

                            <div class="button header-button">
                                <div id="droped" class="dropdown">
                                    <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img :src="profile.avatar" alt="Avatar utilisateur" class="rounded-full w-16 h-16">
                                        <span>{{profile.name}}</span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><RouterLink class="dropdown-item" :to="{name: 'dashboard'}">Dashboard</RouterLink></li>
                                        <li><RouterLink class="dropdown-item" :to="{name: 'myAds'}">Mes annonces</RouterLink></li>
                                        <li><span class="dropdown-item">{{ subscriptionStatut }}</span></li>
                                        <li>
                                            <form @submit.prevent = "logout" action="">
                                                <button class="logout dropdown-item" href="">Se déconnecter</button>
                                            </form>
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>
                            
                            <button
                                class="navbar-toggler mobile-menu-btn"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                                @click="toggleMenu"
                                :class="{ active: isActive }"
                            >
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                <ul id="nav" class="navbar-nav ms-auto">
                                    <li class="nav-item" v-for="(link, index) in links" :key="index">
                                    <router-link aria-label="Toggle navigation" :to="link.url" :class="{ 'nav-link': true, 'active': isActiveLink(link.url) }">{{ link.text }}</router-link>
                                    </li>
                                </ul>
                                <div class="button header-button">
                                    <RouterLink class="btn" :to="{name: 'adCreate'}">Publier une annonce</RouterLink>
                                </div>
                                <div class="button header-button">
                                    <div id="drop" class="dropdown">
                                        <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img :src="profile.avatar" alt="Avatar utilisateur" class="rounded-full w-16 h-16">
                                            <span>{{profile.name}}</span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><RouterLink class="dropdown-item" :to="{name: 'dashboard'}">Dashboard</RouterLink></li>
                                            <li><RouterLink class="dropdown-item" :to="{name: 'myAds'}">Mes annonces</RouterLink></li>
                                            <li><RouterLink v-if="profile.id" class="dropdown-item" :to="{name: 'userShow', params: {user:profile.id}}">Profile</RouterLink></li>
                                            <li><span class="dropdown-item">{{ subscriptionStatut }}</span></li>
                                            <li>
                                                <form @submit.prevent = "logout" action="">
                                                    <button class="logout dropdown-item" href="">Se déconnecter</button>
                                                </form>
                                            </li>
                                        </ul>
                                        
                                    </div>
                                </div>
                                <div v-if="userRole=='Admin'" class="button header-button">
                                    <RouterLink class="btn" :to="{name: 'users'}">Admin</RouterLink>
                                </div>
                            </div>
                            
                            
                            
                        </nav> <!-- navbar -->
                    </div>
                </div>
            </div> <!-- row -->
        </div> <!-- container -->
    </header>
    <!-- End Header Area -->
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import router from '@/router';
import { useProfile } from '../components/composables/profileApi'
import { useSubscription } from '../components/composables/subscriptionsApi'
import { useUserRoles } from '../components/composables/userRoleApi'

const { getUser, profile } = useProfile()
onMounted(getUser);

const { userRole, getUserRole } = useUserRoles();
onMounted(getUserRole);

const { subscriptionStatut, showSubscription } = useSubscription()

onMounted(showSubscription);
// Variable réactive pour gérer l'état actif du bouton
const isActive = ref(false);

// Fonction pour basculer l'état du bouton
const toggleMenu = () => {
  isActive.value = !isActive.value;
};

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const token = localStorage.getItem('token');
const isLoggedIn = ref(!!token);

const clientHttp = axios.create({
    baseURL: `${backendUrl}/api/`,
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    }
});

async function logout() {
    try {
        const user = await clientHttp.post('logout');
        console.log(user);
        localStorage.removeItem('token');
        router.replace('/login');
    } catch (error) {
        console.log(error);
    }
}

const links = ref([
    { text: 'Annonces', url: '/adsList' },
    { text: 'Catégories', url: '/categoryList' },
    { text: 'Abonnements', url: '/pricing' }
]);

const route = useRoute();

const isActiveLink = (url: string) => {
    return route.path === url;
};
</script>

<style scoped>

#nav{
    
}

</style>


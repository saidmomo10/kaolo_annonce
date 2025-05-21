<template>
    <header class="header navbar-area">
        <div class="container">
            <div class="nav-inner row align-items-center">
                <!-- Ligne supérieure spécifique à mobile -->
                <div class="d-lg-none d-flex justify-content-between align-items-center py-2 position-relative">
                    <!-- Logo gauche -->
                    <router-link :to="isLoggedIn ? '/' : '/guest'" class="me-2">
                        <img src="../assets/images/logo/logo.png" alt="Logo" width="80px">
                    </router-link>
        
                    <!-- Dropdown utilisateur centré (position absolue centrée) -->
                    <div class="mobile-dropdown-wrapper">
                        <button
                            class="dropdown-toggle border-0 bg-transparent"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                            :src="profile.avatar"
                            alt="Avatar utilisateur"
                            class="rounded-circle"
                            style="width: 40px; height: 40px;"
                            />
                        </button>
                        <ul class="dropdown-menu dropdown-menu-center">
                            <li><RouterLink class="dropdown-item" :to="{ name: 'dashboard' }">Dashboard</RouterLink></li>
                            <li><RouterLink class="dropdown-item" :to="{ name: 'myAds' }">Mes annonces</RouterLink></li>
                            <li v-if="profile.id">
                                <RouterLink class="dropdown-item" :to="{ name: 'userShow', params: { user: profile.id } }">
                                    Profil
                                </RouterLink>
                            </li>
                            <li><span class="dropdown-item">{{ subscriptionStatut }}</span></li>
                            <li>
                                <form @submit.prevent="logout">
                                    <button class="dropdown-item">Se déconnecter</button>
                                </form>
                            </li>
                        </ul>
                    </div>
        
                    <!-- Burger menu mobile -->
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
                    <!-- Menu mobile déroulant -->
                    <div class="collapse navbar-collapse mt-3" :class="{ show: isActive }" id="navbarSupportedContent">
                        <ul class="navbar-nav d-flex flex-column gap-2">
                            <li class="nav-item" v-for="(link, index) in links" :key="index">
                            <router-link
                                :to="link.url"
                                class="nav-link"
                                @click="toggleMenu"
                                :class="{ active: isActiveLink(link.url) }"
                            >
                                {{ link.text }}
                            </router-link>
                            </li>
                            <li class="button header-button">
                                <RouterLink class="btn" :to="{ name: 'adCreate' }">Publier une annonce</RouterLink>
                                <RouterLink v-if="userRole === 'Admin'" class="btn btn-outline-secondary" :to="{ name: 'users' }">Admin</RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
        
                <!-- Menu complet desktop -->
                <nav class="navbar navbar-expand-lg d-none d-lg-flex w-100">
                    <div class="container d-flex justify-content-between align-items-center">
                        <!-- Bloc 1: Logo -->
                        <router-link
                        class="navbar-brand"
                        :to="isLoggedIn ? '/' : '/guest'"
                        >
                        <img src="../assets/images/logo/logo.png" alt="Logo" width="80px">
                        </router-link>

                        <!-- Bloc 2: Liens de navigation centrés -->
                        <ul id="nav" class="navbar-nav flex-row gap-4">
                            <li class="nav-item" v-for="(link, index) in links" :key="index">
                                <router-link
                                :to="link.url"
                                class="nav-link"
                                :class="{ active: isActiveLink(link.url) }"
                                >
                                {{ link.text }}
                                </router-link>
                            </li>
                        </ul>

                        <!-- Bloc 3: Dropdown utilisateur -->
                        <div class="dropdown">
                            <button
                                class="dropdown-toggle border-0 bg-transparent"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                :src="profile.avatar"
                                alt="Avatar utilisateur"
                                class="rounded-circle"
                                style="width: 60px; height: 60px;"
                                />
                            </button>
                            <ul class="dropdown-menu">
                                <li><RouterLink class="dropdown-item" :to="{ name: 'dashboard' }">Dashboard</RouterLink></li>
                                <li><RouterLink class="dropdown-item" :to="{ name: 'myAds' }">Mes annonces</RouterLink></li>
                                <li v-if="profile.id">
                                    <RouterLink class="dropdown-item" :to="{ name: 'userShow', params: { user: profile.id } }">
                                        Profil
                                    </RouterLink>
                                </li>
                                <li><span class="dropdown-item">{{ subscriptionStatut }}</span></li>
                                <li>
                                    <form @submit.prevent="logout">
                                        <button class="dropdown-item">Se déconnecter</button>
                                    </form>
                                </li>
                            </ul>
                        </div>

                        <!-- Bloc 4: Boutons -->
                        <div class="d-flex align-items-center button header-button">
                            <RouterLink class="btn" :to="{ name: 'adCreate' }">Publier une annonce</RouterLink>
                            <RouterLink v-if="userRole === 'Admin'" class="btn btn-outline-secondary" :to="{ name: 'users' }">Admin</RouterLink>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
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


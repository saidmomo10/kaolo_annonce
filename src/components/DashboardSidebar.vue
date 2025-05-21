<template>
  <div class="dashboard-sidebar">
    <div class="row user-image">
      <div class="single">
        <img :src="profile.avatar" alt="Avatar utilisateur" class="rounded-full w-16 h-16">
        <NotificationComponent/>
      </div>
      <h3>{{ profile.name }}
        <span><a href="javascript:void(0)">{{ profile.email }}</a></span>
      </h3>
    </div>
    <div class="dashboard-menu">
      <ul>
        <li v-for="(link, index) in links" :key="index">
          <router-link :to="link.url" :class="{ 'nav-link': true, 'active': isActiveLink(link.url) }">{{ link.text }}</router-link>
        </li>
      </ul>
      <form class="button" @submit.prevent="logout">
        <button class="btn" href="">Logout</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NotificationComponent from './NotificationComponent.vue';
import { useRouter, useRoute } from 'vue-router';
import { useProfile } from '../components/composables/profileApi'
import axios from 'axios';
import router from '@/router';


const { getUser, profile } = useProfile()
onMounted(getUser);

const links = [
  { text: 'Dashboard', url: '/dashboard' },
  { text: 'Publier une annonce', url: '/adCreate' },
  { text: 'Mes Annonces', url: '/myAds' },
  { text: 'Mettre à jour Profile', url: '/profileEdit' },
];

const route = useRoute();
const isActiveLink = (to: { name: string; params: { id: number } }) => {
    return route.name === to.name && route.params.id === String(to.params.id);
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token');

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
</script>

<style>
/* a.router-link-active{
    background-color: red;
} */
</style>

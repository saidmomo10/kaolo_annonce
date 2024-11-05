<template>
  <div class="dashboard-sidebar">
    <div class="row user-image">
      <NotificationComponent/>
      <h3>Steve Aldridge
        <span><a href="javascript:void(0)">@username</a></span>
      </h3>
    </div>
    <div class="dashboard-menu">
      <ul>
        <li v-for="(link, index) in links" :key="index">
          <router-link :to="link.url" :class="{ 'nav-link': true, 'active': isActiveLink(link.url) }">{{ link.text }}</router-link>
        </li>
      </ul>
      <div class="button">
        <a class="btn" href="javascript:void(0)">Logout</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NotificationComponent from './NotificationComponent.vue';
import { useRouter, useRoute } from 'vue-router';

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
</script>

<style>
/* a.router-link-active{
    background-color: red;
} */
</style>

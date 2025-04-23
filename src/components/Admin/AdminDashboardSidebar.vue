<template>
    <div class="dashboard-sidebar">
      <div class="row user-image">
        <AdminNotification/>
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
  import AdminNotification from './AdminNotification.vue';
  import { useRouter } from 'vue-router';
  
  const links = [
    { text: 'category', url: '/admin/category' },
    { text: 'Users', url: '/admin/users' },
    { text: 'roles', url: '/admin/roles' },
    // { text: 'Mettre à jour Profile', url: '/profileEdit' },
  ];
  
  const isActiveLink = (url: string) => {
    const currentRoute = useRouter().currentRoute;
    return currentRoute.path === url;
  };
  </script>
  
  <style>
  /* a.router-link-active{
      background-color: red;
  } */
  </style>
  
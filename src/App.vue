
<template>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title>ClassiGrids - Classified Ads and Listing Website Template.</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" type="image/x-icon" href="assets/images/favicon.svg" />
      <meta name="csrf-token" content="{{ csrf_token() }}">
      <!-- Place favicon.ico in the root directory -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.8.2/css/lightbox.min.css">
      <!-- Web Font -->
      <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/fontawesome.min.css" integrity="sha384-BY+fdrpOd3gfeRvTSMT+VUZmA728cfF9Z2G42xpaRkUGu2i3DyzpTURDo5A6CaLK" crossorigin="anonymous">

      <!-- ========================= CSS here ========================= -->
      <!-- <link rel="stylesheet" href="/src/assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/src/assets/css/LineIcons.2.0.css" />
      <link rel="stylesheet" href="/src/assets/css/animate.css" />
      <link rel="stylesheet" href="/src/assets/css/tiny-slider.css" />
      <link rel="stylesheet" href="/src/assets/css/glightbox.css" />
      <link rel="stylesheet" href="/src/assets/css/main.css" /> -->

  </head>


  <!-- <div class="preloader" v-if="isLoading">
    <div class="preloader-inner">
        <div class="preloader-icon">
            <span></span>
            <span></span>
        </div>
    </div>
  </div> -->
  <RouterView />
</template>

<style>
   
 @import "/src/assets/css/bootstrap.min.css";
 @import "/src/assets/css/LineIcons.2.0.css";
 @import "/src/assets/css/animate.css";
 @import "/src/assets/css/tiny-slider.css";
 /* @import "/src/assets/css/glightbox.css"; */
 @import "/src/assets/css/main.css";
</style>

<script setup lang="ts"> 
  import 'bootstrap';



//   export default {
//   // Composant Vue.js
//   components: {

//   },
//   data() {
//     return {
//       isLoading: true // Utilisez cette variable pour contrôler l'affichage du préchargeur
//     };
//   },
//   // Méthodes pour simuler un délai de chargement (à remplacer par vos propres méthodes)
//   mounted() {
//     setTimeout(() => {
//       this.isLoading = false; // Cachez le préchargeur après un délai simulé
//     }, 2000); // Délai simulé de 2 secondes (à remplacer par votre propre logique de chargement)
//   }
// };
</script>

<!-- <style src="./assets/css/animate.css"></style>
<style src="./assets/css/bootstrap.min.css"></style>
<style src="./assets/css/glightbox.min.css"></style>
<style src="./assets/css/LineIcons.2.0.css"></style>
<style src="./assets/css/main.css"></style>
<style src="./assets/css/tiny-slider.css"></style> -->

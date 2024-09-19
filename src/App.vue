
<template>
  <Preloader :isLoading="isLoading" />
  
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
  import { ref, onMounted } from 'vue';
  import Preloader from './components/Preloader.vue'; // Assure-toi que le chemin est correct

  // Etat de chargement
  const isLoading = ref(true);

  // Simuler un délai de chargement (à remplacer par ta propre logique)
  onMounted(() => {
    setTimeout(() => {
      isLoading.value = true; // Masquer le préchargeur après un délai simulé
    }, 10000); // Délai simulé de 2 secondes
  });
</script>

<!-- <style src="./assets/css/animate.css"></style>
<style src="./assets/css/bootstrap.min.css"></style>
<style src="./assets/css/glightbox.min.css"></style>
<style src="./assets/css/LineIcons.2.0.css"></style>
<style src="./assets/css/main.css"></style>
<style src="./assets/css/tiny-slider.css"></style> -->

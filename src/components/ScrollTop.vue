<template>
    <a href="#" v-show="showButton" @click.prevent="scrollToTop" class="scroll-top btn-hover">
      <i class="lni lni-chevron-up"></i>
    </a>
  </template>
  
<script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  
  const showButton = ref(false); // Gère la visibilité du bouton
  
  const checkScroll = () => {
    showButton.value = window.scrollY > 50;
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  onMounted(() => {
    window.addEventListener("scroll", checkScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener("scroll", checkScroll);
  });
</script>
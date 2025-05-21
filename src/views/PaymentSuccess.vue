<!-- <script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const transactionId = params.get('transaction_id');

  // Tu peux afficher une confirmation ou vérifier l'état du paiement via ton API
});
</script> -->

<template>
  <div class="text-center">
    <h1>Paiement réussi 🎉</h1>
    <p>Merci pour votre achat !</p>
  </div>
</template>

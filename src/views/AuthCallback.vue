<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';

const router = useRouter();
const route = useRoute();

onMounted(() => {
    const token = route.query.token;
    const userId = route.query.user_id;

    if (token && userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        toast.success("Connexion réussie !");
        router.push('/'); // Redirection vers la page d'accueil
    } else {
        toast.error("Échec de la connexion !");
        router.push('/login'); // Redirection vers la page de connexion en cas d'erreur
    }
});
</script>

<template>
  <div class="loading">Connexion en cours...</div>
</template>

<style scoped>
.loading {
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
}
</style>

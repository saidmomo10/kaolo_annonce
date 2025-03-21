<template>
    <!-- Start Browse Cities Area -->
    <section class="browse-cities section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <h2 class="wow fadeInUp" data-wow-delay=".4s">Browse By Cities</h2>
                        <p class="wow fadeInUp" data-wow-delay=".6s">
                            Explorez les annonces disponibles par département.
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-if="departments.length === 0" class="col-12 text-center">
                    <p>Aucun département disponible.</p>
                </div>
                <div v-for="dept in departments" :key="dept.id" class="col-lg-4 col-md-4 col-12">
                    <!-- Start Single City -->
                    <div class="single-city wow fadeInUp" data-wow-delay=".2s">
                        <router-link :to="'/annonces/' + dept.id">
                            <div class="image">
                                <img :src="dept.image" alt="#">
                            </div>
                            <div class="content">
                                <h4 class="name">
                                    {{ dept.name }}
                                    <span>{{ dept.annonces_count || 0 }} Annonces</span>
                                </h4>
                            </div>
                            <div class="more-btn">
                                <i class="lni lni-circle-plus"></i>
                            </div>
                        </router-link>
                    </div>
                    <!-- End Single City -->
                </div>
            </div>
        </div>
    </section>
    <!-- /End Browse Cities Area -->
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const imageUrl = import.meta.env.VITE_IMAGE_URL

const token = localStorage.getItem('token');

const clientHttp = axios.create({
    baseURL: `${backendUrl}/api/`,
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    }
});

const departments = ref<{ id: number, name: string, annonces_count?: number }[]>([]);

const fetchDepartments = async () => {
    try {
        const response = await clientHttp.get('departments');
        if (response.status === 200) {
            departments.value = response.data;
        }
    } catch (error) {
        console.error("Erreur lors du chargement des départements :", error);
    }
};

onMounted(fetchDepartments);

const getImageUrl = (images) => {
    if (images && images.length > 0) {
        return `${imageUrl}/storage/` + images[0].path;
    }
    return ''; // Ou une image par défaut si aucune image n'est disponible
};
</script>

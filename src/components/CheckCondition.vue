<template>
    <div class="single-widget condition">
        <h3>Condition</h3>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="newChecked" @change="search">
            <label class="form-check-label" for="flexCheckDefault2">
                Neuf
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="usedChecked" @change="search">
            <label class="form-check-label" for="flexCheckDefault3">
                Usé
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAdStore } from './stores/adStore';

const adStore = useAdStore();

// Définissez des références pour les valeurs de chaque case à cocher
const allChecked = ref(false);
const newChecked = ref(false);
const usedChecked = ref(false);

// Définissez la méthode de recherche
const search = () => {
    let query = '';

    // Construisez la requête en fonction de l'état des cases à cocher
    if (newChecked.value) {
        query = 'neuf';
    }else if (usedChecked.value){
         query += 'usé';
    }    
    // Filtrer les annonces en fonction de la requête
    adStore.filter(query);
};
</script>

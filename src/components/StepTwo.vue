<!-- eslint-disable vue/no-mutating-props -->
<template>
    <form class="default-form-style" @submit.prevent="validateAndProceed">
        <div class="row">
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <label>Numéro de Téléphone*</label>
                    <input v-model="props.formValues.phone" name="number" type="text"
                        placeholder="Enter mobile number">
                </div>
            </div>

            
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <label>Département*</label>
                    <div class="selector-head">
                        <span class="arrow"><i
                                class="lni lni-chevron-down"></i></span>
                        <select class="user-chosen-select" v-model="props.formValues.department_id" @change="filterCities">
                            <option value="">Selectionner</option>
                            <option v-for="department in departments" :key="department.id" :value="department.id">
                                {{ department.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <label>Ville*</label>
                    <div class="selector-head">
                        <span class="arrow"><i
                                class="lni lni-chevron-down"></i></span>
                            <select v-model="props.formValues.city_id" :disabled="!filteredCities.length">
                                <option value="">Selectionner</option>
                                <option v-for="city in filteredCities" :key="city.id" :value="city.id">
                                    {{ city.name }}
                                </option>
                            </select>
                    </div>
                    <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
                </div>
            </div>
            <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value=""
                        id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        J'accepte les Termes et Conditions Générals d'Utilisation
                    </label>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group button mb-0">
                    <button @click="$emit('previous-step')" type="button" class="btn alt-btn">Retour</button>
                    <button type="submit" class="btn">Next Step</button>
                </div>
            </div>
            
            <!-- <div class="col-12">
                <div class="form-group button mb-0">
                    <button @click="prevStep" type="submit" class="btn alt-btn">Previous</button>
                    <button type="submit" class="btn ">Next Step</button>
                </div>
            </div> -->
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const props = defineProps(['formValues'])

const errors = ref({
city: ''
});

const emit = defineEmits<{
(event: 'next-step'): void;
}>();

const validateAndProceed = () => {
  // Reset errors
  for (const key in errors.value) {
    errors.value[key] = '';
  }

  let valid = true;

  // Validate title
  if (!props.formValues.city_id) {
    errors.value.city = 'Le titre est requis.';
    valid = false;
  }

  

  if (valid) {
    emit('next-step');
  }
}



import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('token');

    const clientHttp = axios.create({
        baseURL: `${backendUrl}/api/`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    const departments = ref([]);
    const department_id = ref(null);
    const city_id = ref(null);
    const filteredCities = ref([]);

    const status = async () => {
        try {
            const statusResponse = await clientHttp.get('departments');
            console.log(statusResponse);

            if (statusResponse.status === 200) {
                departments.value = statusResponse.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    onMounted(status);

    const filterCities = () => {
        const dept = departments.value.find(d => d.id === props.formValues.department_id);
        filteredCities.value = dept ? dept.cities : [];
    };

</script>

<style scoped>
.error-message {
color: red;
font-size: 0.875em;
}
</style>
<template>
    <div>
      <form action="" @submit.prevent="submitStepThree" enctype="multipart/form-data">
      <div class="row">
          <div class="col-4">
            <p v-if="props.formValues.images && props.formValues.images.length > 0">Images sélectionnées :</p>
            <div v-for="image in props.formValues.images" :key="image.name">
              <img :src="getImageUrl(image)" alt="Selected image" style="max-width: 200px; max-height: 200px; margin-bottom: 10px;">
            </div>
          </div>
          <div class="col-8">
            <div class="row">
              <h4>Titre :</h4>
              <p v-text="props.formValues.title"></p>
            </div>
            <div class="row">
              <h4>Prix :</h4>
              <p v-text="props.formValues.price"></p>
            </div>          
            <div class="row">
              <h4>Description :</h4>
              <p v-text="props.formValues.description"></p>
            </div>
            <div class="row">
              <h4>Ville :</h4>
              <p v-text="props.formValues.price"></p>
            </div>          
            <div class="row">
              <h4>Livraison :</h4>
              <p v-text="props.formValues.delivery_status"></p>
            </div>          
            <div class="row">
              <h4>État :</h4>
              <p v-text="props.formValues.state"></p>
            </div>          
            <p v-text="props.formValues.price_type"></p>
            <p v-text="props.formValues.phone"></p>
          </div>
      </div>     
        

      <button id="bt" type="submit" class="btn alt-btn">Publier</button>

    </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const props = defineProps(['formValues']);
console.log(props.formValues)


// const formData = ref({ title: '', price: '' });

// const submitStepThree = async () => {
//   try {
//     const response = await axios.post('/api/form/step-three');
//     console.log(response.data.message);
//     // Réinitialiser le formulaire après la soumission réussie
//     // emit('resetForm');
//   } catch (error) {
//     console.error('Error submitting step three:', error);
//   }
// }

// const prevStep = () => {
//   // Émettre l'événement prevStep vers le composant parent
// //   emit('prevStep');
// }






const getImageUrl = (image: Blob | MediaSource) => {
  return URL.createObjectURL(image);
}



const token = localStorage.getItem('token');

const clientHttp = axios.create(
    {
        baseURL: `${backendUrl}/api/`,
        headers: {
            'Content-Type': "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    }
)


const submitStepThree = async () => {
  try {
    // Envoyer les données de l'étape trois une fois soumises
    // Vous pouvez également ajouter des validations ici
    // et déclencher l'événement resetForm une fois le formulaire soumis avec succès
    const response = await clientHttp.post('ads', props.formValues);
    toast.success(response.data, {
        autoClose: 1000,
        });
    console.log(response.data);
    // router.replace('/adsList')
  } catch (error) {
    toast.error(error.response.data.message, {
        autoClose: 1000,
        });
    console.error('Error submitting step three:', error);
  }
};

</script>

<style scoped>
#bt {
  /* text-transform: ; */
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 500;
  padding: 15px 30px;
  background-color: #5830E0;
  color: #fff;
  border: none;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  border-radius: 4px;
}
</style>
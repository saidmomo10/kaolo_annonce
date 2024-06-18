<!-- eslint-disable vue/no-mutating-props -->
<template>
    <form class="default-form-style" method="post" action="#">
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
                    <label>Ville*</label>
                    <div class="selector-head">
                        <span class="arrow"><i
                                class="lni lni-chevron-down"></i></span>
                        <select class="user-chosen-select" v-model="props.formValues.city">
                            <option value="none">Select City</option>
                            <option value="Parakou">Parakou</option>
                            <option value="Cotonou">Cotonou</option>
                            <option value="Porto-Novo">Porto-Novo</option>
                            <option value="Djougou">Djougou</option>

                        </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <label>Département*</label>
                    <div class="selector-head">
                        <span class="arrow"><i
                                class="lni lni-chevron-down"></i></span>
                        <select class="user-chosen-select" v-model="props.formValues.department">
                            <option value="none">Sélectionner un département</option>
                            <option value="Alibori">Alibori</option>
                            <option value="Atlantique">Atlantique</option>
                            <option value="Borgou">Borgou</option>
                            <option value="Atacora">Atacora</option>

                        </select>
                    </div>
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
const props = defineProps(['formValues'])

// import { ref } from 'vue';
// import axios from 'axios';

// eslint-disable-next-line vue/no-dupe-keys
// const formData = ref({
//     price: '',
//     country:'',
//     city:'',
//     description:'',
//     delivery_statut:'' 
// });

// import { defineProps, defineEmits } from 'vue';

// const props = defineProps<{
//   formData: Record<string, any>;
// }>();

// const clientHttp = axios.create(
//     {
//         baseURL: "http://localhost:8000/api/",
//         headers: {
//             Accept: "application/json",
//         }
//     }
// )


// // eslint-disable-next-line vue/valid-define-emits
// const emit = defineEmits();

// const submitStepTwo = async () => {
//   try {
//     const response = await clientHttp.post('/api/ad/step-two', props.formData);
//     console.log(response.data.message);
//     emit('nextStep');
//   } catch (error) {
//     console.error('Error submitting step two:', error);
//   }
// };

// const prevStep = () => {
//   emit('prevStep');
// };
</script>

<style >

</style>
<template>
    <section class="login section">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12">
                    <div v-if="userdata" class="form-head">
                        <h4 class="title">Confirmation du compte</h4>
                        <p>Un code de confirmation vous a été envoyé par mail. Veuillez saisir le code pour valider votre compte</p>
                        <form @submit.prevent="confirm" action="" >
                            <div class="form-group">
                                <label>Email</label>
                                <input name="email" type="email" v-model="userdata.email">
                            </div>

                            <div class="button">
                                <!-- <button v-if="loading" class="btn btn-primary" type="button" disabled>
                                    <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                    <span class="visually-hidden" role="status">Loading...</span>
                                </button> -->

                                <button v-if="loading" class="btn btn-primary" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </button>
                                <button v-else class="btn">Login Now</button>
                                <div class="spiner-border spiner-border-sm"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import axios from 'axios';
import router from '@/router';
import { ref } from 'vue';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const clientHttp = axios.create(
    {
        baseURL: `${backendUrl}/api/`,
        headers: {
            Accept: "application/json",
        }
    }
)

const userdata = ref({
    email: '',
})

// const isFormValid = computed(() => {
//   return userdata.value.name && userdata.value.password && userdata.value.age > 0;
// });
const loading = ref(false);

async function confirm(){

    // if (!userdata.value.email) {
    //     emailError.value = 'Veuillez entrer votre adresse e-mail';
    //     return;
    // }

    // if (!userdata.value.password) {
    //     passwordError.value = 'Veuillez entrer votre mot de passe';
    //     return;
    // }

        try {
            loading.value = true;
            const user = await clientHttp.post('/password/email', userdata.value);
            console.log(user);            
            router.push('/reset');
            loading.value = false;
        }catch(error){
            console.error('Axios error:', error);
            loading.value = false;
        }
}
</script>
<template>
    <!-- Start Breadcrumbs -->
    <div class="breadcrumbs">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="breadcrumbs-content">
                        <h1 class="page-title">Connexion</h1>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <ul class="breadcrumb-nav">
                        <router-link v-if="!isLoggedIn" to="/guest">Retour à l'accueil</router-link>
    
                        <!-- Lien vers la page d'accueil pour les utilisateurs -->
                        <router-link v-if="isLoggedIn" to="/">Accueil</router-link>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Breadcrumbs -->
    <section class="login section">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12">
                    <div class="form-head">
                        <h4 class="title">Login</h4>
                        <form @submit.prevent="login" action="" >
                            <div class="form-group">
                                <label>Email</label>
                                <input name="email" type="email" v-model="userdata.email">
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input name="password" type="password" v-model="userdata.password">
                            </div>
                            <div class="check-and-pass">
                                <div class="row align-items-center">
                                    <div class="col-lg-6 col-md-6 col-12">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input width-auto"
                                                id="exampleCheck1">
                                            <!-- <label class="form-check-label">Remember me</label> -->
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-12">
                                        <a href="javascript:void(0)" class="lost-pass">Mot de passe oublié?</a>
                                    </div>
                                </div>
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
                            <div class="alt-option">
                                <span>Or</span>
                            </div>
                            <div class="socila-login">
                                <ul>
                                    <li><a href="javascript:void(0)" class="facebook"><i class="lni lni-facebook-original"></i>Login With
                                            Facebook</a></li>
                                    <li><a href="javascript:void(0)" class="google"><i class="lni lni-google"></i>Login With Google
                                            Plus</a>
                                    </li>
                                </ul>
                            </div>
                            <p class="outer-link">Don't have an account? <a href="registration.html">Register here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import NavBar from '../components/NavBar.vue'
    import axios from 'axios';
    import router from '@/router';
    import { ref } from 'vue';

const clientHttp = axios.create(
    {
        baseURL: "http://localhost:8000/api/",
        headers: {
            Accept: "application/json",
        }
    }
)

let emailError = ref('');
let passwordError = ref('');

const userdata = ref({
    email: '',
    password: '',
})

// const isFormValid = computed(() => {
//   return userdata.value.name && userdata.value.password && userdata.value.age > 0;
// });
const loading = ref(false);

async function login(){

    if (!userdata.value.email) {
        emailError.value = 'Veuillez entrer votre adresse e-mail';
        return;
    }

    if (!userdata.value.password) {
        passwordError.value = 'Veuillez entrer votre mot de passe';
        return;
    }

        try {
            loading.value = true;
            const user = await clientHttp.post('auth/login', userdata.value);
            console.log(user);
            localStorage.setItem('token', user.data.data.token);
            localStorage.setItem('userId', user.data.data.user.id);            
            router.push('/');
            loading.value = false;
        }catch(error){
            console.error('Axios error:', error);
            loading.value = false;
        }
}

const token = localStorage.getItem('token');
const isLoggedIn = ref(!!token);

if(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
}
</script>
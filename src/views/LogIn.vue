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
                    <div class="form-head" v-loading="loading">
                        <h4 class="title">Login</h4>
                        <form @submit.prevent="login" action="" >
                            <div class="form-group">
                                <label>Email</label>
                                <input name="email" type="email" v-model="userdata.email">
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <div class="control has-icons-right">
                                    <input v-if="showPassword" name="password" type="text" v-model="userdata.password">
                                    <input v-else name="password" type="password" v-model="userdata.password">
                                    <span @click="toggleShow" aria-label="Toggle new password visibility">
                                        <span class="icon is-right">
                                            <i class="fas" :class="{ 'fa-eye': showPassword, 'fa-eye-slash': !showPassword }"></i>
                                        </span>
                                    </span>
                                </div>
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
                                        <a href="/forgot" class="lost-pass">Mot de passe oublié?</a>
                                    </div>
                                </div>
                            </div>
                            <div class="button">
                                <button class="btn" type="submit" :disabled="loading">
                                    <span v-if="loading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span v-else>Login Now</span>
                                </button>
                            </div>
                            <div class="alt-option">
                                <span>Or</span>
                            </div>
                            <div class="socila-login">
                                <ul>
                                    <li><a href="javascript:void(0)" class="facebook"><i class="lni lni-facebook-original"></i>Login With
                                            Facebook</a></li>
                                    <li><a href="" @click="loginWithGoogle" class="google"><i class="lni lni-google"></i>Login With Google
                                            Plus</a>
                                    </li>
                                </ul>
                            </div>
                            <p class="outer-link">Don't have an account? <a href="signup">Register here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import axios from 'axios';
import { toast } from 'vue3-toastify';
import router from '@/router';
import { ref, computed } from 'vue';


import { redirectToProvider } from '@/services/auth';

// Fonction pour rediriger l'utilisateur vers Google OAuth
const loginWithGoogle = () => {
  redirectToProvider('google');
};



const backendUrl = import.meta.env.VITE_BACKEND_URL;

const clientHttp = axios.create(
    {
        baseURL: `${backendUrl}/api/`,
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

const loading = ref(false);

async function login(){

    emailError.value = '';
    passwordError.value = '';

    if (!userdata.value.email) {
        emailError.value = 'Veuillez entrer votre adresse e-mail';
        toast.error(emailError.value, {
            autoClose: 3000,
        });
        return; // Stopper la fonction si l'email est vide
    }

    if (!userdata.value.password) {
        passwordError.value = 'Veuillez entrer votre mot de passe';
        toast.error(passwordError.value, {
            autoClose: 3000,
        });
        return; // Stopper la fonction si le mot de passe est vide
    }

    try {
        loading.value = true;
        const user = await clientHttp.post('auth/login', userdata.value);
        
        toast.success(user.data.message, {
            autoClose: 2000, // Le toast va rester visible pendant 2 secondes
        });
        
        console.log(user);
        
        localStorage.setItem('token', user.data.data.token);
        localStorage.setItem('userId', user.data.data.user.id);            
        
        setTimeout(() => {
        router.push('/');
        }, 2000); // Délai de 2 secondes avant la redirection
        
        loading.value = false;
    }catch(error){
        toast.error(error.response.data.message, {
            autoClose: 1000, // Même logique pour l'erreur
        });
        console.error('Axios error:', error);
    }finally {
        loading.value = false;
    }
}

const token = localStorage.getItem('token');
const isLoggedIn = ref(!!token);

if(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
}

const showPassword = ref(false);
// const password = ref<string | null>(null);

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};

const buttonLabel = computed(() => (showPassword.value) ? "Hide" : "Show");

</script>

<style scoped>
/* Style pour les champs de mot de passe et les icônes */
.form-group {
    position: relative;
}

.control {
    position: relative;
}

.icon.is-right {
    position: absolute;
    top: 50%;
    right: 15px; /* Ajustez selon votre besoin */
    transform: translateY(-50%);
    cursor: pointer;
    transition: color 0.3s ease; /* Ajoute une transition pour un effet visuel */
}

.icon.is-right:hover {
    color: #2c7873; /* Change la couleur au survol pour un effet visuel */
}

.input {
    width: 100%;
    padding-right: 50px; /* Assure qu'il y a suffisamment d'espace pour les icônes */
    box-sizing: border-box;
}

.control.has-icons-right .input {
    padding-right: 60px; /* Ajuste le padding pour faire de la place pour les icônes */
}

/* Accessibilité : amélioration pour les icônes */
.icon.is-right[aria-label] {
    display: flex;
    align-items: center;
    justify-content: center;
}


</style>
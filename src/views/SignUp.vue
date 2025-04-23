<template>
    <!-- Start Breadcrumbs -->
    <div class="breadcrumbs">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="breadcrumbs-content">
                        <h1 class="page-title">Registration</h1>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <ul class="breadcrumb-nav">
                        <li><a href="index.html">Home</a></li>
                        <li>Registration</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Breadcrumbs -->

    <!-- start Registration section -->
    <section class="login registration section">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12">
                    <div class="form-head" v-loading="loading">
                        <h4 class="title">Registration</h4>
                        <form @submit.prevent="signup" action="">
                            <div class="socila-login">
                                <ul>
                                    <li><a href="javascript:void(0)" class="facebook"><i class="lni lni-facebook-original"></i>Import
                                            From Facebook</a></li>
                                    <li><a href="javascript:void(0)" class="google"><i class="lni lni-google"></i>Import From Google
                                            Plus</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="alt-option">
                                <span>Or</span>
                            </div>
                            <div class="form-group">
                                <label>Name</label>
                                <input name="password" type="text" v-model="userdata.name">
                            </div>
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
                            <div class="form-group">
                                <label>Confirmer</label>
                                <div class="control has-icons-right">
                                    <input v-if="showConfirmPassword" name="password" type="text" v-model="userdata.password_confirmation">
                                    <input v-else name="password" type="password" v-model="userdata.password_confirmation">
                                    <span @click="toggleShowConfirm" aria-label="Toggle new password visibility">
                                        <span class="icon is-right">
                                            <i class="fas" :class="{ 'fa-eye': showConfirmPassword, 'fa-eye-slash': !showConfirmPassword }"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <!-- <div class="form-group">
                                <label>Confirm Password</label>
                                <input name="password" type="password">
                            </div> -->
                            <div class="check-and-pass">
                                <div class="row align-items-center">
                                    <div class="col-12">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input width-auto"
                                                id="exampleCheck1">
                                            <label class="form-check-label">Agree to our <a href="javascript:void(0)">Terms and
                                                    Conditions</a></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button">
                                <button class="btn" type="submit" :disabled="loading">
                                    <span v-if="loading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span v-else>Créer un compte</span>
                                </button>
                            </div>
                            <p class="outer-link">Already have an account? <a href="login"> Login Now</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Registration section -->
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import axios from 'axios';
import router from '@/router';
import { toast } from 'vue3-toastify';
import { ref, computed } from 'vue';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const clientHttp = axios.create(
    {
        baseURL: `${backendUrl}/api/`,
        headers: {
            Accept: "application/json",
        }
    }
)
let nameError = ref('');
let emailError = ref('');
let passwordError = ref('');

const userdata = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const loading = ref(false);

async function signup(){

    emailError.value = '';
    passwordError.value = '';

    if (!userdata.value.name) {
        nameError.value = 'Veuillez entrer votre nom';
        toast.error(nameError.value, {
            autoClose: 3000,
        });
        return; // Stopper la fonction si l'email est vide
    }

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

    clearErrors()
    if (!userdata.value.name) {
        nameError.value = 'Veuillez entrer votre adresse e-mail';
        return;
    }
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
        const user = await clientHttp.post('auth/register', userdata.value);

        toast.success(user.data.message, {
            autoClose: 2000, // Le toast va rester visible pendant 2 secondes
        });

        console.log(user);
        router.replace('/confirm');

        loading.value = false;
    }catch (error) {
        // Vérifier si les erreurs proviennent du backend
        if (error.response && error.response.data && error.response.data.data) {
            // Extraire les erreurs spécifiques
            const errors = error.response.data.data;

            // Afficher les toasts pour chaque type d'erreur spécifique
            for (const [field, messages] of Object.entries(errors)) {
                // Afficher chaque message d'erreur comme un toast
                messages.forEach((message: string) => {
                    toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${message}`, {
                        autoClose: 3000,
                    });
                });
            }
        } else {
            toast.error('Une erreur est survenue.', {
                autoClose: 3000,
            });
        }
    }finally {
        loading.value = false;
    }

        function clearErrors() {
    nameError.value = '';
    emailError.value = '';
    passwordError.value = '';
    }
}

const showPassword = ref(false);
const showConfirmPassword = ref(false);

// const password = ref<string | null>(null);

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};

const toggleShowConfirm = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
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
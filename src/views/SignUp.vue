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
                    <div class="form-head">
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
                                <input name="password" type="password" v-model="userdata.password">
                            </div>
                            <div class="form-group">
                                <label>Confirmer votre mot de passe</label>
                                <input name="password" type="password" v-model="userdata.password_confirmation">
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
                                <button class="btn">Registration</button>
                            </div>
                            <p class="outer-link">Already have an account? <a href="login.html"> Login Now</a>
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
    import { ref } from 'vue';

    const clientHttp = axios.create(
    {
        baseURL: "http://localhost:8000/api/",
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


async function signup(){
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
        const user = await clientHttp.post('auth/register', userdata.value);
        console.log(user);
        router.replace('/confirm');
    }catch(error){
            // emailError.value = 'L\'adresse email doit contenir le symbole "@".';
            // passwordError.value = 'Le mot de passe doit avoir au moins 8 caractères.';
            console.log(error);
    }

        function clearErrors() {
    nameError.value = '';
    emailError.value = '';
    passwordError.value = '';
    }
}
</script>
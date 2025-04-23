<template>
    <NavBar/>
    <!-- Start Breadcrumbs -->
    <div class="breadcrumbs">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="breadcrumbs-content">
                        <h1 class="page-title">My Ads</h1>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <ul class="breadcrumb-nav">
                        <li>
                            <a href="/guest" v-if="!isLoggedIn">Accueil</a>
                            <a href="/" v-if="isLoggedIn">Accueil</a>
                        </li>
                        <li>My Ads</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Breadcrumbs -->

    
    <section class="dashboard section">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-12">
                    <!-- Start Dashboard Sidebar -->
                    <DashboardSidebar/>
                    <!-- Start Dashboard Sidebar -->
                </div>
                <div class="col-lg-9 col-md-8 col-12">
                    <div class="main-content">
                        <!-- Start Profile Settings Area -->
                        <div class="dashboard-block mt-0 profile-settings-block">
                            <h3 class="block-title">Profile Settings</h3>
                            <div class="inner-block">
                                <!-- <div class="image">
                                    <img src="../assets/images/clients/client3.svg" alt="#">
                                </div> -->
                                <form @submit.prevent = "handleUpdateProfile" class="profile-setting-form" method="post" action="#">
                                    <div class="row">
                                        <div class="col-lg-6 col-12">
                                            <div class="form-group">
                                                <label>Nom*</label>
                                                <input v-model.trim="profile.name" name="usernames" type="text" placeholder="@username">
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-12">
                                            <div class="form-group">
                                                <label>Email*</label>
                                                <input v-model.trim="profile.email" name="email" type="email" placeholder="username@gmail.com">
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group upload-image">
                                                <label>Profile Image*</label>
                                                <input name="avatar" type="file" @change="onFileChange" placeholder="Upload Image" accept="image/*">
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group message">
                                                <label>About You*</label>
                                                <textarea name="message" placeholder="Enter about yourself"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group button mb-0">
                                                <button type="submit" class="btn ">Update Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!-- End Profile Settings Area -->
                        <!-- Start Password Change Area -->
                        <div class="dashboard-block password-change-block">
                            <h3 class="block-title">Change Password</h3>
                            <div class="inner-block">
                                <form @submit.prevent="handleUpdatePassword" class="default-form-style" method="post" action="#">
                                    <div class="row">
                                        <!-- Champ de mot de passe actuel -->
                                    <div class="form-group">
                                        <label>Mot de passe actuel*</label>
                                        <div class="control has-icons-right">
                                            <input v-if="showPassword" v-model="passwordData.current_password" name="current-password" type="text" placeholder="Enter old password">
                                            <input v-else v-model="passwordData.current_password" name="current-password" type="password" placeholder="Entrez actuel mot de passe">
                                            <span @click="toggleShow" aria-label="Toggle password visibility">
                                                <span class="icon is-right">
                                                    <i class="fas" :class="{ 'fa-eye': showPassword, 'fa-eye-slash': !showPassword }"></i>
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Champ de nouveau mot de passe -->
                                    <div class="form-group">
                                        <label>Nouveau mot de passe*</label>
                                        <div class="control has-icons-right">
                                            <input v-if="showNewPassword" v-model="passwordData.new_password" name="new-password" type="text" placeholder="Enter new password" class="input">
                                            <input v-else v-model="passwordData.new_password" name="new-password" type="password" placeholder="Entrez nouveau mot de passe" class="input">
                                            <span @click="toggleShowNewPassword" aria-label="Toggle new password visibility">
                                                <span class="icon is-right">
                                                    <i class="fas" :class="{ 'fa-eye': showNewPassword, 'fa-eye-slash': !showNewPassword }"></i>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                        <!-- <div class="col-12">
                                            <div class="form-group">
                                                <label>Retype Password*</label>
                                                <input v-model="passwordData.confirm_password" name="retype-password" type="password"
                                                    placeholder="Retype password">
                                            </div>
                                        </div> -->
                                        <div class="col-12">
                                            <div class="form-group button mb-0">
                                                <button type="submit" class="btn ">Update Password</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!-- End Password Change Area -->
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Dashboard Section -->
    <!-- <FooterComponent/> -->

</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
// import FooterComponent from '@/components/FooterComponent.vue';
import DashboardSidebar from '@/components/DashboardSidebar.vue'
import {ref, onMounted, computed} from 'vue'
import { useProfile } from '@/components/composables/profileApi'
import { authService } from '../services/authService';

const isLoggedIn = computed(() => authService.isAuthenticated());

const {getUser, profile, updateProfile, updatePassword, passwordData} = useProfile()

onMounted(getUser)

// Références pour stocker l'image et le produit
const image = ref<File | null>(null);
// const product = ref<{ image_url: string } | null>(null);

// Gérer le changement d'image dans le champ file
const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const selectedFile = target.files[0];

        // Vérifier le type MIME
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
        if (!allowedTypes.includes(selectedFile.type)) {
            alert("Veuillez sélectionner une image de type valide (jpeg, png, jpg, gif, svg).");
            return;
        }

        image.value = selectedFile;
    }
};

function handleUpdateProfile(){
    updateProfile(profile.value)
}

function handleUpdatePassword(){
    updatePassword(passwordData.value)
}


const showPassword = ref(false);
const showNewPassword = ref(false);
// const password = ref<string | null>(null);

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};

const toggleShowNewPassword = () => {
    showNewPassword.value = !showNewPassword.value;
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
<template>
    <NavBar/>
    <div class="breadcrumbs">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="breadcrumbs-content">
                        <h1 class="page-title">Mes annonces</h1>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <ul class="breadcrumb-nav">
                        <li><a href="/">Accueil</a></li>
                        <li>Mes annonces</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div v-if="editData" class="dashboard-block mt-0 profile-settings-block">
        <div class="inner-block">
            <form @submit.prevent = "handleUpdateAds" class="profile-setting-form" method="post" action="#">
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label>Add Title*</label>
                            <input v-model.trim="editData.title" name="title" type="text">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label>Category*</label>
                            <div class="selector-head">
                                <!-- <span class="arrow"><i class="lni lni-chevron-down"></i></span> -->
                                <select class="user-chosen-select" v-model="editData.subcategory_id">
                                    <option value="none">Select a Category</option>

                                    <option v-for = "category in categoryData" :value="`${category.id}`" :key="category.id">{{ category.name }}</option>
                                    <!-- <option value="none">Electronics</option>
                                    <option value="none">Computers</option>
                                    <option value="none">Headphones</option>
                                    <option value="none">Furnitures</option>
                                    <option value="none">Books</option> -->
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group message">
                            <label>Description*</label>
                            <textarea v-model.trim="editData.description" name="message" placeholder="Enter about yourself"></textarea>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label>Country*</label>
                            <div class="selector-head">
                                <span class="arrow"><i
                                        class="lni lni-chevron-down"></i></span>
                                <select class="user-chosen-select" v-model="editData.country">
                                    <option value="none">Select a Country</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <!-- <option value="none">America</option>
                                    <option value="none">Albania</option>
                                    <option value="none">Bangladesh</option>
                                    <option value="none">Brazil</option>
                                    <option value="none">India</option>
                                    <option value="none">South Africa</option> -->
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-12">
                        <div class="form-group">
                            <label>Username*</label>
                            <input name="usernames" type="text" placeholder="@username">
                        </div>
                    </div>
                    <!-- <div class="col-12">
                        <div class="form-group upload-image">
                            <label>Profile Image*</label>
                            <input :v-model = "editData.images" name="images[]" multiple @change="handleImageUpload" type="file" placeholder="Upload Image">
                        </div>
                    </div> -->
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

</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import {ref, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import {useAds} from '../components/composables/adsApi'
import {useCategories} from '../components/composables/categoriesApi'

const {params} = useRoute()

const {showAd, editData, UpdateAd} = useAds()
onMounted(()=>{
    showAd(params.id)
})

function handleUpdateAds() {
    // Vérifiez si editData est défini et n'est pas null
    if (editData.value) {
        // Appelez la méthode UpdateAd avec l'identifiant de l'annonce et les données du formulaire
        UpdateAd(params.id, editData.value);
    } else {
        console.error('editData is null');
    }
}

const {status, categoryData} = useCategories()
onMounted(status)

// const handleImageUpload = (event: { target: { files: any; }; }) => {
//   const files = event.target.files;
//   const images = [];
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     // Vous pouvez traiter chaque fichier ici, par exemple, l'ajouter à un tableau d'images
//     images.push(file);
//   }
//   // Mettre à jour la propriété formValues.images avec le tableau d'images
//   // eslint-disable-next-line vue/no-mutating-props
//   AdData.images = images;
// }

// const getImageUrl = (image: Blob | MediaSource) => {
//   return URL.createObjectURL(image);
// }

</script>

<style scoped>

select.user-chosen-select{
    height: 50px;
    width: 100%;
    border: 1px solid #eee;
    border-radius: 6px;
    color: #081828;
    background: #fff;
    padding: 0px 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
}

</style>
<template>
    <div class="my-items">
        <!-- Start Item List Title -->
        <div class="item-list-title">
            <div class="row align-items-center">
                <div class="col-lg-5 col-md-5 col-12">
                    <p>Job Title</p>
                </div>
                <div class="col-lg-2 col-md-2 col-12">
                    <p>Category</p>
                </div>
                <div class="col-lg-2 col-md-2 col-12">
                    <p>Condition</p>
                </div>
                <div class="col-lg-3 col-md-3 col-12 align-right">
                    <p>Action</p>
                </div>
            </div>
        </div>
        <!-- End List Title -->
        <!-- Start Single List -->
        <div v-for="ad in myAdsData.all" :key="ad.id" class="single-item-list">
            <div class="row align-items-center">
                <div class="col-lg-5 col-md-5 col-12">
                    <div class="item-image">
                        <img :src="getImageUrl(ad.images)" alt="#">
                        <div class="content">
                            <h3 class="title"><a href="javascript:void(0)">{{ ad.title }}</a></h3>
                            <span class="price">{{ ad.price }} FCFA</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 col-12">
                    <p v-if="ad.subcategory">{{ ad.subcategory.name }}</p>
                </div>
                <div class="col-lg-2 col-md-2 col-12">
                    <p>New</p>
                </div>
                <div class="col-lg-3 col-md-3 col-12 align-right">
                    <ul class="action-btn">
                        <li><RouterLink :to="{name: 'adShow', params: {id:ad.id}}"><i class="lni lni-eye"></i></RouterLink></li>
                        <li><button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="lni lni-trash"></i></button></li>
                    </ul>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-body">
                            Confirmez-vous la suppression ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" @click = 'deleteAd(ad.id)' class="btn btn-danger">Confirmer</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Single List -->
    </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
// import { useRoute } from 'vue-router';
import { useAds } from './composables/adsApi';

const { myAds, myAdsData, deleteAd } = useAds()

onMounted(myAds)

interface Image {
  path: string;
}

const getImageUrl = (images: Image[]) => {
  if (images && images.length > 0) {
    return 'https://classifieds-app-back.onrender.com/storage/' + images[0].path;
  }
  return ''; // Ou une image par défaut si aucune image n'est disponible
};

</script>
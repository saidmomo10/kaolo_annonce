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
        <div v-if="myAdsData && myAdsData.sale && myAdsData.sale.length > 0">
            <div v-for="ad in myAdsData.sale" :key="ad.id" class="single-item-list">
                <div class="row align-items-center">
                    <div class="col-lg-5 col-md-5 col-12">
                        <div class="item-image">
                            <img :src="getImageUrl(ad.images)" alt="#">
                            <div class="content">
                                <p class="title">{{ ad.title }}</p>
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
                            <li><button type="button" @click = "confirmDelete(ad.id)"><i class="lni lni-trash"></i></button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- Affichage du message si aucune annonce n'est trouvée -->
        <div v-else class="position">
            <p>Aucune annonce vendue</p>
        </div>
        <!-- End Single List -->
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useAds} from './composables/adsApi'
import Swal from 'sweetalert2';

const imageUrl = import.meta.env.VITE_IMAGE_URL

const { myAds, myAdsData, deleteAd } = useAds()
myAdsData.sale = ref([]); // Définit une liste vide par défaut pour éviter les erreurs
onMounted(myAds)

const getImageUrl = (images: string[]) => {
  if (images && images.length > 0) {
    return `${imageUrl}/storage/` + images[0].path;
  }
  return ''; // Ou une image par défaut si aucune image n'est disponible
};

const confirmDelete = (id: number) => {
  Swal.fire({
    title: 'Confirmez-vous la suppression ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    confirmButtonColor: '#d33',
    cancelButtonText: 'Annuler',
    cancelButtonColor: '#2c7873',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteAd(id);
      await myAds(); // Recharge la liste après la suppression
      Swal.fire('Supprimé!', 'L\'annonce a été supprimée.', 'success');
    }
  });
};
</script>

<style scoped>
.position{
    display: flex;
    justify-content: center;
    align-items: center;
}

.position p {
    font-size: 30px;
    color: #888;
    text-align: center;
}
</style>
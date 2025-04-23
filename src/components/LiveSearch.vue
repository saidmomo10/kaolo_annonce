<template>
  <div class="search-form wow fadeInUp" data-wow-delay=".7s">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12 p-0">
        <div class="search-input">
          <label for="keyword"><i class="lni lni-search-alt theme-color"></i></label>
          <input
            v-model="keyword"
            @input="getResults"
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Rechercher"
          />
        </div>
      </div>
      <div v-if="isLoading" class="text-center my-3">
        <!-- Utilise un spinner ou texte -->
        <span class="spinner" role="status"></span>
        <span class="loading ms-2">Chargement...</span>
      </div>
      <ul v-else-if="ads.length > 0">
        <li v-for="ad in ads.slice(0, 2)" :key="ad.id">
          <RouterLink :to="{ name: 'adShow', params: { id: ad.id } }" class="col-lg-12">
            <div class="item-image">
              <img :src="getImageUrl(ad.images)" alt="#" />
              <div class="content">
                <h6 class="title">{{ ad.title }}</h6>
                <span v-if="ad.subcategory" class="price">{{ ad.subcategory.name }}</span>
              </div>
            </div>
          </RouterLink>
        </li>
      </ul>

      <div v-if="ads.length >= 2" class="text-center mt-3">
        <RouterLink
          :to="{ name: 'searchResults', query: { keyword: keyword } }"
          class="btn"
        >
          Voir plus
        </RouterLink>
      </div>

      <div v-else-if="!isLoading && keyword && ads.length == 0">
        <p>Aucune annonce trouvée</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL
const imageUrl = import.meta.env.VITE_IMAGE_URL
const token = localStorage.getItem('token')

const clientHttp = axios.create({
  baseURL: `${backendUrl}/api/`,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
})

const keyword = ref<string | null>(null)
const ads = ref<any[]>([])

watch(keyword, () => {
  getResults()
})

const isLoading = ref(false)
const getResults = () => {
  if (keyword.value) {
    isLoading.value = true
    clientHttp
      .get('/live', { params: { keyword: keyword.value } })
      .then(res => (ads.value = res.data))
      .catch(error => console.error(error))
      .finally(() => isLoading.value = false)
  } else {
    ads.value = []
    isLoading.value = false
  }
}

interface Image {
  path: string
}

const getImageUrl = (images: Image[]) => {
  if (images && images.length > 0) {
    return `${imageUrl}/storage/` + images[0].path
  }
  return ''
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 10px;
  margin-top: 10px;
}

li {
  margin-bottom: 10px;
}

.item-image {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.content .title {
  margin: 0;
  font-size: 1rem;
}

.price {
  color: #007bff;
  font-weight: 500;
  font-size: 0.9rem;
}

.btn{
  display: inline-block;
  /* text-transform: ; */
  font-size: 15px;
  font-weight: 500;
  padding: 15px 30px;
  background-color: #ff8c00;
  color: #fff;
  border: none;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  border-radius: 4px;
}

.btn:hover {
  background-color: #fff;
  color: #222222;
  border: #222222;
  -webkit-box-shadow: 0 1rem 3rem rgba(35, 38, 45, 0.15) !important;
          box-shadow: 0 1rem 3rem rgba(35, 38, 45, 0.15) !important;
}

.spinner {
  margin: 0 auto;
  border: 4px solid #222222;
  border-top: 4px solid #ff8c00;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

.loading{
  color: #fff;
}
</style>

<!-- <template>
    <NavBar />
    <form @submit.prevent="sub" action="" >
        <div class="col-12">
            <div class="form-group">
                <label>Add Title*</label>
                <input name="title" type="text" placeholder="Enter Title" v-model="formData.name">
            </div>
        </div>
        <div class="col-12">
            <div class="form-group">
                <label>duration*</label>
                <input name="title" type="number" placeholder="Enter Title" v-model="formData.duration">
            </div>
        </div>
        <div class="col-12">
            <div class="form-group">
                <label>max ads*</label>
                <input name="title" type="number" placeholder="Enter Title" v-model="formData.max_ads">
            </div>
        </div>
        <div class="col-12">
            <div class="form-group">
                <label>max images*</label>
                <input name="title" type="number" placeholder="Enter Title" v-model="formData.max_images">
            </div>
        </div>
        <div class="col-12">
            <div class="form-group">
                <label>price*</label>
                <input name="title" type="number" placeholder="Enter Title" v-model="formData.price">
            </div>
        </div>
        <div class="col-12">
            <div class="form-group mt-30">
                <label>Ad Description*</label>
                <textarea name="message" placeholder="Input ad description" v-model="formData.description"></textarea>
            </div>
        </div>
        <div class="col-12">
            <div class="form-group">
                <label>Price Type*</label>
                <div class="selector-head">
                    <span class="arrow"><i
                            class="lni lni-chevron-down"></i></span>
                    <select v-model="formData.type" class="user-chosen-select">
                        <option value="">Select an option</option>
                        <option value="Gratuit">Gratuit</option>
                        <option value="Payant">Payant</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="button">
            <button class="btn">Registration</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
    import axios from 'axios';
    import router from '@/router';
    import { ref } from 'vue';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    const clientHttp = axios.create(
    {
        baseURL: "http://localhost:8000/api/",
        headers: {
            Accept: "application/json",
        }
    }
)

const formData = ref({
    name: '',
    duration:'',
    price:'',
    description:'',
    max_ads:'',
    type:'',
    max_images:''
})
const token = localStorage.getItem('token');
const error = ref('');


async function sub(){
    try {
        const user = await clientHttp.post('create-subscription', formData.value,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
      });
        console.log(user);
        router.replace('/');
        toast.success(user.data)
    }catch(error){
            // emailError.value = 'L\'adresse email doit contenir le symbole "@".';
            // passwordError.value = 'Le mot de passe doit avoir au moins 8 caractères.';
            toast.error(error.response.data.message, {
        autoClose: 1000,
        });
            console.log(error);
    }
}
</script>





 -->


 <template>
    <lightgallery
      :settings="{ speed: 500, plugins: plugins }"
      @lgInit="onInit"
      @lgBeforeSlide="onBeforeSlide"
    >
      <a href="/src/assets/images/hero/hero-bg.jpg">
        <img alt="img1" src="/src/assets/images/hero/hero-bg.jpg" />
      </a>
      <a href="/src/assets/images/hero/hero-bg.jpg">
        <img alt="img2" src="/src/assets/images/hero/hero-bg.jpg" />
      </a>
    </lightgallery>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Lightgallery from 'lightgallery/vue';
  import lgThumbnail from 'lightgallery/plugins/thumbnail';
  import lgZoom from 'lightgallery/plugins/zoom';
  
  // Import CSS files for lightGallery
  import 'lightgallery/css/lightgallery.css';
  import 'lightgallery/css/lg-thumbnail.css';
  import 'lightgallery/css/lg-zoom.css';
  
  const plugins = ref([lgThumbnail, lgZoom]);
  
  const onInit = () => {
    console.log('lightGallery has been initialized');
  };
  
  const onBeforeSlide = () => {
    console.log('calling before slide');
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  

  



<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import useCategories from '../components/composables/categoriesApi'

const{cat, category} = useCategories()
onMounted(cat)

const token = localStorage.getItem('token');

const clientHttp = axios.create(
    {
        baseURL: "http://localhost:8000/api/",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    }
)

const name = ref('');
const category_id = ref('');
const icone = ref<File | null>(null);

// Méthode pour envoyer les données du formulaire
const submitForm = async () => {
//   if (!icone.value) {
//     errorMessage.value = "Veuillez sélectionner une image.";
//     return;
//   }

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('category_id', category_id.value);
  formData.append('icone', icone.value);

  try {
            const user = await clientHttp.post('subcategories', formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          }
          });
            console.log(user);
            // router.replace('/');
            // toast.success(user.data)
        }catch(error){
                // emailError.value = 'L\'adresse email doit contenir le symbole "@".';
                // passwordError.value = 'Le mot de passe doit avoir au moins 8 caractères.';
            //     toast.error(error.response.data.message, {
            // autoClose: 1000,
            // });
                console.log(error);
        }
};

// Méthode pour gérer le changement de fichier
const onFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    icone.value = files[0];
  }
};
</script> -->





















<!-- <template>
  <lightgallery
      :settings="{ speed: 500, plugins: plugins }"
      :onInit="onInit"
      :onBeforeSlide="onBeforeSlide"
  >
      <a href="./src/assets/images/items-grid/author-1.jpg">
          <img alt="" src="./src/assets/images/items-grid/author-1.jpg" />
      </a>
      <a href="./src/assets/images/items-grid/author-2.jpg">
          <img alt="" src="./src/assets/images/items-grid/author-2.jpg" />
      </a>
  </lightgallery>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import $ from 'jquery';
  import Lightgallery from 'lightgallery/vue';
  import lgThumbnail from 'lightgallery/plugins/thumbnail';
  import lgZoom from 'lightgallery/plugins/zoom';

  // Si vous utilisez scss, vous pouvez utiliser des variables pour les importations ci-dessous
  import 'lightgallery/css/lightgallery.css';
  import 'lightgallery/css/lg-thumbnail.css';
  import 'lightgallery/css/lg-zoom.css';

  const plugins = ref([lgThumbnail, lgZoom]);

  const onInit = () => {
      console.log('lightGallery has been initialized');
  };

  const onBeforeSlide = () => {
      console.log('calling before slide');
  };
</script> -->








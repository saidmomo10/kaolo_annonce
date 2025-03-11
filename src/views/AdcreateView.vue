<template>
  <body>
    <NavBar/>
    <div class="breadcrumbs">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12">
                    <div class="breadcrumbs-content">
                        <h1 class="page-title">Publier une annonce</h1>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <ul class="breadcrumb-nav">
                        <li><a href="index.html">Accueil</a></li>
                        <li>Publier une annonce</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Breadcrumbs -->

    <!-- Start Dashboard Section -->
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
                    <!-- Start Post Ad Block Area -->
                    <div class="dashboard-block mt-0">
                        <h3 class="block-title">Nouvelle Annonce</h3>
                        <div class="container inner-block">
                            <!-- Start Post Ad Tab -->
                            <div class="post-ad-tab">
                                <nav>
                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                        <button class="nav-link" 
                                                :class="{ active: currentStep === 1 }"
                                                :disabled="!isStepOneValid" 
                                                @click="currentStep = 1">
                                        
                                        <span class="serial">01</span>
                                        
                                        <span class="sub-title">Ad Information</span>
                                        </button>
                                        <button class="nav-link" 
                                                :class="{ active: currentStep === 2 }"
                                                :disabled="!isStepTwoValid" 
                                                @click="currentStep = 2">
                                        
                                        <span class="serial">02</span>
                                        
                                        <span class="sub-title">Ad Details</span>
                                        </button>
                                        <button class="nav-link" 
                                                :class="{ active: currentStep === 3 }"
                                                :disabled="!isStepThreeValid" 
                                                @click="currentStep = 3">
                                        
                                        <span class="serial">03</span>
                                        
                                        <span class="sub-title">User Information</span>
                                        </button>
                                    </div>
                                </nav>

                                <div class="tab-content">
                                    <StepOne :formValues="values" v-if="currentStep === 1" @next-step="goToNextStep" @validation-status="setStepOneValidity" />
                                    <StepTwo :formValues="values" v-if="currentStep === 2" @previous-step="goToPreviousStep" @next-step="goToNextStep" @validation-status="setStepTwoValidity" />
                                    <StepThree :formValues="values" v-if="currentStep === 3" @previous-step="goToPreviousStep" @validation-status="setStepThreeValidity" />
                                </div>
                            </div>
                            <!-- End Post Ad Tab -->
                        </div>
                    </div>
                    <!-- End Post Ad Block Area -->
                </div>
              </div>
            </div>
        </div>
    </section>
  </body>
</template>

<script setup lang="ts">
  import NavBar from '@/components/NavBar.vue';
//   import FooterComponent from '@/components/FooterComponent.vue';
  import DashboardSidebar from '@/components/DashboardSidebar.vue'
  import { ref } from 'vue';
  import useForm from '@/components/composables/formValues';

  const { values } = useForm();

  import StepOne from '../components/StepOne.vue';
  import StepTwo from '../components/StepTwo.vue';
  import StepThree from '../components/StepThree.vue';

  
  const currentStep = ref(1);

const goToNextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value += 1;
  }
};

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};

const setStepOneValidity = (valid: boolean) => {
  isStepOneValid.value = valid;
};

const setStepTwoValidity = (valid: boolean) => {
  isStepTwoValid.value = valid;
};

const setStepThreeValidity = (valid: boolean) => {
  isStepThreeValid.value = valid;
};

    // const csrfToken = document.head.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
        // const csrfToken = () => {
        // const token = document.head.querySelector<HTMLMetaElement>('meta[name="csrf-token"]');
        // return token ? token.content : '';
        // };
//     const clientHttp = axios.create(
//     {
//         baseURL: "http://localhost:8000/api/",
//         headers: {
//             Accept: "application/json",
//         }
//     }
// )
// const token = localStorage.getItem('token');


//     const nextStep = async () => {
//   if (currentStep.value < steps.length - 1) {
//     const stepRoute = `step${currentStep.value + 1}`;
    
//     const response = await clientHttp.post(`ad/${stepRoute}`, formData.value,{
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//       });
//     if (response.data.data) {
//       formData.value = response.data.data;
//       currentStep.value++;
//     } else {
//       // Gérer les erreurs ici
//       console.error('Erreur lors du traitement de la requête API');
//     }
//   }
// };
</script>

<style>
    .mapouter {
        position: relative;
        text-align: right;
        height: 300px;
        width: 100%;
    }
</style>

<style scoped>
  .gmap_canvas {
      overflow: hidden;
      background: none !important;
      height: 300px;
      width: 100%;
  }

  #bt{
    display: flex;
    justify-content: space-between;
  }
</style>




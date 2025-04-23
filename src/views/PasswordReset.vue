<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { toast } from 'vue3-toastify';

const route = useRoute();
const router = useRouter();

const email = ref<string>("");
const token = ref<string>("");
const password = ref<string>("");
const passwordConfirmation = ref<string>("");
const loading = ref<boolean>(false);

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const clientHttp = axios.create(
    {
        baseURL: `${backendUrl}/api/`,
        headers: {
            Accept: "application/json",
        }
    }
)

onMounted(() => {
  email.value = (route.query.email as string) || "";
  token.value = (route.query.token as string) || "";
});

const resetPassword = async () => {
  loading.value = true;

  try {
    await clientHttp.post("/password/reset", {
      email: email.value,
      token: token.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    });

    toast.success("Mot de passe réinitialisé avec succès ! 🎉", {
        autoClose: 3000,
    });

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Une erreur est survenue. ❌",
      { autoClose: 3000 }
    );
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <h2>Réinitialisation du mot de passe</h2>
    <form @submit.prevent="resetPassword">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" class="form-control" disabled />
      </div>

      <div class="form-group">
        <label>Nouveau mot de passe</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>

      <div class="form-group">
        <label>Confirmer le mot de passe</label>
        <input type="password" v-model="passwordConfirmation" class="form-control" required />
      </div>

      <button type="submit" class="btn" :disabled="loading">
        {{ loading ? "Réinitialisation..." : "Réinitialiser" }}
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>

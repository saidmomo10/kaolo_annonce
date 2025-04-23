<!-- components/ChatAssistant.vue -->
<template>
    <div class="chat-box">
      <div class="chat-log">
        <div v-for="(msg, i) in messages" :key="i" :class="msg.role">
          {{ msg.content }}
        </div>
      </div>
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        :disabled="isLoading"
        placeholder="Posez une question sur les annonces..."
      />
      <div v-if="isLoading" class="loader">Chargement...</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const token = localStorage.getItem('token');

    const clientHttp = axios.create(
        {
            baseURL: `${backendUrl}/api/`,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
    )
  
  const userInput = ref('')
  const messages = ref([
    { role: 'assistant', content: 'Bonjour 👋, je peux vous aider à trouver des annonces plus facilement !' }
  ])
  const isLoading = ref(false)
  
  const sendMessage = async () => {
  if (!userInput.value.trim()) return

  messages.value.push({ role: 'user', content: userInput.value })
  isLoading.value = true

  try {
    const response = await clientHttp.post('chat', {
      message: userInput.value,
      history: messages.value.slice(-5)
    })

    console.log('Réponse API:', response.data)

    messages.value.push({ role: 'assistant', content: response.data.reply })
  } catch (err) {
    console.error('Erreur API:', err)
    messages.value.push({ role: 'assistant', content: "Erreur lors de la communication avec l'assistant." })
  } finally {
    userInput.value = ''
    isLoading.value = false
  }
}

  </script>
  
  <style scoped>
  .chat-box {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 320px;
    max-height: 400px;
    overflow: auto;
    padding: 10px;
    z-index: 1000;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  
  .chat-log {
    margin-bottom: 10px;
  }
  
  .user {
    text-align: right;
    color: #007bff;
    margin-bottom: 4px;
  }
  
  .assistant {
    text-align: left;
    color: #333;
    margin-bottom: 4px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #eee;
    border-radius: 6px;
  }
  
  .loader {
    text-align: center;
    color: #999;
    margin-top: 5px;
  }
  </style>
  
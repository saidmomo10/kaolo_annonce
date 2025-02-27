import 'mdb-vue-ui-kit/css/mdb.min.css';
import './assets/main.css'

import './assets/jquery.min.js'
import './assets/jquery-3.3.1.min.js'
import './assets/jquery.fancybox.min.js'
import './assets/jquery.fancybox.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Vue3Toastify from 'vue3-toastify'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify)

app.mount('#app')

// 4. Utilisation dans un composant avec <script setup>
import { ref } from 'vue'
import moment from 'moment'

// Pour vérifier que la configuration fonctionne
console.log(moment.locale()) // Devrait afficher 'fr'

// Exemple d'utilisation
const date = ref(new Date())
const timeAgo = moment(date.value).fromNow()
const fullDate = moment(date.value).format('LLLL')

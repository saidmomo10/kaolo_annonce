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

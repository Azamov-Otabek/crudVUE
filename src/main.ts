import './assets/main.css'
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import UUID from "vue3-uuid";

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'


import App from './App.vue'
import router from './router'


const app = createApp(App)
app.use(PrimeVue, {
  theme: {
      preset: Aura
  }
});
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(UUID)
app.mount('#app')


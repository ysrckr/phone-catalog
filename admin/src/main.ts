import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import './style.css';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const pinia = createPinia();

const app = createApp(App).use(VueQueryPlugin).use(pinia).use(router).use(Vue3Toastify, {
  position: 'top-right',
  timeout: 2000,
  closeIcon: true,
  pauseOnHover: true,
} as ToastContainerOptions);
app.mount('#app');

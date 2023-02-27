import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import './style.css';

const pinia = createPinia();

const app = createApp(App).use(VueQueryPlugin).use(pinia).use(router);
app.mount('#app');

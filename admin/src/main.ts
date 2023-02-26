import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import './style.css';

const app = createApp(App).use(VueQueryPlugin).use(router);
app.mount('#app');

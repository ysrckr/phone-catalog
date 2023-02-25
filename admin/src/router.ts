import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';
import LoginPage from './pages/LoginPage.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

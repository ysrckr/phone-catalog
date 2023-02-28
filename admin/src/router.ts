import { RouteLocation, createRouter, createWebHistory } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';
import LoginPage from './pages/LoginPage.vue';
import DashboardPage from './pages/DashboardPage.vue';
import UsersPage from './pages/UsersPage.vue';
import ProductsPage from './pages/ProductsPage.vue';

import { useAuthStore } from '@/stores/authStore';

const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: (to: RouteLocation) => {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        return '/dashboard';
      } else {
        return '/login';
      }
    },
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'dashboard',
        component: DashboardPage,
      },
      {
        path: 'users',
        component: UsersPage,
      },
      {
        path: 'products',
        component: ProductsPage,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

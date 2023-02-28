import { RouteLocation, createRouter, createWebHistory } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';
import LoginPage from './pages/LoginPage.vue';
import DashboardPage from './pages/DashboardPage.vue';
import UsersPage from './pages/UsersPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import { useLocalStorage } from './hooks/useLocalStorage';
import { checkAuth } from './calls/auth/checkAuth';
import { useAuthStore } from './stores/authStore';

const guard = async (to: RouteLocation, from: RouteLocation, next: any) => {
  const [userId] = useLocalStorage('userId');
  const authStore = useAuthStore();
  try {
    const isAuthenticated = await checkAuth(userId || '');
    if (to.path === '/login' && isAuthenticated) {
      authStore.setIsAuthenticated(true);
      authStore.setUserId(userId || '');
      next('/dashboard');
    } else if (to.path !== '/login' && !isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } catch (error) {
    if (to.path !== '/login') {
      next('/login');
    } else {
      next();
    }
  }
};

const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/login',
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

router.beforeEach((to, from, next) => {
  guard(to, from, next);
});

import { RouteLocation, createRouter, createWebHistory } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';
import LoginPage from './pages/LoginPage.vue';
import DashboardPage from './pages/DashboardPage.vue';
import UsersPage from './pages/UsersPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import { useLocalStorage } from './hooks/useLocalStorage';
import { checkAuth } from './calls/auth/checkAuth';

const guard = async (to: RouteLocation, from: RouteLocation, next: any) => {
  const [userId, setUserId] = useLocalStorage('userId');
  try {
    const isAuthenticated = await checkAuth(userId || '');
    if (!isAuthenticated) {
      setUserId('');
    }
    if (to.path === '/login' && isAuthenticated) {
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

router.beforeEach(async (to, from, next) => {
  return guard(to, from, next);
});

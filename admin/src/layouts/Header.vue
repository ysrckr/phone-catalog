<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { logout } from '@/calls/auth/logout';
import { toast } from 'vue3-toastify';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const authStore = useAuthStore();
const router = useRouter();
const [, setUser] = useLocalStorage<string>('userId');

const onLogout = async () => {
  try {
    await logout(authStore.userId);
  } catch (error) {
    toast.error('Something went wrong');
    return;
  }

  authStore.setIsAuthenticated(false);
  authStore.setUserId('');
  setUser('');
  router.push('/login');
  toast.success('Logged out successfully');
};
</script>

<template>
  <header
    class="sticky flex items-center justify-between px-5 py-5 bg-green-900 shadow-xl"
  >
    <div>
      <router-link to="/">
        <img
          src="@/assets/logo.png"
          alt="logo"
        />
      </router-link>
    </div>
    <div>
      <ul class="flex items-center justify-between gap-3 text-gray-100 text-xs md:text-lg lg:text-lg">
        <li v-show="authStore.isAuthenticated">
          <router-link
            to="/dashboard"
            :active-class="'text-green-200 underline'"
          >
            Dashboard
          </router-link>
        </li>
        <li v-show="authStore.isAuthenticated">
          <router-link
            to="/users"
            :active-class="'text-green-200 underline'"
          >
            Users
          </router-link>
        </li>
        <li v-show="authStore.isAuthenticated">
          <router-link
            to="/products"
            :active-class="'text-green-200 underline'"
          >
            Products
          </router-link>
        </li>

        <li v-show="authStore.isAuthenticated">
          <button @click="onLogout">Logout</button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { logout } from '@/calls/auth/logout';
import { toast } from 'vue3-toastify';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const authStore = useAuthStore();
const router = useRouter();
const [user, setUser] = useLocalStorage<string>('userId')

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
  <header class="flex justify-between items-center bg-green-900 px-5 py-5 shadow-xl sticky">
    <div>
      <router-link to="/">
        <img src="@/assets/logo.png" alt="logo" />
      </router-link>
    </div>
    <div>
      <ul class="flex justify-between items-center gap-3 text-gray-100">
        <li v-show="authStore.isAuthenticated">
          <router-link 
          to="/dashboard"
          :active-class="'text-green-200 underline'"
          >
          Dashboard
        </router-link>
        </li>
        <li v-show="authStore.isAuthenticated">
          <button
            @click="onLogout"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>
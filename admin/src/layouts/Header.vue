<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const onLogout = () => {
  authStore.setIsAuthenticated(false);
  authStore.setUserId('');
  router.push('/login');
};
</script>

<template>
  <header class="flex justify-between items-center bg-green-900 px-5 py-5">
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
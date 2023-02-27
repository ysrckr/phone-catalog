<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const { isAuthenticated } = useAuthStore();
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
        <li v-if="isAuthenticated">
          <router-link 
          to="/dashboard"
          :active-class="'text-green-200 underline'"
          >
          Dashboard
        </router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link to="/logout">Logout</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>
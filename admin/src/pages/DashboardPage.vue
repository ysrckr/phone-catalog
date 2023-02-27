
<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
  }
});
</script>

<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>
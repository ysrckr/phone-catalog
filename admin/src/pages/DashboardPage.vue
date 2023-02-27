
<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from "vue-router";
import Card from '@/components/Card.vue';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
  }
});
</script>

<template>
  <h1 class="text-center mt-4 text-xl font-bold">Dashboard</h1>
  <div class="container px-4 mt-3 grid grid-cols-2 gap-x-3 gap-y-4 lg:grid-cols-4 xxl:grid-cols-6 items-center"
  >
    <Card />
    <Card />
    <Card />
    <Card />
  </div>
</template>
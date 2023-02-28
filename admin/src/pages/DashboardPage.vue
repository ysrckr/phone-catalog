
<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from "vue-router";
import Card from '@/components/Card.vue';
import CreateUser from "@/components/CreateUser.vue";

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
  <div class="container px-4 mt-3 grid grid-cols-1 gap-x-4 gap-y-6 lg:grid-cols-2 xxl:grid-cols-4 items-center justify-center"
  >
    <Card title="Create A User">
      <CreateUser />
    </Card>
    <Card title="Create A Category"/>
    <Card title="Create A Product" />
  </div>
</template>
<script setup lang="ts">
import UsersItem from '@/components/UsersItem.vue';
import { useAuthStore } from '@/stores/authStore';
import { useQuery } from '@tanstack/vue-query';
import { getAllUsers } from '@/calls/users/getAll';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const [userId] = useLocalStorage('userId');

const {
  data: users,
  isError,
  isLoading,
} = useQuery(['users'], {
  queryFn: () => getAllUsers(userId || ''),
});
</script>

<template>
  <div class="container mx-auto mt-4">
    <h1 class="m-6 text-xl font-bold text-center">Users</h1>

    <div
      class="gap-x-4 gap-y-6 lg:grid-cols-4 xxl:grid-cols-6 container grid items-center justify-center grid-cols-2 px-4 mt-3"
    >
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="isError">Error</p>
      <UsersItem
        v-else
        v-for="user in users"
        :key="user.id"
        :name="user.name"
        :email="user.email"
        :role="user.role"
      />
    </div>
  </div>
</template>

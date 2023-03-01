<script setup lang="ts">
import UsersItem from '@/components/UsersItem.vue';
import { useQuery } from '@tanstack/vue-query';
import { getAllUsers } from '@/calls/users/getAll';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Error from '@/components/Error.vue';

const [userId] = useLocalStorage('userId');

const {
  data: users,
  isError,
  isLoading,
  refetch,
} = useQuery(['users'], {
  queryFn: () => getAllUsers(userId || ''),
});
</script>

<template>
  <div class="container flex flex-col items-center justify-center mx-auto mt-4">
    <h1 class="m-6 text-xl font-bold text-center">Users</h1>
    <Error
      v-if="isError"
      @refresh="refetch"
    />
    <div
      v-if="isLoading"
      class="mx-auto mt-20"
    >
      <v-progress-circular
        color="green"
        model-value="20"
        :size="47"
      ></v-progress-circular>
    </div>
    <div v-if="isError">
      <h1 class="text-center">Error</h1>
    </div>
    <div
      class="gap-x-4 gap-y-6 lg:grid-cols-4 xxl:grid-cols-6 container grid items-center justify-center grid-cols-2 px-4 mt-3"
    >
      <UsersItem
        v-if="users"
        v-for="user in users"
        :key="user.id"
        :name="user.name"
        :email="user.email"
        :role="user.role"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UsersItem from '@/components/UsersItem.vue';
</script>

<template>
  <div class="container mt-4 mx-auto">
    <h1 class="m-6 text-xl font-bold text-center">Users</h1>
    <div
      class="gap-x-4 gap-y-6 lg:grid-cols-4 xxl:grid-cols-6 container grid items-center justify-center grid-cols-2 px-4 mt-3"
    >
      <UsersItem
        name="yasar"
        email="yasar@yasar.com"
        role="ADMIN"
      />
      <UsersItem
        name="yasar"
        email="yasar@yasar.com"
        role="ADMIN"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductsItem from '@/components/ProductsItem.vue';
</script>

<template>
  <div>
    <h1 class="mt-4 text-xl font-bold text-center">Products</h1>
    <div
      class="gap-x-4 gap-y-6 lg:grid-cols-2 xxl:grid-cols-4 container grid items-center justify-center grid-cols-1 px-4 mt-3"
    >
      <ProductsItem />
    </div>
  </div>
</template>

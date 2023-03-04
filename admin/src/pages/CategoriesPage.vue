<script setup lang="ts">
import CategoriesItem from '@/components/Items/CategoriesItem.vue';
import { useQuery } from '@tanstack/vue-query';
import { getAllCategories } from '@/api/categories/getAll';
import { Category } from '@/types/category';

import Error from '@/components/Utilities/Error.vue';
import Loader from '@/components/Utilities/Loader.vue';

const {
  data: categories,
  isError,
  isLoading,
  refetch,
} = useQuery<Category[]>(['categories'], getAllCategories);
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-8">
    <h1 class="text-center">Categories</h1>
    <Loader v-if="isLoading" />
    <Error
      v-if="isError"
      @refresh="refetch"
    />

    <div 
      class="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4"
    >
      <CategoriesItem
        v-if="categories"
        v-for="category in categories"
        :key="category.id"
        :name="category.name"
        :image="category.image"
      />
    </div>
  </div>
</template>

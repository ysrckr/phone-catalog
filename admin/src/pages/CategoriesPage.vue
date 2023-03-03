<script setup lang="ts">
import CategoriesItem from '@/components/CategoriesItem.vue';
import { useQuery } from '@tanstack/vue-query';
import { getAllCategories } from '@/api/categories/getAll';
import { Category } from '../types/category';

const {
  data: categories,
  isError,
  isLoading,
  refetch,
} = useQuery<Category[]>(['categories'], getAllCategories);
</script>

<template>
  <div
    class="gap-y-6 gap-x-4 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid grid-cols-1 mt-8"
  >
    <h1>Categories</h1>
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
      <Error
        v-if="isError"
        @refresh="refetch"
      />
    </div>

    <CategoriesItem
      v-if="categories"
      v-for="category in categories"
      :key="category.id"
      :name="category.name"
      :image="category.image"
    />
  </div>
</template>

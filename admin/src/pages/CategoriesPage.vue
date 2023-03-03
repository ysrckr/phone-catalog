<script setup lang="ts">
import CategoriesItem from '@/components/Items/CategoriesItem.vue';
import { useQuery } from '@tanstack/vue-query';
import { getAllCategories } from '@/api/categories/getAll';
import { Category } from '@/types/category';

const {
  data: categories,
  isError,
  isLoading,
  refetch,
} = useQuery<Category[]>(['categories'], getAllCategories);
</script>

<template>
  <div class="flex flex-col justify-center items-center mt-8">
    <h1 class="text-center">Categories</h1>
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

    <div class="grid">
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

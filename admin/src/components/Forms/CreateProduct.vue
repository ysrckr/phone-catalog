<script lang="ts" setup>
import { ref } from 'vue';
import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query';
import { Category } from '@/types/category';
import { getAllCategories } from '@/api/categories/getAll';

const name = ref<string>();
const description = ref<string>();
const colors = ref<string[]>();
const sizes = ref<string[]>();
const price = ref<number>();
const quantity = ref<number>();
const category = ref<string>();

const queryClient = useQueryClient();

const { data: categories } = useQuery<Category[]>(
  ['categories'],
  getAllCategories,
);
</script>

<template>
  <div>
    <form>
      <label for="name">Name</label>
      <input
        v-model="name"
        type="text"
        id="name"
        name="name"
        autocomplete="true"
      />
      <label for="description">Description</label>
      <textarea
        v-model="description"
        id="description"
        name="description"
        autocomplete="false"
      />
      <label for="colors">Colors</label>
      <input
        v-model="colors"
        type="text"
        id="colors"
        name="colors"
        autocomplete="true"
      />
      <label for="sizes"> Sizes </label>
      <select
        v-model="sizes"
        multiple
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <label for="price">Price</label>
      <input
        v-model="price"
        type="number"
        id="price"
        name="price"
        autocomplete="true"
      />
      <label for="quantity">Quantity</label>
      <input
        v-model="quantity"
        type="number"
        id="quantity"
        name="quantity"
        autocomplete="true"
      />
      <label for="category">Category</label>
      <select
        v-model="category"
        id="category"
        name="category"
        autocomplete="true"
      >
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <label for="images">Images</label>
      <input
        type="file"
        id="images"
        name="images"
        autocomplete="true"
        multiple
      />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

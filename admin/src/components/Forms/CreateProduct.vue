<script lang="ts" setup>
import { ref } from 'vue';
import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query';
import { Category } from '@/types/category';
import { getAllCategories } from '@/api/categories/getAll';
import Checkbox from '../Utilities/Checkbox.vue';

const name = ref<string>();
const description = ref<string>();
const colors = ref<string[]>();
const sizes = ref<string[]>();
const price = ref<number>();
const quantity = ref<number>();
const category = ref<string>('');

const queryClient = useQueryClient();

const { data: categories } = useQuery<Category[]>(
  ['categories'],
  getAllCategories,
);
</script>

<template>
  <div class="mx-auto">
    <form class="gap-y-6 flex flex-col">
      <label
        class="sr-only"
        for="name"
        >Name</label
      >
      <input
        class="border-1 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-300"
        v-model="name"
        type="text"
        id="name"
        name="name"
        autocomplete="true"
        placeholder="Product Name"
      />
      <label
        class="sr-only"
        for="description"
        >Description</label
      >
      <textarea
        class="border-1 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white border-gray-300"
        v-model="description"
        id="description"
        name="description"
        autocomplete="false"
        placeholder="Product Description"
      />
      <label
        class="sr-only"
        for="colors"
        >Colors</label
      >
      <input
        class="border-1 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-300"
        v-model="colors"
        type="text"
        id="colors"
        name="colors"
        autocomplete="true"
        placeholder="Colors"
      />
      <div class="justify-evenly flex">
        <Checkbox
          value="64"
          label="64GB"
        />
        <Checkbox
          value="128"
          label="128GB"
        />
        <Checkbox
          value="256"
          label="256GB"
        />
      </div>
      <label
        class="sr-only"
        for="price"
        >Price</label
      >
      <input
        v-model="price"
        type="number"
        id="price"
        name="price"
        autocomplete="true"
        placeholder="Price"
      />
      <label
        class="sr-only"
        for="quantity"
        >Quantity</label
      >
      <input
        v-model="quantity"
        type="number"
        id="quantity"
        name="quantity"
        autocomplete="true"
        placeholder="Quantity"
      />
      <label
        class="sr-only"
        for="category"
        >Category</label
      >
      <select
        class="bg-white"
        v-model="category"
        id="category"
        name="category"
        autocomplete="true"
        placeholder="Category"
      >
        <option
          value=""
          disabled
          selected
        >
          Select Category
        </option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <label
        class="sr-only"
        for="images"
        >Images</label
      >
      <input
        type="file"
        id="images"
        name="images"
        autocomplete="true"
        multiple
      />
      <button
        class="hover:bg-green-500 px-4 py-2 text-white bg-green-600 rounded-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>

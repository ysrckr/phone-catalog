<script setup lang="ts">
import { Product } from '../../types/products';
import ImageItem from './ImageItem.vue';

const props = defineProps<{
  product: Product;
}>();

const { product } = props;
</script>

<template>
  <div>
    <div class="flex flex-col items-center justify-center">
      <ImageItem :images="product.images" />
      <div class="flex flex-col items-center justify-center mt-4">
        <h2 class="text-xl font-bold text-center">{{ product.name }}</h2>
        <p class="text-lg font-bold text-center">{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <div class="text-center bg-green-100 drop-shadow-lg font-semibold mx-auto p-4">
    <h3 class="mb-5 p-2">{{ props.title }}</h3>
    <slot></slot>
  </div>
</template>
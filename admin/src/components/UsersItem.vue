<script lang="ts" setup>
import { capitalize } from '../utils/capitilize';
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="drop-shadow gap-y-2 flex flex-col p-4 mx-auto bg-green-200 rounded-md"
  >
    <h4 class="font-semibold text-center">{{ capitalize(props.name) }}</h4>
    <p class=" text-gray-600 cursor-pointer">
      <a :href="`mailto:${props.email}`">{{ props.email }}</a>
    </p>
    <p class="text-center">{{ capitalize(props.role) }}</p>
  </div>
</template>

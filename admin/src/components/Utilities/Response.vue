<script setup lang="ts">
import Error from '@/components/Utilities/Error.vue';
const props = {
  isLoading: {
    type: Boolean,
    required: true,
  },
  isError: {
    type: Boolean,
    required: true,
  },
  refetch: {
    type: Function,
    required: false,
  },
};
</script>

<template>
  <div
    v-if="props.isLoading"
    class="mx-auto mt-20"
  >
    <v-progress-circular
      color="green"
      model-value="20"
      :size="47"
    ></v-progress-circular>
  </div>
  <div v-if="props.isError">
    <Error
      v-if="props.isError && props.refetch"
      @refresh="props.refetch"
    />
    <p v-else>Error</p>
  </div>
</template>

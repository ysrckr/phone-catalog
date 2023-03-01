<script setup lang="ts">
const emit = defineEmits(['refresh']);
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 my-10">
    <div
      class="text-xxl flex flex-col items-center justify-center gap-2 text-center text-red-800"
    >
      <v-icon
        icon="mdi-alert-circle-outline"
        size="5rem"
      />
      <span class="inline-block"> Sorry, something went wrong. </span>
      <span class="inline-block"> Please try again later. </span>
    </div>
    <div>
      <v-btn
        @click="emit('refresh')"
        prepend-icon="mdi-reload"
        color="#14532d"
        class="text-white"
      >
        Refresh
      </v-btn>
    </div>
  </div>
</template>

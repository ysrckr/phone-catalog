<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 my-10">
    <div class="text-center text-red-800 text-xxl flex flex-col gap-2 items-center justify-center">
      <v-icon icon="mdi-alert-circle-outline" size="5rem"/>
      <span class="inline-block">
        Sorry, something went wrong.
      </span>
      <span class="inline-block">
        Please try again later.
      </span>
    </div>
    <div>
      <v-btn prepend-icon="mdi-reload" color="#14532d" class="text-white">
        Refresh
      </v-btn>
    </div>
  </div>
</template>
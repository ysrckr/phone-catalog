<script lang="ts" setup>
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
</script>
<template>
  <Header />
  <div class="flex h-screen relative gap-x-6">
    <Sidebar
      class="bg-[#374151d2] absolute top-0 left-0 h-screen w-2/3 md:w-1/4 lg:w-1/4 z-10 md:relative"
    />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

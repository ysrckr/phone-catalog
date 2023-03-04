<script lang="ts" setup>
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import { useUiStore } from '@/stores/uiStore';

const uiStore = useUiStore();
</script>
<template>
  <Header />
  <div class="flex flex-col">
    <div class="relative md:grid md:grid-cols-4 md:mr-4">
      <Sidebar />
      <main class="col-span-3">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

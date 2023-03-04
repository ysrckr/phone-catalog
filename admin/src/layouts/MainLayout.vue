<script lang="ts" setup>
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import { useUiStore } from '@/stores/uiStore';

const uiStore = useUiStore();
</script>
<template>
  <Header />
  <div class="flex flex-col">
    <div class="gap-x-6 relative flex">
      <Sidebar
        class="bg-[#2c8b44ca] absolute top-0 left-0 bottom-0 min-h-screen w-2/3 md:w-1/4 lg:w-1/4 z-10 md:relative md:h-min-screen"
      />
      <div
        class="left-2/3 md:left-1/4 top-1/3 bg-slate-600 absolute z-10 w-8 h-20 cursor-pointer"
      >
        <button
          v-show="!uiStore.isSidebarOpen"
          class="absolute px-8 py-4 text-white cursor-pointer right-[-2.25rem] top-1 z-30"
          @click="uiStore.openSidebar"
        >
          <v-icon
            icon="mdi-chevron-left"
            size="2.5rem"
          />
        </button>
        <button
          v-show="uiStore.isSidebarOpen"
          class="absolute px-8 py-4 text-white cursor-pointer right-[-2.25rem] top-1 z-30"
          @click="uiStore.closeSidebar"
        >
          <v-icon
            icon="mdi-chevron-right"
            size="2.5rem"
          />
        </button>
      </div>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

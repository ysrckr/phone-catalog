<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

</script>

<template >
  <aside v-bind="$attrs" v-if="authStore.isAuthenticated" class="flex flex-col gap-y-8 items-center p-20">
   <nav>
     <ul class="flex flex-col justify-evenly gap-y-10 font-semibold text-center text-gray-800">
        <li v-show="authStore.isAuthenticated">
          <router-link
            to="/users"
            :active-class="'text-gray-700 underline'"
          >
            Users
          </router-link>
        </li>
         <li v-show="authStore.isAuthenticated">
          <router-link
            to="/categories"
            :active-class="'text-gray-700 underline'"
          >
            Categories
          </router-link>
        </li>
        <li v-show="authStore.isAuthenticated">
          <router-link
            to="/products"
            :active-class="'text-gray-700 underline'"
          >
            Products
          </router-link>
        </li>
    </ul>
   </nav>
  </aside>
</template>

<script lang="ts" setup>

import { onMounted, ref } from "vue";
import { Email, Password, login } from "@/calls/login";
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from "vue-router";

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/dashboard');
  }
});

const email = ref('');
const password = ref('');
const errorMessage = ref<string>('');



const router = useRouter();
const authStore = useAuthStore();



const onLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields';
    return;
  }

  try {
    const response = await login({
      email: email.value,
      password: password.value,
    });
    if (response.id) {
      authStore.setUserId(response.id);
      authStore.setIsAuthenticated(true);
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (authStore.isAuthenticated) {
      router.push('/dashboard');
    }
  }


};


</script>

<template>
  <div class="container flex flex-col justify-center px-5 mt-10 text-center">
    <h1 class="text-2xl text-center">Login</h1>
    <form class="flex flex-col gap-4 mt-5">
      <input
        type="email"
        placeholder="Email"
        class="rounded-md"
        v-model="email"
        autocomplete="false"
      />
      <input
        type="password"
        placeholder="Password"
        class="rounded-md"
        v-model="password"
        autocomplete="false"
      />
      <button
        @click.prevent="onLogin"
        type="button"
        class="hover:bg-green-400 w-1/3 px-3 py-3 mx-auto mt-2 bg-green-300 rounded-md"
      >
        Login
      </button>
    </form>
    <p class="mt-5 font-semibold">
      <router-link to="/"> Don't have an account? </router-link>
    </p>
  </div>
</template>

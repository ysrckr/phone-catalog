<script lang="ts" setup>

import { onMounted, ref } from "vue";
import { login } from "@/calls/auth/login";
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import type { AxiosError } from "axios";
import { useLocalStorage } from "@/hooks/useLocalStorage";

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/dashboard');
  }
});

const [user, setUser] = useLocalStorage<string>('userId')
const email = ref('');
const password = ref('');

const router = useRouter();
const authStore = useAuthStore();

const onLogin = async () => {
  if (!email.value) {
    toast.error('Email is required');
    return;
  }

  if (!password.value) {
    toast.error('Password is required');
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
      setUser(response.id)
    }
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      toast.error('Invalid credentials');
      return;
    } else {
      toast.error('Something went wrong');
      return;
    }
  } finally {
    if (authStore.isAuthenticated) {
      router.push('/dashboard');
      toast.success('Logged in successfully');
    }
  }
};


</script>

<template>
  <div class="container flex flex-col justify-center px-5 mt-10 text-center mx-auto">
    <h1 class="text-2xl text-center">Login</h1>
    <form 
      class="flex flex-col gap-4 mt-5 mx-auto w-1/2" @submit.prevent="onLogin"
    >
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
        type="submit"
        class="hover:bg-green-400 px-3 py-3 mx-auto mt-2 bg-green-300 rounded-md"
      >
        Login
      </button>
    </form>
    <p class="mt-5 font-semibold">
      <router-link to="/"> Don't have an account? </router-link>
    </p>
  </div>
</template>

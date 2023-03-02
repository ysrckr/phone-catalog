<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/stores/authStore';
import { LoginUser } from '@/types/user';
import { type } from 'os';

const email = ref<keyof LoginUser>();
const password = ref<keyof LoginUser>();
const emailError = ref('');
const passwordError = ref('');
const authStore = useAuthStore();

const router = useRouter();

const onEmailChange = () => {
  emailError.value = '';
};

const onPasswordChange = () => {
  passwordError.value = '';
};

const onLogin = async () => {
  if (!email.value) {
    emailError.value = 'Email is required';
    return;
  }

  if (!password.value) {
    passwordError.value = 'Password is required';
    return;
  }

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    });
  } catch (error) {
    toast.error('Invalid credentials');
    return;
  }

  router.push('/dashboard');
};
</script>

<template>
  <div
    class="container flex flex-col justify-center px-5 mx-auto mt-10 text-center"
  >
    <h1 class="text-2xl text-center">Login</h1>
    <div class="p-5 m-4 bg-green-200 rounded-md">
      <form
        class="flex flex-col gap-4 mx-auto mt-5"
        @submit.prevent="onLogin"
      >
        <label
          for="email"
          class="sr-only"
        >
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          class="border-1 rounded-md"
          :class="{
            'border-red-500': emailError,
            ' border-gray-600': !emailError,
          }"
          v-model="email"
          autocomplete="false"
          id="email"
          @input="onEmailChange"
        />
        <span class="text-red-500">
          {{ emailError }}
        </span>
        <label
          for="password"
          class="sr-only"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          class="border-1 rounded-md"
          :class="{
            'border-red-500': emailError,
            'border-gray-600': !emailError,
          }"
          v-model="password"
          autocomplete="false"
          id="password"
          @input="onPasswordChange"
          min="8"
          max="50"
        />
        <span class="text-sm text-red-500">
          {{ passwordError }}
        </span>
        <button
          type="submit"
          class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-400"
        >
          Login
        </button>
      </form>
    </div>
    <!-- <p class="mt-5 font-semibold">
      <router-link to="/"> Don't have an account? </router-link>
    </p> -->
  </div>
</template>

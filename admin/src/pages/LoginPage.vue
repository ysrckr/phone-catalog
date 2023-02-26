<script lang="ts" setup>
import { useLogin } from "@/queries/useLogin";
import { ref } from "vue";
import type { Email, Password } from "@/queries/useLogin";
import { axiosAdminClient } from '../utils/axiosClient';

const email = ref<Email>('');
const password = ref<Password>('');
const enable = ref(false);

const { data: user, isError, isLoading } = useLogin(email.value, password.value, enable.value);

// const onLogin = () => {
//   if (email.value === '' || password.value === '') {
//     return;
//   }

//   enable.value = true;

//   if (!isError && !isLoading) {
//     email.value = '';
//     password.value = '';
//   }

//   console.log(user);
// };

const onLogin = () => {
  axiosAdminClient.post('/login', {
    email: email.value,
    password: password.value
  }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  })
}


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
      />
      <input
        type="password"
        placeholder="Password"
        class="rounded-md"
        v-model="password"
      />
      <button
        type="button"
        class="hover:bg-green-400 w-1/3 px-3 py-3 mx-auto mt-2 bg-green-300 rounded-md"
        @click="onLogin"
      >
        Login
      </button>
    </form>
    <p class="mt-5 font-semibold">
      <router-link to="/create-user"> Don't have an account? </router-link>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { createUser } from '@/calls/users/create';
import { CreateUserSchema, CreateUser } from '@/types/user';
import { useAuthStore } from '@/stores/authStore';
import { useQueryClient } from '@tanstack/vue-query';

const queryClient = useQueryClient();
const authStore = useAuthStore();

const name = ref<string>();
const email = ref<string>();
const password = ref<string>();
const confirmPassword = ref<string>();
const role = ref<'USER' | 'ADMIN' | 'Choose A Role'>('Choose A Role');

const { mutate } = useMutation({
  mutationFn: (user: CreateUser) => createUser(user, authStore.userId),
  onSuccess: () => {
    queryClient.invalidateQueries(['users']);
    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    role.value = 'Choose A Role';
  },
});

const onSubmit = () => {
  if (role.value === 'Choose A Role') {
    role.value = 'USER';
  }
  const user: CreateUser = {
    name: name.value as string,
    email: email.value as string,
    password: password.value as string,
    confirmPassword: confirmPassword.value as string,
    role: role.value || 'USER',
  };

  const isValid = CreateUserSchema.safeParse(user).success;
  if (!isValid) {
    return;
  }

  mutate(user);
};
</script>

<template>
  <div class="container px-4 pb-5 mx-auto">
    <form
      class="gap-y-4 flex flex-col items-center justify-center"
      @submit.prevent="onSubmit"
    >
      <label
        class="sr-only"
        for="name"
        >Name</label
      >
      <input
        type="text"
        placeholder="Name"
        autocomplete="true"
        id="name"
        v-model="name"
      />
      <label
        class="sr-only"
        for="email"
        >Email</label
      >
      <input
        type="email"
        placeholder="Email"
        autocomplete="true"
        id="email"
        v-model="email"
      />
      <label
        class="sr-only"
        for="password"
        >Password</label
      >
      <input
        type="password"
        placeholder="Password"
        id="password"
        autocomplete="false"
        v-model="password"
      />
      <label
        class="sr-only"
        for="confirm-password"
        >Confirm Password</label
      >
      <input
        type="password"
        placeholder="Confirm Password"
        autocomplete="false"
        id="confirm-password"
        v-model="confirmPassword"
      />
      <label
        class="sr-only"
        for="role"
        >Role</label
      >
      <select
        id="role"
        v-model="role"
      >
        <option
          disabled
          value="Choose A Role"
        >
          Choose A Role
        </option>
        <option value="ADMIN">Admin</option>
        <option value="USER">User</option>
      </select>
      <button
        type="submit"
        class="drop-shadow w-20 p-2 mx-auto text-sm text-center bg-white rounded"
      >
        Create
      </button>
    </form>
  </div>
</template>

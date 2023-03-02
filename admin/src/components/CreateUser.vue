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
const isNameValid = ref<boolean>(true);
const isEmailValid = ref<boolean>(true);
const isPasswordValid = ref<boolean>(true);
const isPassworsMatch = ref<boolean>(true);

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

  const userResult = CreateUserSchema.safeParse(user);
  if (!userResult.success) {
    const errors = userResult.error.issues;
    const errorMessages = errors.reduce((acc, error) => {
      acc[error.path[0]] = error.message;
      return acc;
    }, {} as Record<string, string>);

    if (errorMessages.name) {
      isNameValid.value = false;
    } else if (errorMessages.email) {
      isEmailValid.value = false;
    } else if (errorMessages.password) {
      isPasswordValid.value = false;
    } else if (password.value !== confirmPassword.value) {
      isPassworsMatch.value = false;
    }

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
        class="border-1 drop-shadow-sm border-gray-300"
        :class="{ 'border-red-500': !isNameValid }"
      />
      <p
        v-show="!isNameValid"
        class="text-xs italic text-red-500"
      >
        Name is required.
      </p>
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
          class="border-1 drop-shadow-sm border-gray-300"
          :class="{ 'border-red-500': !isEmailValid }"
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
          class="border-1 drop-shadow-sm border-gray-300"
          :class="{ 'border-red-500': !isPasswordValid }"
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
          class="border-1 drop-shadow-sm border-gray-300"
        />
        <label
          class="sr-only"
          for="role"
          >Role</label
        >
        <select
          id="role"
          v-model="role"
          class="border-1 drop-shadow-sm border-gray-300"
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
          class="drop-shadow hover:bg-green-500 w-20 p-2 mx-auto text-sm text-center text-white bg-green-600 rounded"
        >
          Create
        </button>
    </form>
  </div>
</template>

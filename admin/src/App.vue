<script lang="ts" setup>
import { auth } from './utils/authInterceptor';
import { UserRegisterInfo } from './utils/authInterceptor';
const user: UserRegisterInfo = {
  name: 'test',
  email: 'test@tt.com',
  password: 'test',
  role: 'ADMIN',
}
console.log(auth(user));
</script>

<template>
  <router-view></router-view>
</template>
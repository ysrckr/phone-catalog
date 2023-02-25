<script lang="ts" setup>
import { axiosClient } from './utils/axiosClient';
import {ref} from 'vue';



const createUser = async () => {
  const response = await axiosClient.post('/users', {
    name: 'John Doe',
    email: 'ali@ali.com',
    password: '123456',
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
const userId = ref('');
// createUser().then((data) => {
//   userId.value = data.id;
//   console.log(data);
// });

const createCategory = async (name: string) => {
  const response = await axiosClient.post('/categories', {
    name,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': userId.value || undefined,
    },
  })

  return response.data;
};

createCategory('Category 9').then((data) => {
  console.log(data);
});


</script>

<template>
  <router-view></router-view>
</template>
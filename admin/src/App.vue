<script lang="ts" setup>
import { axiosClient } from './utils/axiosClient';

axiosClient.interceptors.request.use((req) => {
  req.withCredentials = true;
  return req;
},
  (err) => Promise.reject(err)
);

const createUser = async () => {
  const response = await axiosClient.post('/users', {
    name: 'John Doe',
    email: 'jooon@tst.com',
    password: '123456',
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return {
    data: response.data,
    session: response.headers,
  };
};


createUser().then((data) => {
  console.log(data);
});
</script>

<template>
  <router-view></router-view>
</template>
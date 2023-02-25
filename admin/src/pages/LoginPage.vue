<template>
  <div class="container flex flex-col justify-center px-5 mt-10 text-center">
    <h1 class="text-2xl text-center">Login</h1>
    <form class="flex flex-col gap-4 mt-5">
      <input
        type="email"
        placeholder="Email"
        class="rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        class="rounded-md"
      />
      <button
        type="button"
        class="hover:bg-green-400 w-1/3 px-3 py-3 mx-auto mt-2 bg-green-300 rounded-md"
      >
        Login
      </button>
    </form>
    <p class="mt-5 font-semibold">
      <router-link to="/create-user"> Don't have an account? </router-link>
    </p>
  </div>
</template>

<template>
  <div class="container px-4 pb-5 mx-auto">
    <form class="gap-y-4 flex flex-col items-center justify-center">
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
      />
      <label
        class="sr-only"
        for="role"
        >Role</label
      >
      <select id="role">
        <option
          disabled
          selected
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

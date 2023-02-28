<template>
  <div class="container mx-auto px-4 pb-5">
    <form class="flex justify-center items-center flex-col gap-y-4">
      <label class="sr-only" for="name">Name</label>
      <input type="text" placeholder="Name" autocomplete="true" id="name"/>
      <label class="sr-only" for="email">Email</label>
      <input type="email" placeholder="Email" autocomplete="true" id="email"/>
      <label class="sr-only" for="password">Password</label>
      <input type="password" placeholder="Password" id="password"/>
      <label class="sr-only" for="confirm-password">Confirm Password</label>
      <input type="password" placeholder="Confirm Password" id="confirm-password"/>
      <label class="sr-only" for="role">Role</label>
      <select id="role">
        <option disabled selected>Choose A Role</option>
        <option value="ADMIN">Admin</option>
        <option value="USER">User</option>
      </select>
      <button type="submit" class="bg-white rounded drop-shadow text-center text-sm mx-auto w-20 p-2">Create</button>
    </form>
  </div>
</template>
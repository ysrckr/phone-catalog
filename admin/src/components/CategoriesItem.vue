<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div
    class="drop-shadow gap-y-4 container flex flex-col w-1/2 p-4 bg-green-200 rounded-md"
  >
    <h4 class="font-semibold text-center capitalize">{{ props.name }}</h4>
    <img
      :src="props.image || 'https://fakeimg.pl/200x300/#f1f6fa/000'"
      class="w-200 h-300 mx-auto"
    />
    <div class="flex justify-between items-center">
      <div>
        <button
          class="hover:bg-yellow-300 inline-flex items-center gap-2 py-2 pl-2 pr-4 text-gray-600 bg-yellow-400 rounded-md"
        >
          <v-icon
            icon="mdi-pencil"
            size="1.5rem"
          />
          Edit
        </button>
      </div>
      <div>
        <button
          class="hover:bg-red-400 inline-flex items-center gap-2 py-2 pl-2 pr-4 text-gray-200 bg-red-500 rounded-md"
        >
          <v-icon
            icon="mdi-delete"
            size="1.5rem"
          />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

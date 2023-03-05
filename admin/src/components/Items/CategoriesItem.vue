<script setup lang="ts">
import ButtonWithIcon from '../Utilities/ButtonWithIcon.vue';

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
    class="drop-shadow gap-y-4 flex flex-col p-4 bg-green-200 rounded-md max-w-xs"
  >
    <h4 class="font-semibold text-center capitalize">{{ props.name }}</h4>
    <img
      :src="props.image || 'https://fakeimg.pl/200x300/#f1f6fa/000'"
      class="w-200 h-300 mx-auto"
    />
    <div class="justify-evenly flex items-center">
      <div>
        <ButtonWithIcon
          icon="pencil"
          class="hover:bg-yellow-300 inline-flex items-center gap-2 py-2 pl-2 pr-4 text-gray-600 bg-yellow-400 rounded-md"
        >
          Edit
        </ButtonWithIcon>
      </div>
      <div>
        <ButtonWithIcon
          icon="delete"
          class="hover:bg-red-300 inline-flex items-center gap-2 py-2 pl-2 pr-4 text-gray-200 bg-red-400 rounded-md"
        >
          Delete
        </ButtonWithIcon>
      </div>
    </div>
  </div>
</template>

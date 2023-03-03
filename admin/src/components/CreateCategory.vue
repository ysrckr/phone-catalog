<script lang="ts" setup>
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { createCategory } from '@/api/category/create';
import { toast } from 'vue3-toastify';
import { useQueryClient } from '@tanstack/vue-query';



const name = ref<string>();
const image = ref<File>();

const queryClient = useQueryClient();
const createCategoryMutation = useMutation({
  mutationFn: createCategory,
  onSuccess: () => {
    toast.success('Category created');
    queryClient.invalidateQueries(['categories']);
  },
  onError: () => {
    toast.error('Error creating category');
  },
});


const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    image.value = file;
  }
 
};

const onSubmit = () => {
  const formData = new FormData();
  formData.append('name', name.value as string);
  formData.append('image', image.value as File);
  createCategoryMutation.mutate(formData);
};
</script>

<template>
  <div class="flex flex-col m-8">
    <form class="flex flex-col gap-y-8" @submit.prevent="onSubmit">
      <label for="title" class="sr-only">Name</label>
      <input 
        type="text" 
        v-model="name" 
        id="title" 
        name="name"
        class="border-1 drop-shadow-sm border-gray-300"
        placeholder="Category Name"
        min="3"
      />
      <label for="image" class="sr-only">Image</label>  
      <input 
        type="file" 
        @change="onFileChange" 
        id="image"
        name="image"
        class="border-1 drop-shadow-sm border-gray-300"
      />
      <button 
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
      >
        Create
      </button>
    </form>
  </div>
</template>
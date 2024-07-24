<template>
    <div class="p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-4">{{ isEdit ? 'Editar Producto' : 'Nuevo Producto' }}</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Nombre</label>
          <input v-model="form.name" type="text" id="name" class="mt-1 block w-full border rounded-lg p-2" required>
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700">Descripción</label>
          <textarea v-model="form.description" id="description" class="mt-1 block w-full border rounded-lg p-2" required></textarea>
        </div>
        <div class="mb-4">
          <label for="price" class="block text-gray-700">Precio</label>
          <input v-model.number="form.price" type="number" id="price" class="mt-1 block w-full border rounded-lg p-2" required>
        </div>
        <div class="mb-4">
          <label for="stock" class="block text-gray-700">Stock</label>
          <input v-model.number="form.stock" type="number" id="stock" class="mt-1 block w-full border rounded-lg p-2" required>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useProductStore } from '../stores/products';
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  const store = useProductStore();
  
  const isEdit = ref(false);
  const form = ref({
    name: '',
    description: '',
    price: 0,
    stock: 0
  });
  
  const submitForm = async () => {
    try {
      if (isEdit.value) {
        await store.updateProduct(route.params.id, form.value);
      } else {
        await store.createProduct(form.value);
      }
      router.push('/');
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };
  
  onMounted(() => {
    if (route.params.id) {
      isEdit.value = true;
      store.fetchProduct(route.params.id).then(product => {
        form.value = { ...product };
      });
    } else {
      isEdit.value = false;
    }
  });
  </script>
  

  
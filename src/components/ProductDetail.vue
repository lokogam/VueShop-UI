<template>
    <div class="p-6 bg-white shadow-md rounded-lg">
      <button @click="goBack" class="mb-4 text-blue-500 hover:underline">Volver a la lista</button>
      <div v-if="isLoading" class="text-center">Cargando...</div>
      <div v-else>
        <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
        <p class="text-gray-600 mb-4">{{ product.description }}</p>
        <p class="text-green-600 font-bold text-xl mb-4">
          ${{
            typeof product.price === "number"
              ? product.price.toFixed(2)
              : "0.00"
          }}
        </p>
        <p class="text-gray-500 mb-4">Stock: {{ product.stock }}</p>
        <button @click="editProduct(product.id)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Editar Producto</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useProductStore } from '../stores/products';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const store = useProductStore();
  const product = ref(null);
  const isLoading = ref(true);
  
  const fetchProduct = async (id) => {
    product.value = await store.fetchProduct(id);
    isLoading.value = store.isLoading;
  };
  
  const editProduct = (id) => {
    router.push(`/products/edit/${id}`);
  };
  
  const goBack = () => {
    router.back();
  };
  
  onMounted(() => {
    const id = router.currentRoute.value.params.id;
    fetchProduct(id);
  });
  </script>
  
  
  
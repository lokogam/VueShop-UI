<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Productos</h1>
    <div v-if="isLoading" class="text-center">Cargando...</div>
    <ul v-else class="space-y-4">
      <li
        v-for="product in products"
        :key="product.id"
        class="border p-4 rounded-lg shadow-sm"
      >
        <h2 class="text-xl font-semibold">{{ product.name }}</h2>
        <p class="text-gray-600">{{ product.description }}</p>
        <p class="text-green-600 font-bold">
          ${{
            typeof product.price === "number"
              ? product.price.toFixed(2)
              : "0.00"
          }}
        </p>

        <button
          @click="viewProduct(product.id)"
          class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ver Detalles
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/products";
import { useRouter } from 'vue-router';

const store = useProductStore();
const products = ref([]);
const isLoading = ref(true);
const router = useRouter();

const fetchProducts = async () => {
  products.value = await store.fetchProducts();
  isLoading.value = store.isLoading;
};

const viewProduct = (id) => {
  store.fetchProduct(id);
  router.push({ name: "ProductDetail", params: { id } });
};

onMounted(() => {
  fetchProducts();
});
</script>

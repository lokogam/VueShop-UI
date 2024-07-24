import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    product: null,
    errors: [],
    isLoading: false,
  }),
  actions: {
    async fetchProducts() {
      this.isLoading = true;
      try {
        const response = await axios.get("/api/products");
        this.products = response.data;
        // console.log("this.products", this.products);
        return this.products;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        return [];
      } finally {
        this.isLoading = false;
      }
    },
    async fetchProduct(id) {
      try {
        const response = await axios.get(`/api/products/${id}`);
        this.product = response.data;
        // console.log("product", response.data);
        return this.product;
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    },
    async createProduct(data) {
      this.errors = [];
      try {
        const response = await axios.post("/api/products", data);
        this.products.push(response.data);
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Error al crear el producto:", error);
        }
      }
    },
    async updateProduct(id, data) {
      this.errors = [];
      try {
        const response = await axios.put(`/api/products/${id}`, data);
        this.product = response.data;
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Error al actualizar el producto:", error);
        }
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`/api/products/${id}`);
        this.products = this.products.filter((product) => product.id !== id);
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    },
  },
});

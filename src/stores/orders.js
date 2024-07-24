import { defineStore } from "pinia";
import axios from "axios";

export const useOrderStore = defineStore("orders", {
  state: () => ({
    orders: [],
    order: null,
    errors: [],
    isLoading: false,
  }),
  actions: {
    async fetchOrders() {
      this.isLoading = true;
      try {
        const response = await axios.get("/api/orders");
        this.orders = response.data;
        // console.log("this.orders", this.orders);
        return this.orders;
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
        return [];
      } finally {
        this.isLoading = false;
      }
    },
    async fetchOrder(id) {
      try {
        const response = await axios.get(`/api/orders/${id}`);
        this.order = response.data;
        // console.log("order", response.data);
        return this.order;
      } catch (error) {
        console.error("Error al obtener la orden:", error);
      }
    },
    async createOrder(data) {
      this.errors = [];
      try {
        const response = await axios.post("/api/orders", data);
        this.orders.push(response.data);
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Error al crear la orden:", error);
        }
      }
    },
    async updateOrder(id, data) {
      this.errors = [];
      try {
        const response = await axios.put(`/api/orders/${id}`, data);
        this.order = response.data;
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Error al actualizar la orden:", error);
        }
      }
    },
    async deleteOrder(id) {
      try {
        await axios.delete(`/api/orders/${id}`);
        this.orders = this.orders.filter((order) => order.id !== id);
      } catch (error) {
        console.error("Error al eliminar la orden:", error);
      }
    },
  },
});

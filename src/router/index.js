import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/Register.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../components/ForgotPassword.vue"),
  },
  {
    path: "/password-reset/:token",
    name: "ResetPassword",
    component: () => import("../components/ResetPassword.vue"),
  },
  // ProductList.vue
  {
    path: "/product-list",
    name: "ProductList",
    component: () => import("../components/ProductList.vue"),
  },
  // ProductForm
  {
    path: "/product-form",
    name: "ProductForm",
    component: () => import("../components/ProductForm.vue"),
  },
  // ProductDetail
  {
    path: "/product-detail/:id",
    name: "ProductDetail",
    component: () => import("../components/ProductDetail.vue"),
  },
  // ProductEdit
  {
    path: "/products/edit/:id",
    name: "ProductEdit",
    component: () => import("../components/ProductForm.vue"),
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

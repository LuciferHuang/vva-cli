import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";
import homeRoutes from "./home";

const login = () => import("@/pages/login.vue");
const home = () => import("@/pages/home.vue");
const notFound = () => import("@/pages/notFound.vue");

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: login,
    meta: {
      title: "登录"
    }
  },
  {
    path: "/home",
    component: home,
    redirect: "/home/view",
    children: homeRoutes,
  },
  {
    path: '/:catchAll(.*)*',
    component: notFound,
  }
];

export default function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}

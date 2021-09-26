import { createSSRApp } from "vue";
import { sync } from "vuex-router-sync";
import App from "@/App.vue";
import createStore from "../store";
import createRouter from "../route";

export function createApp() {
  const router = createRouter();
  const store = createStore();
  sync(store, router);

  const app = createSSRApp(App);
  app.use(router).use(store);
  return { app, router, store };
}

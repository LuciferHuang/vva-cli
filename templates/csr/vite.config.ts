import { join } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";

function resolve(dir) {
  // @ts-ignore
  return join(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
      helper: resolve("src/helper"),
      config: resolve("src/helper/config"),
    },
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "./mock",
      localEnabled: true,
    }),
  ],
});

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { join } from "path";

function resolve(dir: string) {
  // @ts-ignore
  return join(__dirname, dir);
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_ASSET_URL,
    resolve: {
      alias: {
        "@": resolve("src"),
        components: resolve("src/components"),
        helper: resolve("src/helper"),
        config: resolve("src/helper/config"),
      },
    },
    plugins: [vue()],
  };
});

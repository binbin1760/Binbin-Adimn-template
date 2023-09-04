import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Conpoments from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [NaiveUiResolver()],
        imports: ["vue", "vue-router"],
        dts: "src/dts/auto-import.d.ts",
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        eslintrc: {
          enabled: true,
        },
      }),
      Conpoments({
        resolvers: [NaiveUiResolver()],
        deep: true,
        dirs: ["src/components"],
        dts: "src/dts/components.d.ts",
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          math: "always",
        },
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      proxy: {
        "/apis": {
          target: env.VITE_BASE_API,
          changeOrigin: true,
        },
      },
    },
  };
});

import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json";
import config from "./src/settings/config.json";
import Components from "unplugin-vue-components/vite";
import NutUIResolver from "@nutui/auto-import-resolver";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let name = `${config.prefix}${config.namespace}${config.name}`;
  let fileName =
    mode === "debug"
      ? `onein-h5-comp-template.dev`
      : `onein-h5-comp-template.${mode}`;
  if (mode === "debug") {
    name = `${config.prefix}${config.namespace}${config.name}${config.debugSuffix}`;
  }
  let defaultExternal = ["vue", "element-plus", "@vueuse/core", "axios"];
  if (mode === "prod") {
    defaultExternal = [...defaultExternal, ...Object.keys(pkg.dependencies)];
  }
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [NutUIResolver()],
      }),
    ],
    define: {
      "process.env": process.env,
    },
    build: {
      lib: {
        entry: resolve(__dirname, "src/lib/index.ts"),
        formats: ["iife", "es"],
        name: name || pkg.name,
        fileName: fileName,
      },
      rollupOptions: {
        external: defaultExternal,
        output: {
          globals: {
            vue: "Vue",
            "@vueuse/core": "core",
          },
          extend: true,
        },
      },
    },
  };
});

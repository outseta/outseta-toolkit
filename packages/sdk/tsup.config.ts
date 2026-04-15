import { defineConfig } from "tsup";

export default defineConfig([
  // ESM build for npm / bundlers
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    sourcemap: false,
    clean: true,
    target: "es2020",
    external: [],
    define: {
      __OUTSETA_SDK_MAJOR__: "0",
    },
  },
  // IIFE build for CDN / script tags
  {
    entry: ["src/index.ts"],
    format: ["iife"],
    globalName: "OutsetaSdk",
    sourcemap: false,
    clean: false,
    target: "es2020",
    noExternal: [/(.*)/],
    minify: true,
    outExtension: () => ({ js: ".iife.js" }),
    define: {
      __OUTSETA_SDK_MAJOR__: "0",
    },
  },
]);

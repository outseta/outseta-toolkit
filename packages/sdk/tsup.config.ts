import { defineConfig } from "tsup";

export default defineConfig({
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
});

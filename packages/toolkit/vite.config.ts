import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        "framer/overrides": resolve(
          __dirname,
          "src/framer/overrides/index.tsx"
        ),
        "framer/test": resolve(__dirname, "src/framer/overrides/test.tsx"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: (id) => {
        return id === "react" || id === "react-dom" || id.startsWith("react/");
      },
      output: {
        entryFileNames: "[name].js",
        format: "es",
      },
    },
    emptyOutDir: true,
    target: "es2020",
    sourcemap: false,
    minify: true,
  },
  esbuild: {
    target: "es2020",
    format: "esm",
  },
});

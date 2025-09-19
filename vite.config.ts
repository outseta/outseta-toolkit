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
      // Externalize deps that shouldn't be bundled
      external: (id) => {
        // Externalize React and related packages
        return id === "react" || id === "react-dom" || id.startsWith("react/");
      },
      output: {
        // Ensure entry file names match the expected structure
        entryFileNames: "[name].js",
        // Ensure proper ES module format
        format: "es",
      },
    },
    // Empty out the dist directory
    emptyOutDir: true,
    // Target modern browsers for better tree shaking
    target: "es2020",
    // Enable source maps for debugging
    sourcemap: false,
    // Ensure proper module format
    minify: true,
  },
  // Enable TypeScript support
  esbuild: {
    target: "es2020",
    format: "esm",
  },
});

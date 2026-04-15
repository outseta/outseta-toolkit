import { defineConfig } from "tsup";
import type { Plugin } from "esbuild";

// Maps external imports to window globals for IIFE builds
function globalsPlugin(globals: Record<string, string>): Plugin {
  const filter = new RegExp(
    `^(${Object.keys(globals)
      .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})$`
  );
  return {
    name: "globals",
    setup(build) {
      build.onResolve({ filter }, (args) => ({
        path: args.path,
        namespace: "globals",
      }));
      build.onLoad({ filter: /.*/, namespace: "globals" }, (args) => ({
        contents: `module.exports = ${globals[args.path]}`,
        loader: "js",
      }));
    },
  };
}

export default defineConfig([
  // ESM build for npm / bundlers
  {
    entry: ["src/framer/overrides/index.tsx"],
    format: ["esm"],
    dts: true,
    sourcemap: false,
    clean: true,
    target: "es2020",
    external: ["react", "react-dom"],
  },
  // IIFE build for CDN / script tags
  {
    entry: ["src/framer/overrides/index.tsx"],
    format: ["iife"],
    globalName: "OutsetaToolkit",
    sourcemap: false,
    clean: false,
    target: "es2020",
    noExternal: [/@outseta\/sdk/, /@outseta\/react/, /@nanostores\/react/],
    minify: true,
    outExtension: () => ({ js: ".iife.js" }),
    esbuildPlugins: [
      globalsPlugin({
        react: "window.React",
        "react-dom": "window.ReactDOM",
      }),
    ],
  },
]);

import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        billboard: resolve(__dirname, "src/billboard/index.html"),
        recommendations: resolve(__dirname, "src/recommendations/index.html"),
      },
    },
  },
});

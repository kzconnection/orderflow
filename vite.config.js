import { defineConfig } from "vite";
import viteRawPlugin from "./vite-raw-plugin.js";

export default defineConfig({
  plugins: [
    viteRawPlugin({
      fileRegex: /\.navy$/,
    })
  ],
});

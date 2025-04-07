// @ts-check
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import db from "@astrojs/db";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact({
      compat: true,
    }),
    db(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: vercel(),
});

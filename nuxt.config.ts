import tailwindcss from "@tailwindcss/vite";
import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  srcDir: "app/",
  css: ["~/assets/css/main.css"],
  imports: {
    dirs: ["stores"],
  },
  // primevue: {
  //   options: {
  //     theme: {
  //       preset: Aura,
  //       options: {
  //         cssLayer: {
  //           name: "primevue",
  //           order: "tailwind-base, primevue, tailwind-utilities",
  //         },
  //       },
  //     },
  //   },
  // },
  primevue: {
    importTheme: { as: 'Aura',from: '@/themes/pThemes.ts' },
    options: {
      theme: {
        // preset: definePreset(Aura, {
        //   semantic: {
        //     primary: {
        //       50: "{indigo.50}",
        //       100: "{indigo.100}",
        //       200: "{indigo.200}",
        //       300: "{indigo.300}",
        //       400: "{indigo.400}",
        //       500: "{indigo.500}",
        //       600: "{indigo.600}",
        //       700: "{indigo.700}",
        //       800: "{indigo.800}",
        //       900: "{indigo.900}",
        //       950: "{indigo.950}",
        //     },
        //   },
        // }),
        options: { cssLayer: false },
      },
    },
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@pinia/colada-nuxt",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    families: [
      { name: "Geist", provider: "google" },
      // { name: 'Mona Sans', provider: 'google' },
      // { name: 'Hubot Sans', provider: 'google' },
      // { name: 'Geist Mono', provider: 'google' },
      // { name: 'Bricolage Grotesque', provider: 'google' }
    ],
    experimental: {
      processCSSVariables: true,
    },
  },
});

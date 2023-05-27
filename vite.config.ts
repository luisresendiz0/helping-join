import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        "vite.svg",
        "android-launchericon-192-192.png",
        "android-launchericon-512x512.png",
      ],
      manifest: {
        name: "Helping Join",
        short_name: "Helping Join",
        description:
          "Vinculación de organizaciones de beneficencia e independientes con voluntarios",
        theme_color: "#ffffff",
        icons: [
          {
            src: "android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-launchericon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "android-launchericon-512x512.png",
            sizes: "512x512",
            type: "any maskable",
          },
        ],
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 2000,
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes("node_modules")) {
    //         return id
    //           .toString()
    //           .split("node_modules/")[1]
    //           .split("/")[0]
    //           .toString();
    //       }
    //     },
    //   },
    // },
  },
});

import path from "node:path"
import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // MillionLint.vite(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Chatx Inbox",
        short_name: "Chatx",
        description: "Chatx Inbox",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "form-specific": ["zod", "react-hook-form", "@hookform/resolvers"]
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/shared/ui"),
      "@utils": path.resolve(__dirname, "./src/shared/lib/utils"),
      "@lib": path.resolve(__dirname, "./src/shared/lib")
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
})

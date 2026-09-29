// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://alpha-6dxp.onrender.com/',
//         changeOrigin: true
//       }
//     }
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   manifest: {
    //     name: 'Alpha AI',
    //     short_name: 'Alpha',
    //     description: 'Alpha AI Assistant',
    //     theme_color: '#000000',
    //     background_color: '#000000',
    //     display: 'standalone'
    //   }
    // })
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.svg",
        "apple-touch-icon.png"
      ],

      manifest: {
        name: "Alpha AI",
        short_name: "Alpha",
        description: "Alpha AI Assistant",

        start_url: "/",

        display: "standalone",

        background_color: "#000000",

        theme_color: "#000000",

        orientation: "portrait",

        icons: [
          {
            src: "pwa-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],

  server: {
    proxy: {
      '/api': {
        target: 'https://alpha-6dxp.onrender.com/',
        changeOrigin: true
      }
    }
  }
})
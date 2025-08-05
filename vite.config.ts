// Base
import { resolve } from 'path';
import { defineConfig } from 'vite';
// Plugins
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import autoprefixer from 'autoprefixer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    // React
    react(),

    // Tailwind CSS
    tailwindcss(),

    /* Configure Vite plugins for production optimizations */
    // Optimize images
    ViteImageOptimizer({
      logStats: true,
      jpeg: { quality: 75 },
      png: { quality: 75 },
      webp: { quality: 75 },
    }),

    // Enable Service Worker for PWA
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SkillGro | Your Skill Growth Platform',
        short_name: 'SkillGro',
        lang: 'en',
        description:
          'We offer a wide range of top-rated courses in various subjects, taught by expert instructors. Whatever you are looking to advance your career',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' ||
              request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 Year
              },
            },
          },
        ],
      },
    }),
  ],

  //Configure PostCSS for autoprefixer (cross-browser CSS support)
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['last 2 versions', '> 1%'], // Ensure compatibility
        }),
      ],
    },
  },
});

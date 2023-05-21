import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import liveReload from 'vite-plugin-live-reload';

export default defineConfig({
    plugins: [
      vue(),
      liveReload(`${__dirname}/**/*\.php`),
      viteStaticCopy({
        targets: [
          { src: './resources/libs', dest: '.' },
        ],
      }),
    ],
    build: {
      outDir: 'assets',
      assetsDir: '.', // All are from rollupOptions
      emptyOutDir: true, // delete the contents of the output directory before each build
      rollupOptions: {
        input: [
          'resources/js/app.js',
          'resources/scss/app.scss',
        ],
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`
        }
      }
    },
    server: {
        port: 1212,
        strictPort: true,
        hmr: {
          port: 1212,
          host: 'localhost',
          protocol: 'ws',
        }
    }
})
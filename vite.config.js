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
          chunkFileNames: 'js/[name].js',
          entryFileNames: 'js/[name].js',
          
          assetFileNames: ({name}) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
                return 'images/[name]-[hash][extname]';
            }
            
            if (/\.css$/.test(name ?? '')) {
                return 'css/[name][extname]';   
            }
   
            // default value
            // ref: https://rollupjs.org/guide/en/#outputassetfilenames
            return '[name]-[hash][extname]';
          },
        },
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
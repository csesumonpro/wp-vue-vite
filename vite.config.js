import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
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
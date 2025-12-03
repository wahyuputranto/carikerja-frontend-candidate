import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('[PROXY] Error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('[PROXY] Sending Request:', req.method, req.url);
            // Set headers to bypass CORS
            proxyReq.setHeader('Origin', 'http://localhost:9090');
            proxyReq.setHeader('Referer', 'http://localhost:9090/');
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('[PROXY] Received Response:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  }
})

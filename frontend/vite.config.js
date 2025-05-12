import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Client dev server port
    proxy: {
      // Proxy API requests to the backend
      '/api': {
        target: 'http://localhost:3001', // Your backend server address
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // if your backend doesn't expect /api prefix
      }
    }
  },
  // Required for wagmi/RainbowKit Buffer issues
  define: {
    'global': 'globalThis'
  },
  resolve: {
    alias: {
      // process: "process/browser", // If you face 'process is not defined'
      // stream: "stream-browserify", // If you face issues with stream
      // zlib: "browserify-zlib", // If you face issues with zlib
      // util: "util", // If you face issues with util
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        // You might need rollup-plugin-node-polyfills for some dependencies
        // import nodePolyfills from 'rollup-plugin-node-polyfills';
        // nodePolyfills()
      ]
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        // NodeGlobalsPolyfillPlugin({
        //   process: true,
        //   buffer: true,
        // }),
        // NodeModulesPolyfillPlugin()
      ]
    }
  }
})

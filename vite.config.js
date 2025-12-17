import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Keep React and ReactDOM together in main chunk to avoid instance duplication
            if (id.includes('react') || id.includes('react-dom')) return;
            if (id.includes('recharts')) return 'charts';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('@radix-ui')) return 'ui-components';
            return 'vendor';
          }
        },
      },
    },
  },
})

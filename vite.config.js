import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Keep config minimal to avoid bundling React multiple times
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    dedupe: ['react', 'react-dom'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
})

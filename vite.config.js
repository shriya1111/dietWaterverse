import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    include: ['three', '@threlte/core', '@threlte/extras', 'katex']
  },
  build: {
    target: 'es2015'
  }
})

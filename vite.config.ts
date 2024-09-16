import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.BASE_URL': JSON.stringify(env.BASE_URL),
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    },
    plugins: [react()],
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: '[local]_[hash:base64:2]',
      }
    }
  }
})

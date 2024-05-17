import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pomodoro-app/', // Ajusta esto si estás sirviendo desde un subdirectorio

})

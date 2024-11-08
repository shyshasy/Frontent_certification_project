import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  publicDir: 'public', // Assurez-vous que cela est correct
  resolve: {
    alias: {
      // Vous pouvez ajouter des alias si nécessaire
    }
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'emoji-picker' // Accepter l'élément personnalisé emoji-picker
    }
  }
});

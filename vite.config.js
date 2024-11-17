import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  publicDir: 'public', // Assurez-vous que cela est correct
  resolve: {
    alias: {
      '@': '/src', // Ajoute cet alias pour que "@" pointe vers le dossier src
    }
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'emoji-picker' // Accepter l'élément personnalisé emoji-picker
    }
  }
});

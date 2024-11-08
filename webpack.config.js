module.exports = {
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'emoji-picker', // Assurez-vous que ceci est bien défini
    }
  }
};

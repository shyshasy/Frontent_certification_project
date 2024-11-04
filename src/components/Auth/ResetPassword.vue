<template>
    <div class="reset-password-container">
      <h2>Réinitialiser votre mot de passe</h2>
      <form @submit.prevent="handleResetPassword">
        <div class="form-group">
          <label for="email">Entrez votre email :</label>
          <input type="email" v-model="email" id="email" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Réinitialiser le mot de passe</button>
      </form>
      <div v-if="message" class="alert alert-success mt-3">{{ message }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const message = ref('');
  
  const handleResetPassword = () => {
    // Logique pour la réinitialisation du mot de passe (API ou autre)
    message.value = `Un lien de réinitialisation a été envoyé à ${email.value}`;
  };
  </script>
  
  <style scoped>
  .reset-password-container {
    max-width: 400px;
    margin: auto;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 12px;
    background: #f9f9f9;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  </style>
  
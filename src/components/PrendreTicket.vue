<template>
    <div class="ticket-form">
      <h2>Demander un ticket</h2>
      <form @submit.prevent="demanderTicket">
        <label for="clientName">Nom du client:</label>
        <input type="text" id="clientName" v-model="clientName" required />
        <button type="submit" :disabled="loading">
          {{ loading ? 'Chargement...' : 'Obtenir un Ticket' }}
        </button>
        <div v-if="ticket">
          <p>Votre ticket a été créé ! Numéro: {{ ticket.numero }}</p>
          <p>Votre position dans la file d'attente: {{ ticket.position }}.</p>
          <p>Vous allez recevoir un SMS avec votre position.</p>
        </div>
        <div v-if="ticket && !feedbackSubmitted">
          <h3>Évaluer le service</h3>
          <select v-model="feedback">
            <option value="excellent">Excellent</option>
            <option value="bon">Bon</option>
            <option value="moyenne">Moyenne</option>
            <option value="mediocre">Médiocre</option>
            <option value="nul">Nul</option>
          </select>
          <button type="button" @click="submitFeedback">Envoyer Évaluation</button>
        </div>
        <div v-if="feedbackSubmitted">
          <p>Merci pour votre évaluation !</p>
        </div>
      </form>
    </div>
  </template>
  
  <script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const clientName = ref('');
    const ticket = ref(null);
    const loading = ref(false);
    const feedback = ref('');
    const feedbackSubmitted = ref(false);

    // Récupérer le jeton depuis le stockage (localStorage dans cet exemple)
    const token = localStorage.getItem('authToken');  // Adaptez cela selon votre gestion du jeton

    const demanderTicket = async () => {
      if (!clientName.value) return;

      loading.value = true;
      try {
        const response = await axios.post(
          'http://localhost:5002/api/tickets',
          { clientName: clientName.value },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Inclure le jeton d'authentification
            },
          }
        );
        ticket.value = response.data.ticket;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Jeton d\'authentification invalide ou expiré');
        } else {
          console.error('Erreur lors de la demande de ticket', error);
        }
      } finally {
        loading.value = false;
      }
    };

    const submitFeedback = async () => {
      if (!feedback.value) return;

      try {
        await axios.post(
          'http://localhost:5002/api/tickets/feedback',
          { ticketId: ticket.value.numero, feedback: feedback.value },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Inclure le jeton d'authentification
            },
          }
        );
        feedbackSubmitted.value = true;
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'évaluation', error);
      }
    };

    return {
      clientName,
      ticket,
      loading,
      feedback,
      feedbackSubmitted,
      demanderTicket,
      submitFeedback,
    };
  },
};
</script>

  
  <style scoped>
  .ticket-form {
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
  }
  
  input {
    padding: 0.5rem;
    margin: 1rem 0;
    width: 100%;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ccc;
  }
  
  select {
    margin-top: 1rem;
  }
  </style>
  
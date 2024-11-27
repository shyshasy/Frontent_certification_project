import { ref, computed } from 'vue';
import axios from 'axios';

export function useTicketStore() {
  const tickets = ref([]);
  const ticketNotification = ref('');
  const loading = ref(false);

  // Getters
  const allTickets = computed(() => tickets.value);
  const notification = computed(() => ticketNotification.value);
  const isLoading = computed(() => loading.value);

  // Actions
  const fetchTickets = async () => {
    loading.value = true;
    try {
      const response = await axios.get('http://localhost:5002/api/tickets');
      tickets.value = response.data;
      
    } catch (error) {
      ticketNotification.value = 'Erreur lors du chargement des tickets';
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const addTicket = async (nom, telephone, numero, statut, guichet_id, utilisateur_id) => {
    try {
      const response = await axios.post('http://localhost:5002/api/tickets', {nom, telephone, numero, statut, guichet_id, utilisateur_id} );
      tickets.value.push(response.data);
      ticketNotification.value = 'Ticket ajouté avec succès !';
    } catch (error) {
      ticketNotification.value = "Erreur lors de l'ajout du ticket";
      console.error(error);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/tickets/${id}`);
      tickets.value = tickets.value.filter((ticket) => ticket.id !== id);
      ticketNotification.value = 'Ticket supprimé avec succès !';
    } catch (error) {
      ticketNotification.value = "Erreur lors de la suppression du ticket";
      console.error(error);
    }
  };

  return {
    // State
    tickets,
    ticketNotification,
    loading,

    // Getters
    allTickets,
    notification,
    isLoading,

    // Actions
    fetchTickets,
    addTicket,
    deleteTicket,
  };
}

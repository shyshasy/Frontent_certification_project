<template>
    <div>
      <h2>Gestion des Tickets</h2>
      <select v-model="selectedQueue">
        <option v-for="queue in queues" :key="queue.id" :value="queue.id">
          {{ queue.name }}
        </option>
      </select>
      <button @click="takeTicket">Prendre un ticket</button>
  
      <ul>
        <li v-for="ticket in tickets" :key="ticket.id">
          {{ ticket.number }} - {{ ticket.status }}
          <button @click="editTicket(ticket)">Éditer</button>
          <button @click="removeTicket(ticket.id)">Supprimer</button>
        </li>
      </ul>
  
      <div v-if="editingTicket">
        <h3>Édition du ticket</h3>
        <form @submit.prevent="updateTicket">
          <input v-model="editingTicket.status" />
          <button type="submit">Mettre à jour</button>
          <button @click="cancelTicketEdit">Annuler</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  function TicketManagement(queues, tickets) {
    const selectedQueue = ref(null);
    const editingTicket = ref(null);
  
    const takeTicket = () => {
      if (selectedQueue.value) {
        const queue = queues.find((q) => q.id === selectedQueue.value);
        if (queue && queue.tickets.length < queue.size) {
          const ticket = {
            id: Date.now(),
            number: queue.tickets.length + 1,
            queueId: queue.id,
            status: 'En attente',
            issueDate: new Date(),
          };
          queue.tickets.push(ticket);
          tickets.push(ticket);
        }
      }
    };
  
    const editTicket = (ticket) => {
      editingTicket.value = { ...ticket };
    };
  
    const cancelTicketEdit = () => {
      editingTicket.value = null;
    };
  
    const updateTicket = () => {
      const ticketIndex = tickets.findIndex((ticket) => ticket.id === editingTicket.value.id);
      if (ticketIndex !== -1) {
        tickets[ticketIndex] = editingTicket.value;
      }
      editingTicket.value = null;
    };
  
    const removeTicket = (ticketId) => {
      const ticketIndex = tickets.findIndex((ticket) => ticket.id === ticketId);
      if (ticketIndex !== -1) {
        tickets.splice(ticketIndex, 1);
      }
      const queue = queues.find((q) => q.id === selectedQueue.value);
      if (queue) {
        queue.tickets = queue.tickets.filter((ticket) => ticket.id !== ticketId);
      }
    };
  
    return {
      selectedQueue,
      editingTicket,
      takeTicket,
      editTicket,
      cancelTicketEdit,
      updateTicket,
      removeTicket,
    };
  }
  
  export function useTicketManagement(queues, tickets) {
    return TicketManagement(queues, tickets);
  }
  </script>
  
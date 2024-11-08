<template>
    <div>
      <h2>Gestion des Files d'attente</h2>
      <form @submit.prevent="addQueue">
        <input v-model="newQueueName" placeholder="Nom de la file" required />
        <input v-model="newQueueSize" type="number" placeholder="Taille de la file" required />
        <button type="submit">Ajouter</button>
      </form>
  
      <ul>
        <li v-for="queue in queues" :key="queue.id">
          {{ queue.name }} - {{ queue.size }} places
          <button @click="editQueue(queue)">Éditer</button>
          <button @click="removeQueue(queue.id)">Supprimer</button>
        </li>
      </ul>
  
      <div v-if="editingQueue">
        <h3>Édition de la file</h3>
        <form @submit.prevent="updateQueue">
          <input v-model="editingQueue.name" />
          <input v-model="editingQueue.size" type="number" />
          <button type="submit">Mettre à jour</button>
          <button @click="cancelEdit">Annuler</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export function QueueManagement() {
    const queues = ref([]);
    const newQueueName = ref('');
    const newQueueSize = ref(null);
    const editingQueue = ref(null);
  
    const addQueue = () => {
      const newQueue = {
        id: Date.now(),
        name: newQueueName.value,
        size: newQueueSize.value,
        tickets: [],
      };
      queues.value.push(newQueue);
      newQueueName.value = '';
      newQueueSize.value = null;
    };
  
    const editQueue = (queue) => {
      editingQueue.value = { ...queue };
    };
  
    const cancelEdit = () => {
      editingQueue.value = null;
    };
  
    const updateQueue = () => {
      const queueIndex = queues.value.findIndex((queue) => queue.id === editingQueue.value.id);
      if (queueIndex !== -1) {
        queues.value[queueIndex] = editingQueue.value;
      }
      editingQueue.value = null;
    };
  
    const removeQueue = (queueId) => {
      queues.value = queues.value.filter((queue) => queue.id !== queueId);
    };
  
    return {
      queues,
      newQueueName,
      newQueueSize,
      editingQueue,
      addQueue,
      editQueue,
      cancelEdit,
      updateQueue,
      removeQueue,
    };
  }
  </script>
  
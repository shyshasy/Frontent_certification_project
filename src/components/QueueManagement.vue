<template>
    <div class="container mt-5">
        <h2 class="text-center mb-4">Gestion des Files d'Attente</h2>

      
        <form @submit.prevent="addQueue" class="mb-4 shadow p-4 rounded bg-light">
            <h4>Ajouter une File d'Attente</h4>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <input v-model="newQueueName" class="form-control" placeholder="Nom de la nouvelle file" required />
                </div>
                <div class="col-md-4 mb-3">
                    <input v-model="newQueueSize" type="number" class="form-control" placeholder="Taille de la file" required min="0" />
                </div>
                <div class="col-md-2 mb-3">
                    <button type="submit" class="btn btn-primary w-100">Ajouter</button>
                </div>
            </div>
        </form>

       
        <div class="row">
            <div class="col-md-6" v-for="queue in queues" :key="queue.id">
                <div class="card mb-3 shadow">
                    <div class="card-body">
                        <h5 class="card-title">{{ queue.name }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Capacité: {{ queue.size }} personnes</h6>
                        <div class="progress mb-3">
                            <div class="progress-bar" role="progressbar" :style="{ width: `${getQueueProgress(queue)}%` }" :aria-valuenow="getQueueProgress(queue)" aria-valuemin="0" aria-valuemax="100">{{ getQueueProgress(queue) }}%</div>
                        </div>
                        <div>
                            <button @click="editQueue(queue)" class="btn btn-warning btn-sm me-2">Modifier</button>
                            <button @click="removeQueue(queue.id)" class="btn btn-danger btn-sm">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

       
        <div v-if="editingQueue" class="mt-4">
            <h3>Modifier la File d'Attente</h3>
            <form @submit.prevent="updateQueue" class="mb-3 shadow p-4 rounded bg-light">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <input v-model="editingQueue.name" class="form-control" placeholder="Nom" required />
                    </div>
                    <div class="col-md-4 mb-3">
                        <input v-model="editingQueue.size" type="number" class="form-control" placeholder="Taille" required min="0" />
                    </div>
                    <div class="col-md-2 mb-3">
                        <button type="submit" class="btn btn-success w-100">Mettre à jour</button>
                        <button type="button" @click="cancelEdit" class="btn btn-secondary w-100">Annuler</button>
                    </div>
                </div>
            </form>
        </div>

      
        <div class="mt-5">
            <h3>Prise de Ticket</h3>
            <form @submit.prevent="takeTicket" class="mb-4 shadow p-4 rounded bg-light">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <select v-model="selectedQueue" class="form-control" required>
                            <option value="" disabled>Sélectionner une file</option>
                            <option v-for="queue in queues" :key="queue.id" :value="queue.id">{{ queue.name }}</option>
                        </select>
                    </div>
                    <div class="col-md-2 mb-3">
                        <button type="submit" class="btn btn-success w-100">Prendre un Ticket</button>
                    </div>
                </div>
            </form>

         
            <h4 class="mt-4">Tickets en Attente</h4>
            <ul class="list-group">
                <li v-for="ticket in tickets" :key="ticket.id" class="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                        Ticket #{{ ticket.number }} - Guichet: {{ ticket.counterName }} - File: {{ getQueueName(ticket.queueId) }} - Position: {{ getTicketPosition(ticket) }} - Statut: {{ ticket.status }} - Utilisateur: {{ ticket.createdBy }}
                    </span>
                    <span>Date d'émission: {{ ticket.issueDate }}</span>
                    <div>
                        <button @click="editTicket(ticket)" class="btn btn-warning btn-sm me-2">Modifier</button>
                        <button @click="removeTicket(ticket.id)" class="btn btn-danger btn-sm">Supprimer</button>
                    </div>
                </li>
            </ul>
        </div>

        <div v-if="editingTicket" class="mt-4">
            <h3>Modifier le Ticket</h3>
            <form @submit.prevent="updateTicket" class="mb-3 shadow p-4 rounded bg-light">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <input v-model="editingTicket.number" class="form-control" placeholder="Numéro de Ticket" required />
                    </div>
                    <div class="col-md-4 mb-3">
                        <input v-model="editingTicket.queueId" type="number" class="form-control" placeholder="ID de File" required />
                    </div>
                    <div class="col-md-2 mb-3">
                        <button type="submit" class="btn btn-success w-100">Mettre à jour</button>
                        <button type="button" @click="cancelTicketEdit" class="btn btn-secondary w-100">Annuler</button>
                    </div>
                </div>
            </form>
        </div>

       
        <div class="mt-5">
            <h3>Gestion des Guichets</h3>
            <form @submit.prevent="addCounter" class="mb-4 shadow p-4 rounded bg-light">
                <h4>Ajouter un Guichet</h4>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <input v-model="newCounterName" class="form-control" placeholder="Nom du guichet" required />
                    </div>
                    <div class="col-md-4 mb-3">
                        <input v-model="newCounterManager" class="form-control" placeholder="Responsable" required />
                    </div>
                    <div class="col-md-2 mb-3">
                        <button type="submit" class="btn btn-primary w-100">Ajouter Guichet</button>
                    </div>
                </div>
            </form>

           
            <h4 class="mt-4">Guichets Enregistrés</h4>
            <ul class="list-group">
                <li v-for="counter in counters" :key="counter.id" class="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                        Guichet #{{ counter.id }}: {{ counter.name }} - Responsable: {{ counter.manager }} - Statut: {{ counter.status }}
                    </span>
                    <div>
                        <button @click="editCounter(counter)" class="btn btn-warning btn-sm me-2">Modifier</button>
                        <button @click="removeCounter(counter.id)" class="btn btn-danger btn-sm">Supprimer</button>
                    </div>
                </li>
            </ul>
        </div>

       
        <div v-if="editingCounter" class="mt-4">
            <h3>Modifier le Guichet</h3>
            <form @submit.prevent="updateCounter" class="mb-3 shadow p-4 rounded bg-light">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <input v-model="editingCounter.name" class="form-control" placeholder="Nom" required />
                    </div>
                    <div class="col-md-4 mb-3">
                        <input v-model="editingCounter.manager" class="form-control" placeholder="Responsable" required />
                    </div>
                    <div class="col-md-2 mb-3">
                        <button type="submit" class="btn btn-success w-100">Mettre à jour</button>
                        <button type="button" @click="cancelCounterEdit" class="btn btn-secondary w-100">Annuler</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queues: [],
            tickets: [],
            counters: [],
            newQueueName: '',
            newQueueSize: '',
            editingQueue: null,
            editingTicket: null,
            editingCounter: null,
            newCounterName: '',
            newCounterManager: '',
            selectedQueue: null,
        };
    },
    methods: {
        addQueue() {
            const newQueue = {
                id: Date.now(),
                name: this.newQueueName,
                size: this.newQueueSize,
            };
            this.queues.push(newQueue);
            this.newQueueName = '';
            this.newQueueSize = '';
        },
        editQueue(queue) {
            this.editingQueue = { ...queue }; 
        },
        updateQueue() {
            const index = this.queues.findIndex(q => q.id === this.editingQueue.id);
            if (index !== -1) {
                this.queues[index] = this.editingQueue;
                this.editingQueue = null; 
            }
        },
        removeQueue(id) {
            this.queues = this.queues.filter(q => q.id !== id);
        },
        takeTicket() {
            const ticketNumber = this.tickets.length + 1;
            const newTicket = {
                id: Date.now(),
                number: ticketNumber,
                queueId: this.selectedQueue,
                createdBy: 'Utilisateur', 
                issueDate: new Date().toLocaleString(),
                status: 'En attente',
            };
            this.tickets.push(newTicket);
            this.selectedQueue = null; 
        },
        editTicket(ticket) {
            this.editingTicket = { ...ticket }; 
        },
        updateTicket() {
            const index = this.tickets.findIndex(t => t.id === this.editingTicket.id);
            if (index !== -1) {
                this.tickets[index] = this.editingTicket;
                this.editingTicket = null; 
            }
        },
        removeTicket(id) {
            this.tickets = this.tickets.filter(t => t.id !== id);
        },
        addCounter() {
            const newCounter = {
                id: Date.now(),
                name: this.newCounterName,
                manager: this.newCounterManager,
                status: 'Actif', 
            };
            this.counters.push(newCounter);
            this.newCounterName = '';
            this.newCounterManager = '';
        },
        editCounter(counter) {
            this.editingCounter = { ...counter }; 
        },
        updateCounter() {
            const index = this.counters.findIndex(c => c.id === this.editingCounter.id);
            if (index !== -1) {
                this.counters[index] = this.editingCounter;
                this.editingCounter = null; 
            }
        },
        removeCounter(id) {
            this.counters = this.counters.filter(c => c.id !== id);
        },
        cancelEdit() {
            this.editingQueue = null;
        },
        cancelTicketEdit() {
            this.editingTicket = null;
        },
        cancelCounterEdit() {
            this.editingCounter = null;
        },
        getQueueProgress(queue) {
            const totalSize = queue.size;
            const totalTickets = this.tickets.filter(ticket => ticket.queueId === queue.id).length;
            return (totalTickets / totalSize) * 100 || 0;
        },
        getQueueName(queueId) {
            const queue = this.queues.find(q => q.id === queueId);
            return queue ? queue.name : 'Inconnu';
        },
        getTicketPosition(ticket) {
            const position = this.tickets.filter(t => t.queueId === ticket.queueId).indexOf(ticket) + 1;
            return position;
        },
    },
};
</script>

<style scoped>
.card {
    transition: transform 0.2s;
}

.card:hover {
    transform: scale(1.02);
}

.btn {
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #0056b3; 
}

.progress {
    height: 1.5rem; 
}
</style>

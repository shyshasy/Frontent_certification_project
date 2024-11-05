// import { defineStore } from 'pinia';

// export const useQueueStore = defineStore('queueStore', {
//     state: () => ({
//         queues: [],
//         tickets: [],
//         counters: [],
//         newQueueName: '',
//         newQueueSize: '',
//         selectedQueue: null,
//         editingQueue: null,
//         editingTicket: null,
//         editingCounter: null,
//         newCounterName: '',
//         newCounterManager: '',
//     }),
//     actions: {
//         addQueue() {
//             const newQueue = {
//                 id: Date.now(),
//                 name: this.newQueueName,
//                 size: this.newQueueSize,
//             };
//             this.queues.push(newQueue);
//             this.newQueueName = '';
//             this.newQueueSize = '';
//         },
//         editQueue(queue) {
//             this.editingQueue = { ...queue };
//         },
//         updateQueue() {
//             const index = this.queues.findIndex(q => q.id === this.editingQueue.id);
//             if (index !== -1) {
//                 this.queues[index] = this.editingQueue;
//                 this.editingQueue = null;
//             }
//         },
//         removeQueue(id) {
//             this.queues = this.queues.filter(q => q.id !== id);
//         },
//         takeTicket() {
//             const ticketNumber = this.tickets.length + 1;
//             const newTicket = {
//                 id: Date.now(),
//                 number: ticketNumber,
//                 queueId: this.selectedQueue,
//                 createdBy: 'Utilisateur',
//                 issueDate: new Date().toLocaleString(),
//                 status: 'En attente',
//             };
//             this.tickets.push(newTicket);
//             this.selectedQueue = null;
//         },
//         editTicket(ticket) {
//             this.editingTicket = { ...ticket };
//         },
//         updateTicket() {
//             const index = this.tickets.findIndex(t => t.id === this.editingTicket.id);
//             if (index !== -1) {
//                 this.tickets[index] = this.editingTicket;
//                 this.editingTicket = null;
//             }
//         },
//         removeTicket(id) {
//             this.tickets = this.tickets.filter(t => t.id !== id);
//         },
//         addCounter() {
//             const newCounter = {
//                 id: Date.now(),
//                 name: this.newCounterName,
//                 manager: this.newCounterManager,
//                 status: 'Actif',
//             };
//             this.counters.push(newCounter);
//             this.newCounterName = '';
//             this.newCounterManager = '';
//         },
//         editCounter(counter) {
//             this.editingCounter = { ...counter };
//         },
//         updateCounter() {
//             const index = this.counters.findIndex(c => c.id === this.editingCounter.id);
//             if (index !== -1) {
//                 this.counters[index] = this.editingCounter;
//                 this.editingCounter = null;
//             }
//         },
//         removeCounter(id) {
//             this.counters = this.counters.filter(c => c.id !== id);
//         },
//         cancelEdit() {
//             this.editingQueue = null;
//         },
//         cancelTicketEdit() {
//             this.editingTicket = null;
//         },
//         cancelCounterEdit() {
//             this.editingCounter = null;
//         },
//         getQueueProgress(queue) {
//             const totalSize = queue.size;
//             const totalTickets = this.tickets.filter(ticket => ticket.queueId === queue.id).length;
//             return (totalTickets / totalSize) * 100 || 0;
//         },
//         getQueueName(queueId) {
//             const queue = this.queues.find(q => q.id === queueId);
//             return queue ? queue.name : 'Inconnu';
//         },
//         getTicketPosition(ticket) {
//             const position = this.tickets.filter(t => t.queueId === ticket.queueId).indexOf(ticket) + 1;
//             return position;
//         },
//     },
// });
import { defineStore } from 'pinia';

export const useQueueStore = defineStore('queueStore', {
    state: () => ({
        queues: [],            // Liste des files d'attente
        tickets: [],           // Liste des tickets
        counters: [],          // Liste des guichets
        newQueueName: '',      // Nom de la nouvelle file d'attente
        newQueueSize: '',      // Taille de la nouvelle file d'attente
        selectedQueue: null,   // File d'attente sélectionnée pour la prise de ticket
        editingQueue: null,    // File d'attente en cours de modification
        editingTicket: null,   // Ticket en cours de modification
        editingCounter: null,  // Guichet en cours de modification
        newCounterName: '',    // Nom du nouveau guichet
        newCounterManager: '', // Responsable du nouveau guichet
    }),
    actions: {
        // Ajout d'une nouvelle file d'attente
        addQueue() {
            const newQueue = {
                id: Date.now(),
                name: this.newQueueName,
                size: parseInt(this.newQueueSize, 10), // Taille de la file convertie en entier
            };
            this.queues.push(newQueue); // Ajout de la file dans la liste
            this.newQueueName = '';     // Réinitialisation du champ de nom
            this.newQueueSize = '';     // Réinitialisation du champ de taille
        },

        // Édition d'une file d'attente existante
        editQueue(queue) {
            this.editingQueue = { ...queue }; // Copie de la file sélectionnée dans editingQueue
        },

        // Mise à jour de la file d'attente
        updateQueue() {
            const index = this.queues.findIndex(q => q.id === this.editingQueue.id);
            if (index !== -1) {
                this.queues[index] = this.editingQueue;
                this.editingQueue = null; // Réinitialisation après mise à jour
            }
        },

        // Suppression d'une file d'attente
        removeQueue(id) {
            this.queues = this.queues.filter(q => q.id !== id);
        },

        // Prendre un ticket dans une file d'attente sélectionnée
        takeTicket() {
            const ticketNumber = this.tickets.length + 1; // Calcul du numéro de ticket
            const newTicket = {
                id: Date.now(),
                number: ticketNumber,
                queueId: this.selectedQueue,     // File d'attente liée au ticket
                createdBy: 'Utilisateur',        // Par défaut, créé par "Utilisateur"
                issueDate: new Date().toLocaleString(), // Date et heure actuelles
                status: 'En attente',            // Statut par défaut "En attente"
            };
            this.tickets.push(newTicket);        // Ajout du nouveau ticket à la liste
            this.selectedQueue = null;           // Réinitialisation de la sélection de file
        },

        // Édition d'un ticket existant
        editTicket(ticket) {
            this.editingTicket = { ...ticket }; // Copie du ticket sélectionné
        },

        // Mise à jour d'un ticket
        updateTicket() {
            const index = this.tickets.findIndex(t => t.id === this.editingTicket.id);
            if (index !== -1) {
                this.tickets[index] = this.editingTicket;
                this.editingTicket = null; // Réinitialisation après mise à jour
            }
        },

        // Suppression d'un ticket
        removeTicket(id) {
            this.tickets = this.tickets.filter(t => t.id !== id);
        },

        // Ajout d'un nouveau guichet
        addCounter() {
            const newCounter = {
                id: Date.now(),
                name: this.newCounterName,       // Nom du guichet
                manager: this.newCounterManager, // Responsable du guichet
                status: 'Actif',                 // Statut du guichet (par défaut "Actif")
            };
            this.counters.push(newCounter);      // Ajout du guichet à la liste
            this.newCounterName = '';            // Réinitialisation du champ de nom
            this.newCounterManager = '';         // Réinitialisation du champ de responsable
        },

        // Édition d'un guichet existant
        editCounter(counter) {
            this.editingCounter = { ...counter }; // Copie du guichet sélectionné
        },

        // Mise à jour d'un guichet
        updateCounter() {
            const index = this.counters.findIndex(c => c.id === this.editingCounter.id);
            if (index !== -1) {
                this.counters[index] = this.editingCounter;
                this.editingCounter = null; // Réinitialisation après mise à jour
            }
        },

        // Suppression d'un guichet
        removeCounter(id) {
            this.counters = this.counters.filter(c => c.id !== id);
        },

        // Annuler l'édition d'une file d'attente
        cancelEdit() {
            this.editingQueue = null;
        },

        // Annuler l'édition d'un ticket
        cancelTicketEdit() {
            this.editingTicket = null;
        },

        // Annuler l'édition d'un guichet
        cancelCounterEdit() {
            this.editingCounter = null;
        },

        // Calculer la progression d'une file d'attente
        getQueueProgress(queue) {
            const totalSize = queue.size; // Taille totale de la file
            const totalTickets = this.tickets.filter(ticket => ticket.queueId === queue.id).length;
            return (totalTickets / totalSize) * 100 || 0; // Progression en pourcentage
        },

        // Récupérer le nom d'une file d'attente par son ID
        getQueueName(queueId) {
            const queue = this.queues.find(q => q.id === queueId);
            return queue ? queue.name : 'Inconnu';
        },

        // Obtenir la position d'un ticket dans la file
        getTicketPosition(ticket) {
            const position = this.tickets.filter(t => t.queueId === ticket.queueId).indexOf(ticket) + 1;
            return position;
        },
    },
});

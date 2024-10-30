<template>
    <div class="container mt-5">
        <h2 class="text-center mb-4">Gestion des Tickets et Réservations</h2>

        <div class="row mb-4">
            <div class="col-md-6">
                <input
                    type="text"
                    v-model="searchTicket"
                    placeholder="Rechercher un billet par ID..."
                    class="form-control"
                />
            </div>
            <div class="col-md-6">
                <input
                    type="text"
                    v-model="searchReservation"
                    placeholder="Rechercher une réservation par ID..."
                    class="form-control"
                />
            </div>
        </div>

        <div class="section">
            <h3 class="text-center mb-3">Historique des Billets</h3>
            <div class="list-group">
                <div class="list-group-item" v-for="ticket in filteredTickets" :key="ticket.id">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-1">Billet ID: {{ ticket.id }}</h5>
                            <p class="mb-1"><strong>Date:</strong> {{ ticket.date }}</p>
                            <p class="mb-1">
                                <strong>Status:</strong>
                                <span :class="getStatusClass(ticket.status)">{{ ticket.status }}</span>
                            </p>
                        </div>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-info btn-sm" @click="handleTicketAction(ticket)">Gérer</button>
                            <span v-if="ticket.notification" class="alert alert-warning ms-2 mb-0">{{ ticket.notification }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <h3 class="text-center mb-3">Historique des Réservations</h3>
            <div class="list-group">
                <div class="list-group-item" v-for="reservation in filteredReservations" :key="reservation.id">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-1">Réservation ID: {{ reservation.id }}</h5>
                            <p class="mb-1"><strong>Date:</strong> {{ reservation.date }}</p>
                            <p class="mb-1"><strong>Status:</strong> {{ reservation.status }}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-info btn-sm" @click="handleReservationAction(reservation)">Gérer</button>
                            <span v-if="reservation.notification" class="alert alert-warning ms-2 mb-0">{{ reservation.notification }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="filteredTickets.length === 0 && searchTicket" class="alert alert-warning">
            Aucun billet trouvé pour l'ID {{ searchTicket }}.
            <button class="btn btn-link" @click="clearSearch('ticket')">Retour à l'historique</button>
        </div>

        <div v-if="filteredReservations.length === 0 && searchReservation" class="alert alert-warning">
            Aucune réservation trouvée pour l'ID {{ searchReservation }}.
            <button class="btn btn-link" @click="clearSearch('reservation')">Retour à l'historique</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchTicket: '',
            searchReservation: '',
            tickets: [
                { id: 1, date: '2024-01-01', status: 'Servi', notification: '' },
                { id: 2, date: '2024-01-02', status: 'En attente', notification: '' },
                { id: 3, date: '2024-01-03', status: 'Annulé', notification: '' },
            ],
            reservations: [
                { id: 1, date: '2024-01-05', status: 'Confirmée', notification: '' },
                { id: 2, date: '2024-01-06', status: 'En attente', notification: '' },
            ],
        };
    },
    computed: {
        filteredTickets() {
            return this.searchTicket
                ? this.tickets.filter(ticket => ticket.id === Number(this.searchTicket))
                : this.tickets;
        },
        filteredReservations() {
            return this.searchReservation
                ? this.reservations.filter(reservation => reservation.id === Number(this.searchReservation))
                : this.reservations;
        },
    },
    methods: {
        getStatusClass(status) {
            switch (status) {
                case 'Servi':
                    return 'text-success';
                case 'En attente':
                    return 'text-warning';
                case 'Annulé':
                    return 'text-danger';
                case 'Confirmée':
                    return 'text-success';
                default:
                    return '';
            }
        },
        addActionToNotification(item, actionDescription) {
            item.notification = actionDescription;
            setTimeout(() => {
                item.notification = '';
            }, 3000);
        },
        handleTicketAction(ticket) {
            if (ticket.status === 'En attente') {
                ticket.status = 'Servi';
                this.addActionToNotification(ticket, `Ticket ID ${ticket.id} a été servi.`);
            } else if (ticket.status === 'Servi') {
                ticket.status = 'Annulé';
                this.addActionToNotification(ticket, `Ticket ID ${ticket.id} a été annulé.`);
            }
        },
        handleReservationAction(reservation) {
            if (reservation.status === 'En attente') {
                reservation.status = 'Confirmée';
                this.addActionToNotification(reservation, `Réservation ID ${reservation.id} a été confirmée.`);
            } else if (reservation.status === 'Confirmée') {
                reservation.status = 'Annulée';
                this.addActionToNotification(reservation, `Réservation ID ${reservation.id} a été annulée.`);
            }
        },
        clearSearch(type) {
            if (type === 'ticket') {
                this.searchTicket = '';
            } else if (type === 'reservation') {
                this.searchReservation = '';
            }
        },
    },
};
</script>

<style scoped>
.section {
    margin-bottom: 40px;
}

.list-group-item {
    border-radius: 8px;
    transition: background-color 0.3s;
}

.list-group-item:hover {
    background-color: #f1f1f1;
}

.text-success {
    color: #28a745;
}

.text-warning {
    color: #ffc107;
}

.text-danger {
    color: #dc3545;
}

.alert {
    transition: opacity 0.5s;
}
</style>

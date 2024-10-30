<template>
  <div class="reservation-management">
    <h1>Mes Réservations</h1>

    <!-- Sélection de la date -->
    <div class="mb-3">
      <label for="reservationDate" class="form-label">Sélectionner une date</label>
      <input
        type="date"
        id="reservationDate"
        v-model="selectedDate"
        @change="checkAvailableTimes"
        required
        class="form-control"
      />
    </div>

    <!-- Afficher les heures disponibles -->
    <div v-if="availableTimes.length === 0" class="text-danger mt-2">
      Aucune heure disponible pour cette date.
    </div>
    <div v-else>
      <label class="form-label">Sélectionner une heure</label>
      <select v-model="selectedTime" class="form-select mb-3">
        <option v-for="time in availableTimes" :key="time" :value="time">{{ time }}</option>
      </select>
      <button class="btn btn-primary" @click="addReservation">Réserver</button>
    </div>

    <!-- Table des réservations -->
    <table class="table table-striped mt-4">
      <thead>
        <tr>
          <th>Date</th>
          <th>Heure</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in reservations" :key="reservation.id">
          <td>{{ reservation.date }}</td>
          <td>{{ reservation.time }}</td>
          <td>
            <button class="btn btn-warning" @click="editReservation(reservation)">Modifier</button>
            <button class="btn btn-danger" @click="deleteReservation(reservation.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulaire de modification de réservation -->
    <div v-if="editMode" class="edit-reservation mt-4">
      <h3>Modifier la réservation</h3>
      <form @submit.prevent="updateReservation" class="bg-light p-4 rounded shadow">
        <div class="mb-3">
          <label for="editDate" class="form-label">Nouvelle date</label>
          <input
            type="date"
            id="editDate"
            v-model="editReservationData.date"
            required
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="editTime" class="form-label">Nouvelle heure</label>
          <input
            type="time"
            id="editTime"
            v-model="editReservationData.time"
            required
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-success w-100">Sauvegarder</button>
        <button type="button" class="btn btn-secondary w-100 mt-2" @click="cancelEdit">Annuler</button>
      </form>
    </div>

    <!-- Afficher un message si aucune réservation -->
    <p v-if="reservations.length === 0" class="text-center mt-4">Aucune réservation trouvée.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reservations: [
        { id: 1, date: '2024-10-20', time: '10:00' },
        { id: 2, date: '2024-10-21', time: '14:00' },
      ], // Simuler des données locales
      availableTimes: [], // Heures disponibles pour la date sélectionnée
      selectedDate: '', // Date sélectionnée
      selectedTime: '', // Heure sélectionnée
      editMode: false, // Activer le mode édition
      editReservationData: null, // Stocker les données de la réservation en cours de modification
    };
  },
  methods: {
    // Vérifier les heures disponibles pour la date sélectionnée
    checkAvailableTimes() {
      const allTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
      const reservedTimes = this.reservations
        .filter(reservation => reservation.date === this.selectedDate)
        .map(reservation => reservation.time);

      this.availableTimes = allTimes.filter(time => !reservedTimes.includes(time));
      this.selectedTime = this.availableTimes.length > 0 ? this.availableTimes[0] : '';
    },
    // Ajouter une nouvelle réservation
    addReservation() {
      const newReservation = {
        id: this.reservations.length + 1, // Générer un nouvel ID
        date: this.selectedDate,
        time: this.selectedTime,
      };
      this.reservations.push(newReservation);
      this.selectedDate = '';
      this.selectedTime = '';
      this.availableTimes = [];
    },
    // Supprimer une réservation
    deleteReservation(id) {
      this.reservations = this.reservations.filter(reservation => reservation.id !== id);
    },
    // Activer le mode édition pour une réservation spécifique
    editReservation(reservation) {
      this.editMode = true;
      this.editReservationData = { ...reservation }; // Cloner la réservation
    },
    // Mettre à jour une réservation après édition
    updateReservation() {
      const index = this.reservations.findIndex(r => r.id === this.editReservationData.id);
      if (index !== -1) {
        this.reservations[index] = { ...this.editReservationData }; // Mettre à jour la réservation
      }
      this.resetEdit(); // Réinitialiser le formulaire et désactiver le mode édition
    },
    // Réinitialiser le formulaire d'édition
    resetEdit() {
      this.editMode = false;
      this.editReservationData = null;
    },
    // Annuler l'édition en cours
    cancelEdit() {
      this.resetEdit();
    },
  },
};
</script>

<style scoped>
/* Styles pour la table et le formulaire */
table {
  width: 100%;
}

.edit-reservation {
  max-width: 400px;
  margin: auto;
}

.btn-warning {
  margin-right: 5px;
}

.btn-danger {
  margin-left: 5px;
}
</style>

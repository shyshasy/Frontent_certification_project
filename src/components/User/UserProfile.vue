<template>
  <div class="profile-container">
    <h2>Mon Profil</h2>
    <div class="profile-info">
      <div class="avatar">
        <img :src="avatar" alt="Avatar utilisateur" />
      </div>
      <h3>{{ name }}</h3>
      <p class="email">{{ email }}</p>
      <p class="phone">{{ phone }}</p>
    </div>
    <form @submit.prevent="updateProfile" class="profile-form">
      <div class="form-group">
        <label for="name">Nom</label>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="Nom"
          required
        />
      </div>
      <div class="form-group">
        <label for="phone">Numéro de téléphone</label>
        <input
          type="tel"
          id="phone"
          v-model="phone"
          placeholder="Numéro de téléphone"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Nouveau mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Nouveau mot de passe"
          required
        />
      </div>
      <button type="submit" class="submit-button">Mettre à jour</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      avatar: 'https://via.placeholder.com/100', // Lien par défaut pour l'avatar
    };
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await axios.get('/api/user/profile'); // Remplacez par votre API
        const userProfile = response.data;
        this.name = userProfile.name;
        this.email = userProfile.email;
        this.phone = userProfile.phone;
        this.avatar = userProfile.avatar || this.avatar; // Utiliser l'avatar par défaut si aucun n'est fourni
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      }
    },
    async updateProfile() {
      try {
        const response = await axios.put('/api/user/profile', {
          name: this.name,
          email: this.email,
          phone: this.phone,
          password: this.password,
        });
        console.log('Profil mis à jour avec succès:', response.data);
        // Optionnel : Vous pouvez rediriger l'utilisateur ou afficher un message de succès
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.profile-info {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
}

.avatar img {
  width: 100%;
  height: auto;
}

.profile-info h3 {
  margin: 5px 0;
  color: #555;
}

.profile-info p {
  margin: 0;
  color: #777;
}

.profile-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>

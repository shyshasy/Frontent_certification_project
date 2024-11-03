<template>
    <div>
      <h1>Bienvenue sur le tableau de bord</h1>
      <button @click="handleLogout" class="btn btn-danger">Se déconnecter</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const handleLogout = () => {
    // Supprimer les informations de l'utilisateur du localStorage
    localStorage.removeItem('user');
    console.log('Utilisateur déconnecté');
  
    // Rediriger vers la page de connexion
    router.push('/login');
  };
  </script>
  
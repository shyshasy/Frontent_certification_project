<template>
    <div>
        <!-- Bannière Principale -->
        <header class="hero">
            <div class="hero-content">
                <h1>Gérez votre file d'attente comme jamais auparavant!</h1>
                <p>Rejoignez notre plateforme innovante pour une expérience sans stress.</p>
                <router-link class="btn btn-primary" to="/login">Commencez Maintenant</router-link>
            </div>
        </header>

        <!-- Fonctionnalités -->
        <section class="features">
            <h2>Fonctionnalités Clés</h2>
            <div class="feature-container">
                <div class="feature-card">
                    <div class="feature">
                        <i class="fas fa-clock fa-3x feature-icon"></i> <!-- Icône pour Gestion du Temps -->
                        <h3>Gestion du Temps</h3>
                        <p>Optimisez le temps d'attente pour vos clients.</p>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature">
                        <i class="fas fa-users fa-3x feature-icon"></i> <!-- Icône pour Interaction Client -->
                        <h3>Interaction Client</h3>
                        <p>Communiquez facilement avec vos clients.</p>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature">
                        <i class="fas fa-chart-bar fa-3x feature-icon"></i> <!-- Icône pour Statistiques -->
                        <h3>Statistiques</h3>
                        <p>Analysez les performances de votre service.</p>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature">
                        <i class="fas fa-mobile-alt fa-3x feature-icon"></i> <!-- Icône pour Accessibilité Mobile -->
                        <h3>Accessibilité Mobile</h3>
                        <p>Gérez votre file d'attente depuis n'importe où.</p>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature">
                        <i class="fas fa-cogs fa-3x feature-icon"></i> <!-- Icône pour Personnalisation -->
                        <h3>Personnalisation</h3>
                        <p>Adaptez la plateforme à vos besoins spécifiques.</p>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature">
                        <i class="fas fa-bell fa-3x feature-icon"></i> <!-- Icône pour Notifications -->
                        <h3>Notifications</h3>
                        <p>Recevez des alertes en temps réel.</p>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature">
                        <i class="fas fa-shield-alt fa-3x feature-icon"></i> <!-- Icône pour Sécurité -->
                        <h3>Sécurité</h3>
                        <p>Protégez les données de vos clients.</p>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature">
                        <i class="fas fa-comments fa-3x feature-icon"></i> <!-- Icône pour Support Client -->
                        <h3>Support Client</h3>
                        <p>Assistance disponible à tout moment.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Témoignages -->
        <section class="testimonials">
            <h2>Avis de Nos Utilisateurs</h2>
            <div class="testimonial-container">
                <div class="testimonial">
                    <img src="/User1.webp" alt="Utilisateur 1" />
                    <p>"Une expérience exceptionnelle! La gestion de la file d'attente n'a jamais été aussi facile."</p>
                    <h4>Marie Dupont</h4>
                </div>
                <div class="testimonial">
                    <img src="/User2.webp" alt="Utilisateur 2" />
                    <p>"Grâce à cette application, j'ai pu réduire le temps d'attente de mes clients."</p>
                    <h4>Jean Martin</h4>
                </div>
            </div>
        </section>

        <!-- Appel à l'Action -->
        <footer class="footer">
            <p>Prêt à transformer votre gestion de file d'attente?</p>
            <router-link class="btn btn-register" to="/register">Créer un Compte</router-link>
        </footer>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* Style de la bannière principale */
.hero {
    background-image: url('online-satisfaction-rating-laptop.jpg'); /* Remplacez par votre image */
    background-size: cover;
    background-position: center;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    position: relative;
    padding: 20px; /* Ajout d'un rembourrage */
}

.hero::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* Ombre sur l'image de fond */
}

.hero-content {
    z-index: 1;
}

.btn {
    padding: 12px 25px;
    border-radius: 5px;
    font-size: 18px;
    transition: background 0.3s ease, transform 0.3s ease; /* Effet de transition */
}

.btn-primary {
    background-color: #007bff; /* Couleur bleue */
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3; /* Couleur au survol */
    transform: translateY(-2px); /* Léger effet de levée */
}

.btn-register {
    color: white;
    font-weight: bold; /* Mettre en gras */
    font-size: 20px; /* Taille de police plus grande */
    padding: 15px 30px; /* Plus de rembourrage */
    border-radius: 25px; /* Bordure arrondie */
}

.btn-register:hover {
    background-color: hsla(244, 92%, 49%, 0.349); /* Couleur au survol */
    border: 2px solid #4f09f5; /* Bordure au survol */
    transform: translateY(-2px); /* Léger effet de levée */
}

.features, .testimonials {
    padding: 50px 20px;
    text-align: center;
}

.features h2, .testimonials h2 {
    margin-bottom: 30px;
}

.feature-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Grille flexible */
    gap: 20px; /* Espace entre les cartes */
    justify-items: center; /* Centrer les cartes */
}

.feature-card {
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s; /* Effet de transition */
    width: 100%; /* Rendre la carte responsive */
}

.feature-card:hover {
    transform: scale(1.05); /* Légère augmentation au survol */
}

.feature-icon {
    color: #007bff; /* Couleur des icônes */
    margin-bottom: 15px; /* Espacement sous l'icône */
}

.testimonial-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.testimonial {
    margin: 20px;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
    transition: transform 0.2s; /* Effet de transition */
}

.testimonial:hover {
    transform: scale(1.05); /* Légère augmentation au survol */
}

.testimonial img {
    width: 80px;
    height: 80px; /* Ajout d'une hauteur fixe pour centrer l'image */
    border-radius: 50%;
    margin-bottom: 15px;
    display: block; /* Centrer l'image dans le conteneur */
    margin-left: auto; /* Centrer horizontalement */
    margin-right: auto; /* Centrer horizontalement */
}

.footer {
    text-align: center;
    padding: 30px;
    background: #007bff; /* Couleur de fond du footer */
    color: white;
}

.footer .btn {
    margin-top: 10px;
}
</style>

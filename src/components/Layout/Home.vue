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
                <div class="feature">
                    <i class="fa fa-clock fa-3x"></i>
                    <h3>Gestion du Temps</h3>
                    <p>Optimisez le temps d'attente pour vos clients.</p>
                </div>
                <div class="feature">
                    <i class="fa fa-users fa-3x"></i>
                    <h3>Interaction Client</h3>
                    <p>Communiquez facilement avec vos clients.</p>
                </div>
                <div class="feature">
                    <i class="fa fa-chart-line fa-3x"></i>
                    <h3>Statistiques</h3>
                    <p>Analysez les performances de votre service.</p>
                </div>
            </div>
        </section>

        <!-- Témoignages -->
        <section class="testimonials">
            <h2>Avis de Nos Utilisateurs</h2>
            <div class="testimonial-container">
                <div class="testimonial">
                    <img src="/public/User1.webp" alt="Utilisateur 1" />
                    <p>"Une expérience exceptionnelle! La gestion de la file d'attente n'a jamais été aussi facile."</p>
                    <h4>Marie Dupont</h4>
                </div>
                <div class="testimonial">
                    <img src="/public/User2.webp" alt="Utilisateur 1" />
                    <p>"Grâce à cette application, j'ai pu réduire le temps d'attente de mes clients."</p>
                    <h4>Jean Martin</h4>
                </div>
            </div>
        </section>

        <!-- Appel à l'Action -->
        <footer class="footer">
            <p>Prêt à transformer votre gestion de file d'attente?</p>
            <router-link class="btn btn-secondary" to="/register">Créer un Compte</router-link>
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
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 18px;
}

.features, .testimonials {
    padding: 50px 20px;
    text-align: center;
}

.features h2, .testimonials h2 {
    margin-bottom: 30px;
}

.feature-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.feature {
    margin: 20px;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 300px;
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
}

.testimonial img {
    width: 80px;
    border-radius: 50%;
    margin-bottom: 15px;
}

.footer {
    text-align: center;
    padding: 30px;
    background: #007bff;
    color: white;
}

.footer .btn {
    margin-top: 10px;
}
</style>

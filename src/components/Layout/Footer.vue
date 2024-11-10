<template>
    <div class="page-content">
        <!-- Votre contenu principal ici -->
    </div>
    <footer class="footer">
        <div class="container">
            <span class="text-muted">© 2024 Queue Management App</span>
        </div>
    </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.page-content {
    padding-bottom: 60px; /* Ajoutez un padding équivalent à la hauteur du footer */
}

.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%; 
    text-align: center;
    background-color: #f8f9fa;
    padding: 10px 0;
    border-radius: 0;
    height: 60px; /* Spécifiez la hauteur du footer */
}

.container {
    width: 100%;
    margin: 0 auto;
}

</style>

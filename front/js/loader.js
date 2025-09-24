/**
 * Loader - Gestionnaire simple et propre
 */

// Fonction pour masquer le loader
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }
}

// Masquer le loader après le chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - masquer le loader dans 2 secondes');
    setTimeout(hideLoader, 2000);
});

// Backup pour s'assurer que le loader disparaît
window.addEventListener('load', function() {
    console.log('Window loaded - masquer le loader maintenant');
    setTimeout(hideLoader, 1000);
});

// Double sécurité : masquer après 5 secondes maximum
setTimeout(function() {
    console.log('Timeout de sécurité - masquer le loader');
    hideLoader();
}, 5000);
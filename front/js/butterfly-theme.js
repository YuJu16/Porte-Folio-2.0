/**
 * Gestion des icônes papillons selon le thème
 */

// Fonction pour mettre à jour les images selon le thème
function updateButterflyIcons() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    console.log('Mise à jour des papillons - Mode sombre:', isDark);
    
    // Mettre à jour les icônes de section
    document.querySelectorAll('.section__icon-img').forEach(img => {
        const darkSrc = img.getAttribute('data-dark');
        if (darkSrc) {
            if (isDark) {
                img.src = darkSrc; // assets/img/butterflylight.png
            } else {
                img.src = 'assets/img/butterflyPins.png';
            }
            console.log('Image mise à jour:', img.src);
        }
    });
    
    // Mettre à jour les papillons de la timeline
    document.querySelectorAll('.timeline__butterfly').forEach(img => {
        const darkSrc = img.getAttribute('data-dark');
        if (darkSrc) {
            if (isDark) {
                img.src = darkSrc; // assets/img/butterflylight.png
            } else {
                img.src = 'assets/img/butterflyPins.png';
            }
            console.log('Papillon timeline mis à jour:', img.src);
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé - initialisation des papillons');
    
    // Mettre à jour les icônes immédiatement
    setTimeout(updateButterflyIcons, 100);
    
    // Écouter les clics sur le bouton de thème
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            console.log('Clic sur le bouton thème');
            // Attendre que le thème change, puis mettre à jour les images
            setTimeout(updateButterflyIcons, 200);
        });
    }
});

// Observer les changements d'attributs sur l'élément HTML
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            console.log('Changement de thème détecté par observer');
            updateButterflyIcons();
        }
    });
});

// Démarrer l'observation
observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
});
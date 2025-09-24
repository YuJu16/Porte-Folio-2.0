/**
 * Script principal - Gestion des thèmes et animations
 */

// Gestion des images papillons pour le thème
function updateButterflyIcons() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Mettre à jour les icônes de section
    document.querySelectorAll('.section__icon-img').forEach(img => {
        if (img.getAttribute('data-dark')) {
            img.src = isDark ? img.getAttribute('data-dark') : img.getAttribute('src').replace('butterflylight.png', 'butterflyPins.png');
        }
    });
    
    // Mettre à jour les papillons de la timeline
    document.querySelectorAll('.timeline__butterfly').forEach(img => {
        if (img.getAttribute('data-dark')) {
            img.src = isDark ? img.getAttribute('data-dark') : img.getAttribute('src').replace('butterflylight.png', 'butterflyPins.png');
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation des papillons pour le thème');
    
    // Mettre à jour les icônes immédiatement
    updateButterflyIcons();
    
    // Écouter les changements de thème via le bouton
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Attendre un peu que le thème change, puis mettre à jour les images
            setTimeout(updateButterflyIcons, 100);
        });
    }
    
    // Écouter les événements personnalisés de changement de thème
    document.addEventListener('themeChanged', updateButterflyIcons);
});

// Observer les changements d'attributs sur l'élément HTML pour détecter les changements de thème
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            console.log('Thème changé, mise à jour des papillons');
            updateButterflyIcons();
        }
    });
});

// Démarrer l'observation
observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
});
    
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + D pour toggle dark mode
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            if (this.components.theme) {
                this.components.theme.toggleTheme();
            }
        }
        
        // Escape pour fermer les modaux ou menus
        if (e.key === 'Escape') {
            const openMenu = document.querySelector('.nav__menu.active');
            if (openMenu) {
                openMenu.classList.remove('active');
            }
        }
    }
    
    handleResize() {
        console.log('Window resized');
    }
    
    onPageHidden() {
        document.body.classList.add('page-hidden');
    }
    
    onPageVisible() {
        document.body.classList.remove('page-hidden');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            z-index: 1050;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
}

// Gestion des images papillons pour le thème
function updateButterflyIcons() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Mettre à jour les icônes de section
    document.querySelectorAll('.section__icon-img').forEach(img => {
        if (img.getAttribute('data-dark')) {
            img.src = isDark ? img.getAttribute('data-dark') : 'assets/img/butterflyPins.png';
        }
    });
    
    // Mettre à jour les papillons de la timeline
    document.querySelectorAll('.timeline__butterfly').forEach(img => {
        if (img.getAttribute('data-dark')) {
            img.src = isDark ? img.getAttribute('data-dark') : 'assets/img/butterflyPins.png';
        }
    });
}

// Styles additionnels
const additionalStyles = `
<style>
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    to { transform: translateX(100%); opacity: 0; }
}

.party-mode {
    animation: rainbow 2s linear infinite;
}

@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}

.page-hidden .butterfly {
    animation-play-state: paused;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
    
    // Initialiser la gestion des papillons
    updateButterflyIcons();
    
    // Écouter les changements de thème
    document.addEventListener('themeChanged', updateButterflyIcons);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(updateButterflyIcons, 10);
        });
    }
});

// Loader - Masquer après chargement complet
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

// Démarrer le loader au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(hideLoader, 1500);
});

// Backup au cas où DOMContentLoaded ne marche pas
window.addEventListener('load', function() {
    setTimeout(hideLoader, 1000);
});

// Styles additionnels
const additionalStyles = `
<style>
.loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.loader__butterfly {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: butterflybounce 3s ease-in-out infinite;
}

.butterfly-gif {
    width: 120px;
    height: auto;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.loader__text {
    font-size: 1.2rem;
    font-weight: 500;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    text-align: center;
    max-width: 300px;
}

@keyframes butterflybounce {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-15px) scale(1.05); }
}

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    to { transform: translateX(100%); opacity: 0; }
}

@keyframes fadeOut {
    to { opacity: 0; }
}

.party-mode {
    animation: rainbow 2s linear infinite;
}

@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}

.page-hidden .butterfly {
    animation-play-state: paused;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
    
    // Initialiser la gestion des papillons
    updateButterflyIcons();
    
    // Écouter les changements de thème
    document.addEventListener('themeChanged', updateButterflyIcons);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(updateButterflyIcons, 10);
        });
    }
});
    
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + D pour toggle dark mode
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            if (this.components.theme) {
                this.components.theme.toggleTheme();
            }
        }
        
        // Escape pour fermer les modaux ou menus
        if (e.key === 'Escape') {
            const openMenu = document.querySelector('.nav__menu.active');
            if (openMenu) {
                openMenu.classList.remove('active');
            }
        }
    }
    
    handleResize() {
        // Ajuster les animations ou layouts si nécessaire
        console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
    }
    
    onPageHidden() {
        // Pause des animations coûteuses
        document.body.classList.add('page-hidden');
    }
    
    onPageVisible() {
        // Reprendre les animations
        document.body.classList.remove('page-hidden');
    }
    
    handleError(error) {
        console.error('Erreur dans l\'application:', error);
        // En production, vous pourriez envoyer l'erreur à un service de monitoring
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            z-index: 1050;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    finishLoading() {
        setTimeout(() => {
            const loader = document.getElementById('app-loader');
            if (loader) {
                loader.style.animation = 'fadeOut 0.5s ease-in forwards';
                setTimeout(() => {
                    loader.remove();
                    this.isLoading = false;
                    
                    // Déclencher l'événement de fin de chargement
                    document.dispatchEvent(new CustomEvent('appLoaded'));
                }, 500);
            }
        }, 1500);
    }
}

// Styles additionnels pour les animations
const additionalStyles = `
<style>
.loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.loader__butterfly {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: butterflybounce 3s ease-in-out infinite;
}

.butterfly-gif {
    width: 120px;
    height: auto;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
    animation: gentleFloat 4s ease-in-out infinite;
}

.loader__text {
    font-size: 1.2rem;
    font-weight: 500;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    animation: textPulse 2s ease-in-out infinite;
    text-align: center;
    max-width: 300px;
}

@keyframes butterflybounce {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-15px) scale(1.05); }
}

@keyframes gentleFloat {
    0%, 100% { transform: rotate(-2deg); }
    25% { transform: rotate(1deg); }
    50% { transform: rotate(2deg); }
    75% { transform: rotate(-1deg); }
}

@keyframes textPulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
}

@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes fadeOut {
    to {
        opacity: 0;
    }
}

.party-mode {
    animation: rainbow 2s linear infinite;
}

@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}

.form__input.error,
.form__textarea.error {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.page-hidden .butterfly {
    animation-play-state: paused;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});

document.addEventListener('DOMContentLoaded', function () {
  function updateButterflyIcons() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    // Mettre à jour les icônes de section
    document.querySelectorAll('.section__icon-img').forEach(img => {
      img.src = isDark ? img.getAttribute('data-dark') : 'assets/img/butterflyPins.png';
    });
    // Mettre à jour les papillons de la timeline
    document.querySelectorAll('.timeline__butterfly').forEach(img => {
      img.src = isDark ? img.getAttribute('data-dark') : 'assets/img/butterflyPins.png';
    });
  }
  // Initial update
  updateButterflyIcons();
  // Listen for theme changes
  document.addEventListener('themeChanged', updateButterflyIcons);
  // Or, if you use a button to toggle theme:
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTimeout(updateButterflyIcons, 10);
    });
  }
});

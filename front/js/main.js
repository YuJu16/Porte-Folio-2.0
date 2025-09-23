/**
 * Script principal - Version nettoyée et corrigée
 */
class PortfolioApp {
    constructor() {
        this.isLoading = true;
        this.components = {};
        
        this.init();
    }
    
    init() {
        console.log('Initialisation de l\'application...');
        
        // Initialiser les composants
        this.initComponents();
        
        // Setup des événements globaux
        this.setupGlobalEvents();
        
        // Setup des Easter eggs
        this.setupEasterEggs();
        
        console.log('Application initialisée avec succès');
    }
    
    initComponents() {
        this.components.theme = window.themeManager;
    }
    
    setupGlobalEvents() {
        // Gestion des erreurs JavaScript
        window.addEventListener('error', (e) => {
            console.error('Erreur JavaScript:', e.error);
        });
        
        // Gestion des erreurs de promesses
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promesse rejetée:', e.reason);
        });
        
        // Gestion du redimensionnement
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Gestion de la visibilité de la page
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.onPageHidden();
            } else {
                this.onPageVisible();
            }
        });
        
        // Gestion des raccourcis clavier
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }
    
    setupEasterEggs() {
        // Click sur le logo 5 fois
        const logo = document.querySelector('.nav__logo-img');
        if (logo) {
            let clickCount = 0;
            let clickTimer;
            
            logo.addEventListener('click', () => {
                clickCount++;
                
                if (clickCount === 1) {
                    clickTimer = setTimeout(() => {
                        clickCount = 0;
                    }, 3000);
                }
                
                if (clickCount === 5) {
                    clearTimeout(clickTimer);
                    this.activateSpecialMode();
                    clickCount = 0;
                }
            });
        }
    }
    
    activateSpecialMode() {
        document.body.classList.add('party-mode');
        this.showNotification('🎉 Mode fête activé ! 🎉', 'success');
        
        setTimeout(() => {
            document.body.classList.remove('party-mode');
        }, 10000);
    }
    
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
}

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

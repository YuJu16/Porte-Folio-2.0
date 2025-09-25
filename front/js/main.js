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
        img.src = isDark ? img.getAttribute('data-dark') : 'assets/img/butterflyPins.png';
    });
}

// Classe principale de l'application
class PortfolioApp {
    constructor() {
        this.isLoading = true;
        this.components = {};
        
        this.init();
    }
    
    init() {
        this.showLoader();
        this.initComponents();
        this.setupGlobalEvents();
        this.setupContactForm();
        this.setupEasterEggs();
        this.finishLoading();
    }
    
    showLoader() {
        // Le loader est déjà dans le HTML
        console.log('Loader affiché');
    }
    
    initComponents() {
        // Les composants sont déjà initialisés dans leurs fichiers respectifs
        // Ici on peut ajouter des références si nécessaire
        this.components.theme = window.themeManager;
    }
    
    setupGlobalEvents() {
        // Gestion des erreurs JavaScript
        window.addEventListener('error', (e) => {
            console.error('Erreur JavaScript:', e.error);
            this.handleError(e.error);
        });
        
        // Gestion des erreurs de promesses
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promesse rejetée:', e.reason);
            this.handleError(e.reason);
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
    
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit(e.target);
            });
            
            // Validation en temps réel
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        }
    }
    
    handleContactSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!this.validateContactForm(data)) {
            return;
        }
        
        // Simuler l'envoi du formulaire
        this.showNotification('Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
        form.reset();
        
        // Ici vous pouvez ajouter l'envoi réel via une API
        // this.sendEmailToAPI(data);
    }
    
    validateContactForm(data) {
        let isValid = true;
        
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showFieldError('email', 'Veuillez entrer une adresse email valide');
            isValid = false;
        }
        
        // Validation des champs obligatoires
        const requiredFields = ['name', 'email', 'subject', 'message'];
        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim().length < 2) {
                this.showFieldError(field, 'Ce champ est obligatoire (minimum 2 caractères)');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(input) {
        const value = input.value.trim();
        
        if (input.hasAttribute('required') && value.length < 2) {
            this.showFieldError(input.name, 'Ce champ est obligatoire (minimum 2 caractères)');
            return false;
        }
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                this.showFieldError(input.name, 'Veuillez entrer une adresse email valide');
                return false;
            }
        }
        
        this.clearFieldError(input);
        return true;
    }
    
    showFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (!field) return;
        
        field.classList.add('error');
        
        // Retirer l'ancien message d'erreur
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Ajouter le nouveau message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    clearFieldError(input) {
        input.classList.remove('error');
        const errorDiv = input.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    setupEasterEggs() {
        // Konami Code (↑↑↓↓←→←→BA)
        let konamiCode = [];
        const konamiSequence = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                this.activateEasterEgg();
                konamiCode = [];
            }
        });
        
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
    
    activateEasterEgg() {
        // Ajouter une pluie de papillons
        const butterflyRain = () => {
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    this.createFallingButterfly();
                }, i * 200);
            }
        };
        
        butterflyRain();
        this.showNotification('🦋 Easter Egg activé ! Pluie de papillons ! 🦋', 'info');
    }
    
    createFallingButterfly() {
        const butterfly = document.createElement('div');
        butterfly.textContent = '🦋';
        butterfly.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${Math.random() * window.innerWidth}px;
            font-size: ${20 + Math.random() * 30}px;
            z-index: 1000;
            pointer-events: none;
            animation: fall ${3 + Math.random() * 2}s linear forwards;
        `;
        
        document.body.appendChild(butterfly);
        
        setTimeout(() => {
            butterfly.remove();
        }, 5000);
    }
    
    activateSpecialMode() {
        document.body.classList.add('party-mode');
        this.showNotification('🎉 Mode fête activé ! 🎉', 'success');
        
        // Retirer le mode après 10 secondes
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

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Gestion des papillons pour les thèmes
    updateButterflyIcons();
    
    // Écouter les changements de thème
    document.addEventListener('themeChanged', updateButterflyIcons);
    
    // Écouter les clics sur le toggle de thème
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            setTimeout(updateButterflyIcons, 10);
        });
    }
    
    // Initialiser l'application
    window.portfolioApp = new PortfolioApp();
});
  // Listen for theme changes
  document.addEventListener('themeChanged', updateButterflyIcons);
  // Or, if you use a button to toggle theme:
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTimeout(updateButterflyIcons, 10);
    });
  }


/**
 * Gestionnaire d'animations
 */
class AnimationManager {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };
        
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffect();
        this.setupTypewriterEffect();
        this.setupCardHoverEffects();
        this.setupButterflyAnimations();
    }
    
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                }
            });
        }, this.observerOptions);
        
        // Éléments à animer
        const elementsToAnimate = document.querySelectorAll(`
            .section__title,
            .skill__card,
            .timeline__item,
            .project__details,
            .about__image,
            .about__tabs,
            .contact__info,
            .contact__form
        `);
        
        elementsToAnimate.forEach((element, index) => {
            // Ajouter un délai échelonné pour un effet de cascade
            element.style.setProperty('--animation-delay', `${index * 0.1}s`);
            observer.observe(element);
        });
    }
    
    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.butterfly');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // parallaxElements.forEach((element, index) => {
            //     const speed = 0.3 + (index * 0.1); // Vitesses différentes pour chaque papillon
            //     element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.01}deg)`;
            // });
        });
    }
    
    setupTypewriterEffect() {
        const heroTitle = document.querySelector('.hero__title');
        const heroSubtitle = document.querySelector('.hero__subtitle');
        
        if (heroTitle) {
            this.typewriterEffect(heroTitle, heroTitle.textContent, 100);
        }
        
        if (heroSubtitle) {
            setTimeout(() => {
                this.typewriterEffect(heroSubtitle, heroSubtitle.textContent, 50);
            }, 2000);
        }
    }
    
    typewriterEffect(element, text, speed = 100) {
        element.textContent = '';
        element.style.borderRight = '2px solid rgba(255,255,255,0.75)';
        element.style.whiteSpace = 'nowrap';
        element.style.overflow = 'hidden';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                    element.style.whiteSpace = 'normal';
                }, 1000);
            }
        }, speed);
    }
    
    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.skill__card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addFloatingEffect(e.target);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.removeFloatingEffect(e.target);
            });
        });
    }
    
    addFloatingEffect(element) {
        element.style.transform = 'translateY(-8px) scale(1.02)';
        element.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    }
    
    removeFloatingEffect(element) {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = '';
    }
    
    setupButterflyAnimations() {
        const butterflies = document.querySelectorAll('.butterfly');
        
        // butterflies.forEach((butterfly, index) => {

        //     const animationDuration = 8 + Math.random() * 4; // 8-12 secondes
        //     const delay = Math.random() * 2; // 0-2 secondes de délai
            
        //     butterfly.style.animationDuration = `${animationDuration}s`;
        //     butterfly.style.animationDelay = `${delay}s`;
            
        //     // Ajouter une animation de battement d'ailes
        //     butterfly.addEventListener('animationiteration', () => {
        //         butterfly.style.filter = `hue-rotate(${Math.random() * 60}deg)`;
        //     });
        // });
    }
    
    // Fonction utilitaire pour créer des animations personnalisées
    animateElement(element, keyframes, options = {}) {
        const defaultOptions = {
            duration: 1000,
            easing: 'ease-in-out',
            fill: 'forwards'
        };
        
        const animationOptions = { ...defaultOptions, ...options };
        
        return element.animate(keyframes, animationOptions);
    }
    
    // Animation de compteur pour les statistiques (si besoin)
    // animateCounter(element, start = 0, end, duration = 2000) {
    //     const startTime = performance.now();
        
    //     const updateCounter = (currentTime) => {
    //         const elapsed = currentTime - startTime;
    //         const progress = Math.min(elapsed / duration, 1);
            
    //         // Fonction d'easing
    //         const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    //         const current = Math.floor(start + (end - start) * easeOutQuart);
            
    //         element.textContent = current;
            
    //         if (progress < 1) {
    //             requestAnimationFrame(updateCounter);
    //         }
    //     };
        
    //     requestAnimationFrame(updateCounter);
    // }
}

// CSS pour les animations (à ajouter dynamiquement)
const animationStyles = `
<style>
.animate-in {
    animation: slideInUp 0.8s ease-out forwards;
    animation-delay: var(--animation-delay, 0s);
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.skill__card,
.timeline__content {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.butterfly {
    transition: filter 0.5s ease;
}

/* Animation de pulsation pour les éléments importants */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.pulse {
    animation: pulse 2s infinite;
}

/* Animation de fondu pour les transitions d'onglets */
.tab__content--active {
    animation: fadeInTab 0.5s ease-in-out;
}

@keyframes fadeInTab {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Animation des boutons */
.form__submit,
.nav__action-btn,
.tab__btn {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form__submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

/* Animation de typing cursor */
.typing-cursor::after {
    content: '|';
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}
</style>
`;

// Injecter les styles d'animation
document.head.insertAdjacentHTML('beforeend', animationStyles);

// Initialiser quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
});

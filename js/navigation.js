/**
 * Gestionnaire de navigation
 */
class NavigationManager {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.querySelector('.nav__menu');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.header = document.querySelector('.header');
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveLinks();
        this.setupHeaderScroll();
    }
    
    setupMobileMenu() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Fermer le menu mobile quand on clique sur un lien
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        });
        
        // Fermer le menu mobile quand on clique en dehors
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.nav.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.isMenuOpen = true;
        this.navToggle.classList.add('active');
        this.navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = this.header.offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            root: null,
            rootMargin: `-${this.header.offsetHeight}px 0px -50% 0px`,
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActiveLink(entry.target.id);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    setActiveLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    setupHeaderScroll() {
        let lastScrollY = window.scrollY;
        let isScrollingDown = false;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Déterminer la direction du scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scroll vers le bas
                if (!isScrollingDown) {
                    isScrollingDown = true;
                    this.header.style.transform = 'translateY(-100%)';
                }
            } else {
                // Scroll vers le haut
                if (isScrollingDown) {
                    isScrollingDown = false;
                    this.header.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = currentScrollY;
            
            // Ajouter/enlever l'ombre du header selon le scroll
            if (currentScrollY > 10) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
    }
}

// Initialiser quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});

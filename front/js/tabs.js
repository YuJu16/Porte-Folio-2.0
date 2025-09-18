/**
 * Gestionnaire d'onglets
 */
class TabsManager {
    constructor() {
        this.tabContainers = document.querySelectorAll('[data-tabs]');
        this.init();
    }
    
    init() {
        this.setupAboutTabs();
        this.setupProjectTabs();
    }
    
    setupAboutTabs() {
        const aboutTabBtns = document.querySelectorAll('.tab__btn');
        const aboutTabContents = document.querySelectorAll('.tab__content');
        
        aboutTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                this.switchAboutTab(targetTab, aboutTabBtns, aboutTabContents);
            });
        });
    }
    
    switchAboutTab(targetTab, tabBtns, tabContents) {
        // Retirer l'état actif de tous les boutons
        tabBtns.forEach(btn => {
            btn.classList.remove('tab__btn--active');
        });
        
        // Retirer l'état actif de tous les contenus
        tabContents.forEach(content => {
            content.classList.remove('tab__content--active');
        });
        
        // Activer le bouton cliqué
        const activeBtn = document.querySelector(`[data-tab="${targetTab}"]`);
        if (activeBtn) {
            activeBtn.classList.add('tab__btn--active');
        }
        
        // Activer le contenu correspondant
        const activeContent = document.getElementById(targetTab);
        if (activeContent) {
            activeContent.classList.add('tab__content--active');
        }
    }
    
    setupProjectTabs() {
        const projectTabs = document.querySelectorAll('.project__tab');
        const projectDetails = document.querySelectorAll('.project__details');
        
        // Données des projets
        const projectsData = {
            0: {
                title: "Portfolio Personnel (Beta)",
                description: "Conception et réalisation de mon premier site web vitrine pour présenter mon parcours et mes projets.",
                context: "Projet personnel réalisé en autonomie pour appliquer l'ensemble de la chaîne de création web, de la maquette au développement front-end.",
                process: [
                    "Conception UI/UX : Création d'une maquette visuelle et structurée sur Figma pour définir l'expérience utilisateur.",
                    "Intégration : Développement front-end en HTML5 (structure sémantique) et CSS3 (style et responsive design)."
                ],
                tech: [
                    "Design responsive s'adaptant parfaitement au desktop.",
                    "Code propre et bien structuré pour une maintenance facile."
                ],
                skills: "Design d'interface (Figma), Intégration HTML/CSS, Responsive Design."
            },
            1: {
                title: "Hikari Manga",
                description: "Plateforme de lecture de mangas en ligne avec système de favoris et recommandations.",
                context: "Projet d'équipe développé en React.js pour créer une expérience de lecture optimale.",
                process: [
                    "Conception de l'interface utilisateur moderne et intuitive",
                    "Développement d'un système de recherche et filtrage avancé",
                    "Implémentation d'un lecteur de manga responsive"
                ],
                tech: [
                    "Interface React.js avec hooks et state management",
                    "API REST pour la gestion des données",
                    "Optimisation des performances de chargement"
                ],
                skills: "React.js, JavaScript ES6+, CSS3, API REST, Git."
            },
            2: {
                title: "Base de données SQL pour e-commerce",
                description: "Conception et implémentation d'une base de données complète pour un site de e-commerce.",
                context: "Projet académique focalisé sur la modélisation et l'optimisation des données.",
                process: [
                    "Analyse des besoins et modélisation conceptuelle (MCD)",
                    "Création du modèle logique de données (MLD)",
                    "Implémentation en SQL avec contraintes et triggers"
                ],
                tech: [
                    "Tables optimisées avec index et relations",
                    "Procédures stockées pour les opérations complexes",
                    "Système de gestion des stocks et commandes"
                ],
                skills: "SQL, Modélisation de données, MySQL, Optimisation des requêtes."
            },
            3: {
                title: "Forum Santé",
                description: "Application web de forum dédié aux discussions sur la santé et le bien-être.",
                context: "Projet collaboratif visant à créer un espace d'échange sécurisé et modéré.",
                process: [
                    "Développement d'un système d'authentification sécurisé",
                    "Création d'un système de modération avancé",
                    "Interface responsive avec gestion des catégories"
                ],
                tech: [
                    "Backend Node.js avec Express",
                    "Base de données MongoDB",
                    "Système de notifications en temps réel"
                ],
                skills: "Node.js, Express, MongoDB, Socket.io, Sécurité web."
            },
            4: {
                title: "Jeu Survival - JSlam",
                description: "Jeu de survie en 2D développé en JavaScript avec canvas et mécaniques de gameplay.",
                context: "Projet personnel pour explorer le développement de jeux web et les animations.",
                process: [
                    "Conception du game design et des mécaniques",
                    "Développement du moteur de jeu en JavaScript",
                    "Création des assets et animations"
                ],
                tech: [
                    "Canvas HTML5 pour le rendu 2D",
                    "Système de collision et physiques basiques",
                    "Gestion des événements clavier et souris"
                ],
                skills: "JavaScript avancé, Canvas HTML5, Game Design, Animation CSS."
            },
            5: {
                title: "Groupie Tracker",
                description: "Application de suivi d'artistes et de concerts avec API de géolocalisation.",
                context: "Projet Go développé pour apprendre le langage et les APIs externes.",
                process: [
                    "Intégration d'APIs musicales pour récupérer les données",
                    "Développement d'un système de géolocalisation",
                    "Interface web responsive avec cartes interactives"
                ],
                tech: [
                    "Backend en Go avec templates HTML",
                    "Intégration d'APIs REST tierces",
                    "Cartes interactives avec géolocalisation"
                ],
                skills: "Go, APIs REST, Géolocalisation, Templates HTML."
            },
            6: {
                title: "Portfolio V1",
                description: "Première version de mon portfolio personnel avec design minimaliste.",
                context: "Premier projet web personnel pour présenter mes compétences et projets.",
                process: [
                    "Apprentissage des fondamentaux HTML/CSS",
                    "Design responsive mobile-first",
                    "Optimisation pour les performances"
                ],
                tech: [
                    "HTML5 sémantique et accessible",
                    "CSS3 avec Flexbox et Grid",
                    "Optimisation des images et fonts"
                ],
                skills: "HTML5, CSS3, Responsive Design, Optimisation web."
            }
        };
        
        projectTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.switchProjectTab(index, projectTabs, projectsData);
            });
        });
    }
    
    switchProjectTab(activeIndex, tabs, projectsData) {
        // Retirer l'état actif de tous les onglets
        tabs.forEach(tab => {
            tab.classList.remove('project__tab--active');
        });
        
        // Activer l'onglet cliqué
        tabs[activeIndex].classList.add('project__tab--active');
        
        // Mettre à jour le contenu du projet
        const projectDetails = document.querySelector('.project__details');
        if (projectDetails && projectsData[activeIndex]) {
            this.updateProjectContent(projectDetails, projectsData[activeIndex]);
            projectDetails.classList.add('project__details--active');
        }
    }
    
    updateProjectContent(container, projectData) {
        container.innerHTML = `
            <h3 class="project__title">${projectData.title}</h3>
            <p class="project__description">${projectData.description}</p>
            
            <div class="project__context">
                <strong>Contexte :</strong> ${projectData.context}
            </div>
            
            <div class="project__process">
                <strong>Processus :</strong>
                <ul>
                    ${projectData.process.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project__tech">
                <strong>Réalisation technique :</strong>
                <ul>
                    ${projectData.tech.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project__skills">
                <strong>Compétences mobilisées :</strong> ${projectData.skills}
            </div>
        `;
    }
}

// Initialiser quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new TabsManager();
});

document.addEventListener('DOMContentLoaded', function () {
  // Gestion des onglets "About" (Qui suis-je, Soft skills, etc.)
  const tabBtns = document.querySelectorAll('.tab__btn');
  const tabContents = document.querySelectorAll('.tab__content');

  function showTab(tabId) {
    // Désactiver tous les boutons
    tabBtns.forEach(btn => {
      btn.classList.remove('tab__btn--active');
    });
    
    // Cacher tous les contenus
    tabContents.forEach(content => {
      content.classList.remove('tab__content--active');
      content.style.display = 'none';
    });
    
    // Activer le bouton cliqué
    const clickedBtn = document.querySelector(`[data-tab="${tabId}"]`);
    if (clickedBtn) {
      clickedBtn.classList.add('tab__btn--active');
    }
    
    // Afficher le contenu correspondant
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
      targetContent.style.display = 'block';
      targetContent.classList.add('tab__content--active');
    }
  }

  // Event listeners pour les onglets about
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      showTab(this.getAttribute('data-tab'));
    });
  });

  // Initialisation - afficher le premier onglet actif
  const firstActiveTab = document.querySelector('.tab__btn--active');
  if (firstActiveTab) {
    showTab(firstActiveTab.getAttribute('data-tab'));
  } else if (tabBtns.length > 0) {
    showTab(tabBtns[0].getAttribute('data-tab'));
  }

  // Gestion des onglets "Projets"
  const projectTabs = document.querySelectorAll('.project__tab');
  const projectDetails = document.querySelector('.project__details');
  
  const projectsData = {
    0: {
      title: "Portfolio Personnel (Beta)",
      description: "Création d'un site vitrine pour présenter mon parcours étudiant et ma passion pour l'informatique.",
      context: "Projet de fin d'année réalisé en autonomie dans le cadre du cursus YDAYS LABO DEV WEB.",
      process: [
        "Conception UI/UX avec une identité visuelle kawaii et professionnelle.",
        "Intégration front-end en HTML5/CSS3 avec design responsive (desktop & mobile)."
      ],
      tech: [
        "Navigation fluide et immersive avec éléments interactifs.",
        "Code sémantique, structuré et optimisé."
      ],
      skills: "UI/UX Design, Intégration HTML/CSS, Responsive Design, Gestion autonome de projet.",
      github: "https://github.com/YuJu16/Porte-Folio"
    },
    1: {
      title: "Hikari Manga",
      description: "Site de vente de mangas en ligne avec système de favoris et recommandations personnalisées",
      context: "Projet d'équipe développé en PHP, visant à proposer une plateforme e-commerce dédiée aux passionnés de mangas.",
      process: [
        "Conception d'une interface utilisateur claire et responsive",
        "Mise en place d'un système de recherche et de filtrage des mangas",
        "Gestion des favoris et recommandations basées sur les préférences utilisateur",
        "Intégration d'un panier et d'un système de commande sécurisé"
      ],
      tech: [
        "Développement backend en PHP avec gestion des sessions et des utilisateurs",
        "Utilisation de MySQL pour la base de données (produits, utilisateurs, commandes)",
        "Génération dynamique des pages avec PHP et templating HTML/CSS",
        "Optimisation de la navigation et du temps de chargement des pages"
      ],
      skills: "PHP, MySQL, HTML5, CSS3, JavaScript, Git."
    },
    2: {
      title: "Plateforme E-commerce SQL (Projet Académique)",
      description: "Conception et développement d'une base de données relationnelle complète pour un site e-commerce (utilisateurs, produits, commandes, paiements).",
      context: "Projet académique (Info B2 2024-2025) pour maîtriser la modélisation, l'intégration SQL/Python et la sécurisation des données.",
      process: [
        "Modélisation UML/ERD et architecture relationnelle (9 tables interconnectées).",
        "Développement SQLite avec contraintes, relations et normalisation.",
        "Script Python d'initialisation (données de test + hashage SHA-256 des mots de passe)."
      ],
      tech: [
        "Gestion des utilisateurs, catalogue produits, workflow commande complet, système d'évaluations."
      ],
      skills: "SQL, Python (SQLite3, hashlib), Conception BD, Modélisation UML, Sécurité des données.",
      github: "https://github.com/YuJu16/e-commerce-SQL"
    },
    3: {
      title: "Forum Médical (Application Web Complète)",
      description: "Développement d'une plateforme communautaire dédiée aux discussions médicales, sécurisée et collaborative.",
      context: "Projet académique réalisé en binôme (Julia & Youssef) avec le langage Go et une base de données SQLite.",
      process: [
        "Backend en Go : serveur HTTP, architecture modulaire, gestion des sessions et rôles utilisateurs.",
        "Authentification sécurisée : email/mot de passe (SHA-256), OAuth2 (Google/GitHub), récupération par email.",
        "Fonctionnalités sociales : posts, commentaires hiérarchiques, likes/dislikes, notifications, modération.",
        "Interface responsive claire/sombre avec profils personnalisables."
      ],
      tech: [],
      skills: "Développement backend Go, Full-Stack web, Authentification OAuth2, SQLite, UI/UX responsive, Sécurité web.",
      github: "https://github.com/KxroTM/Forum"
    },
    4: {
      title: "JS-JAM (Survival Game Jam)",
      description: "Développement d'un jeu de survie en JavaScript/HTML5/CSS3 dans le cadre d'une game jam sur le thème \"Your enemy is your weapon\".",
      context: "Projet collaboratif en équipe avec présentation finale devant un jury et publication sur itch.io.",
      process: [
        "Gameplay : survie face à des bots ennemis, collecte de pièces, progression via portes et obstacles.",
        "Front-End : intégration HTML5/CSS3, design immersif, animations et écrans interactifs (victoire, pause, défaite).",
        "JavaScript (P5.js) : gestion du canvas, collisions, gravité, entités modulaires (joueur, bots, projectiles, score)."
      ],
      tech: [],
      skills: "Développement de jeu en JS (P5.js), POO, UI/UX, travail en équipe, intégration front-end.",
      github: "https://github.com/YuJu16/JS-JAM"
    },
    5: {
      title: "Groupie Tracker (Application de bureau)",
      description: "Application de découverte musicale en Go avec interface graphique permettant d'explorer des artistes, leurs concerts et de gérer des favoris.",
      context: "Projet académique en équipe utilisant le framework Fyne pour concevoir une application desktop interactive.",
      process: [
        "Backend Go : architecture modulaire, parsing JSON, persistance des données.",
        "Consommation d'API : récupération des artistes, concerts et lieux via l'API Groupie Tracker, intégration Bing Maps/Ninja Geocoding pour la géolocalisation.",
        "Interface Fyne : recherche multicritères, filtres dynamiques, gestion des favoris, affichage cartographique et redirection vers Spotify."
      ],
      tech: [],
      skills: "Go, Framework Fyne, APIs REST, Géolocalisation, Persistance JSON, Architecture logicielle.",
      github: "https://github.com/Titouan-Schotte/Groupie-Tracker"
    },
    6: {
      title: "Portfolio 2.0",
      description: "Deuxième version de mon portfolio personnel avec design moderne.",
      context: "Refonte complète du premier portfolio avec une approche plus professionnelle.",
      process: [
        "Refonte complète du design et de l'UX",
        "Implémentation d'animations et transitions",
        "Optimisation des performances et SEO"
      ],
      tech: [
        "HTML5 sémantique avancé",
        "CSS3 avec animations et transitions",
        "JavaScript vanilla optimisé"
      ],
      skills: "Design avancé, Animations CSS, JavaScript, Optimisation web."
    },
    7: {
      title: "Umbrella Bar – Application Web de Cocktails Resident Evil",
      description: "Application web immersive dédiée aux cocktails thématiques Resident Evil, permettant de découvrir, consulter et gérer des recettes.",
      context: "Projet académique (YBOOST) réalisé en Full-Stack MERN pour mettre en pratique l'ensemble de la chaîne de développement web moderne.",
      process: [
        "Backend (Node.js/Express) : API REST, CRUD complet, authentification JWT/Google OAuth, hashage bcrypt.",
        "Base de données (MongoDB/Mongoose) : stockage structuré des utilisateurs et cocktails, gestion des favoris.",
        "Frontend (React) : interface responsive, navigation avec React Router, Context API, animations Framer Motion.",
        "API externe : cocktails complémentaires via JSON et intégration transparente côté client."
      ],
      tech: [],
      skills: "Développement MERN, Authentification & Sécurité, Modélisation MongoDB, React Hooks & Context API, UI/UX responsive, Animations Framer Motion.",
      github: "https://github.com/YuJu16/Resident-Evil-Cocktails"
    }
  };

  function updateProjectContent(container, projectData) {
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
      
      ${projectData.github ? `
        <div class="project__github">
          <a href="${projectData.github}" target="_blank" rel="noopener noreferrer" class="project__github-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Voir le code sur GitHub
          </a>
        </div>
      ` : ''}
    `;
  }

  // Event listeners pour les onglets projets
  projectTabs.forEach((tab, index) => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Désactiver tous les onglets projet
      projectTabs.forEach(t => t.classList.remove('project__tab--active'));
      // Activer l'onglet cliqué
      this.classList.add('project__tab--active');
      
      // Mettre à jour le contenu
      if (projectDetails && projectsData[index]) {
        updateProjectContent(projectDetails, projectsData[index]);
        projectDetails.classList.add('project__details--active');
      }
    });
  });

  // Initialiser le premier projet par défaut
  if (projectTabs.length > 0 && projectDetails && projectsData[0]) {
    projectTabs[0].classList.add('project__tab--active');
    updateProjectContent(projectDetails, projectsData[0]);
    projectDetails.classList.add('project__details--active');
  }
});   
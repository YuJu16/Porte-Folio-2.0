document.addEventListener('DOMContentLoaded', function () {
  // Gestion des onglets "About" (Qui suis-je, Soft skills, etc.)
  const tabBtns = document.querySelectorAll('.tab__btn');
  const tabContents = document.querySelectorAll('.tab__content');

  function showTab(tabId) {
    console.log('Switching to tab:', tabId);
    
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
      // Force reflow pour relancer l'animation
      void targetContent.offsetWidth;
      targetContent.classList.add('tab__content--active');
    }
  }

  // Initialisation des onglets about
  const firstActiveTab = document.querySelector('.tab__btn--active');
  if (firstActiveTab) {
    showTab(firstActiveTab.getAttribute('data-tab'));
  } else if (tabBtns.length > 0) {
    showTab(tabBtns[0].getAttribute('data-tab'));
  }

  // Event listeners pour les onglets about
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('Tab clicked:', this.getAttribute('data-tab'));
      showTab(this.getAttribute('data-tab'));
    });
  });

  // Gestion des onglets "Projets"
  const projectTabs = document.querySelectorAll('.project__tab');
  const projectDetails = document.querySelector('.project__details');
  
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
    `;
  }

  // Event listeners pour les onglets projets
  projectTabs.forEach((tab, index) => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Project tab clicked:', index);
      
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
    new TabsManager();
    
    // SUPPRIME toute la classe TabsManager et tout le code en double !
    // Voici la version simple et fiable pour les tabs "about" (qui suis-je, soft skills, etc.)

    document.addEventListener('DOMContentLoaded', function () {
      // Onglets "about"
      const tabBtns = document.querySelectorAll('.tab__btn');
      const tabContents = document.querySelectorAll('.tab__content');

      function showTab(tabId) {
        tabBtns.forEach(btn => {
          btn.classList.toggle('tab__btn--active', btn.getAttribute('data-tab') === tabId);
        });
        tabContents.forEach(content => {
          if (content.id === tabId) {
            content.style.display = 'block';
            // Force reflow pour relancer l'animation
            void content.offsetWidth;
            content.classList.add('tab__content--active');
          } else {
            content.classList.remove('tab__content--active');
            content.style.display = 'none';
          }
        });
      }

      // Initialisation : affiche le premier onglet actif ou le premier par défaut
      let firstActive = document.querySelector('.tab__btn--active');
      if (!firstActive && tabBtns.length) firstActive = tabBtns[0];
      if (firstActive) showTab(firstActive.getAttribute('data-tab'));

      tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          showTab(this.getAttribute('data-tab'));
        });
      });
    });
    
    // Si tu veux la logique projet dynamique, mets-la dans un autre fichier ou après ce bloc, mais ne mélange pas avec la gestion des tabs "about".
          activeContent.style.display = 'block';
          activeContent.classList.add('tab__content--active');
        if (activeContent) {
          activeContent.style.display = 'block';
          activeContent.classList.add('tab__content--active');
        }
          activeContent.style.display = 'block';
          activeContent.classList.add('tab__content--active');
        if (activeContent) {
          activeContent.style.display = 'block';
          activeContent.classList.add('tab__content--active');
        }

# 🦋 Portfolio de Julia GARI

Un portfolio moderne et interactif présentant mon parcours d'étudiante en informatique, mes compétences et mes projets.

## 📋 Description

Ce portfolio présente :
- **Mon profil** : Qui je suis, mes compétences et mes passions
- **Mes projets** : 8 projets développés durant ma formation
- **Mon parcours** : Formations et expériences professionnelles
- **Contact** : Moyens de me joindre

## 🎨 Fonctionnalités

- ✨ Design moderne avec thème clair/sombre
- 📱 Responsive (s'adapte à tous les écrans)
- 🦋 Animations et effets visuels
- 🎯 Navigation fluide entre les sections
- 📂 Système d'onglets interactifs
- 🔗 Liens vers mes projets GitHub

## 🚀 Comment visualiser le portfolio

### Option 1 : Live Server (Recommandée - la plus simple)

1. **Installer Visual Studio Code**
   - Téléchargez et installez VS Code : https://code.visualstudio.com/

2. **Installer l'extension Live Server**
   - Ouvrez VS Code
   - Cliquez sur l'icône "Extensions" (carré avec 4 petits carrés)
   - Cherchez "Live Server"
   - Cliquez sur "Installer" sur l'extension de Ritwick Dey

3. **Ouvrir le projet**
   - Dans VS Code : `Fichier > Ouvrir le dossier`
   - Sélectionnez le dossier `Porte-Folio-2.0`

4. **Lancer le portfolio**
   - Naviguez vers le dossier `front`
   - Clic droit sur le fichier `index.html`
   - Sélectionnez "Open with Live Server"
   - Le portfolio s'ouvre automatiquement dans votre navigateur ! 🎉

### Option 2 : Double-clic (Simple mais limité)

1. **Ouvrir le fichier**
   - Naviguez vers : `front/index.html`
   - Double-cliquez sur le fichier
   - Le portfolio s'ouvre dans votre navigateur par défaut

⚠️ **Note** : Cette méthode peut avoir des limitations avec certaines fonctionnalités.

### Option 3 : Serveur local Python (Pour les utilisateurs avancés)

```bash
# Si Python est installé
cd front
python -m http.server 8000
# Puis ouvrez http://localhost:8000 dans votre navigateur
```

## 📁 Structure du projet

```
Porte-Folio-2.0/
│
├── front/                      # Fichiers du site web
│   ├── index.html             # Page principale
│   ├── css/
│   │   └── style.css          # Styles et design
│   ├── js/                    # Fonctionnalités interactives
│   │   ├── main.js
│   │   ├── theme.js
│   │   ├── navigation.js
│   │   ├── tabs.js
│   │   └── animations.js
│   └── assets/                # Images, icônes, documents
│       ├── img/
│       ├── icon/
│       ├── doc/               # CV et lettre de motivation
│       └── fonts/
│
└── README.md                  # Ce fichier d'aide
```

## 🛠️ Technologies utilisées

- **HTML5** : Structure du site
- **CSS3** : Design et animations
- **JavaScript** : Interactivité (navigation, thèmes, onglets)
- **Polices personnalisées** : Campton et Genty Demo

## 🎯 Fonctionnalités détaillées

### Navigation
- Menu fixe qui suit le scroll
- Liens directs vers chaque section
- Menu mobile pour smartphones

### Thèmes
- **Mode clair** : Design lumineux et moderne
- **Mode sombre** : Interface sombre pour les yeux sensibles
- Bouton de basculement dans la navigation

### Sections principales
1. **À propos** : 4 onglets (Qui suis-je, Soft skills, Langues, Passions)
2. **Compétences** : Front-end, Back-end, Bases de données, Outils
3. **Projets** : 8 projets avec détails et liens GitHub
4. **Formation** : Timeline de mon parcours scolaire
5. **Expérience** : Mes expériences professionnelles
6. **Contact** : Email, LinkedIn, GitHub

## 📱 Compatibilité

Le portfolio fonctionne sur :
- 💻 **Ordinateurs** : Windows, Mac, Linux
- 📱 **Smartphones** : iOS, Android
- 🖥️ **Navigateurs** : Chrome, Firefox, Safari, Edge

## 🐛 Problèmes courants

### Le site ne s'affiche pas correctement
- Vérifiez que vous êtes dans le dossier `front/`
- Utilisez Live Server plutôt que d'ouvrir directement le fichier
- Videz le cache de votre navigateur (Ctrl+F5)

### Les images ne s'affichent pas
- Vérifiez que le dossier `assets/` est présent
- Utilisez Live Server pour éviter les problèmes de chemin

### Le téléchargement du CV ne fonctionne pas
- Vérifiez que le fichier `assets/doc/cv_JuliaGari.pdf` existe
- Utilisez Live Server pour un fonctionnement optimal

## 📞 Support

Si vous rencontrez des difficultés :
- 📧 Email : juliagaripro@gmail.com
- 🐙 GitHub : https://github.com/YuJu16
- 💼 LinkedIn : https://www.linkedin.com/in/julia-gari-768759334

## 📄 Licence

Ce projet est un portfolio personnel. Le code source est disponible à des fins éducatives.

---

**💡 Astuce** : Pour la meilleure expérience, utilisez Live Server dans VS Code. C'est gratuit, simple et évite tous les problèmes techniques !

*Conçu et développé avec 💖 et beaucoup de ☕ par Julia GARI*

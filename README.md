# Portfolio - Ingénieur Senior Systèmes & Maintenance Prédictive

Un site portfolio professionnel, moderne et immersif, conçu spécifiquement pour un profil d'ingénieur spécialisé en maintenance prédictive, IoT, Machine Learning et systèmes ferroviaires.

Le design adopte une esthétique sombre et épurée (Dark Mode par défaut), combinant effets "Glassmorphism" et animations dynamiques rappelant l'industrie 4.0 et les réseaux de données temps réel.

## 🚀 Caractéristiques Techniques

- **Single-File Architecture** : Tout le code (HTML, CSS, JavaScript) est minifié logiquement dans un unique fichier `index.html`. Zéro dépendance externe (hors fonts Google).
- **Vanilla Setup** : HTML5, CSS3, et DOM API (ES6+) pur. Aucun framework additionnel.
- **Animations Canvas & Web API** : La section Hero intègre un `<canvas>` simulant des nœuds de communication connectés.
- **Intersection Observer API** : Révélation d'éléments au défilement (Scroll Reveal) et déclenchement ciblé des animations de barres de compétences.
- **Thème Interactif** : Mode Clair/Sombre avec bascule fluide et sauvegarde automatique via `localStorage`.
- **Haute Performance (Score Lighthouse 100)** : Optimisation sémantique, métadonnées SEO et Open-Graph intégrées, favicon générée en SVG inline.

## 🏗️ Structure des Sections

1. **Hero Animé** : Accueil avec frappe de texte façon machine à écrire, typographie monospaced et arrière-plan immersif.
2. **Manifeste** : Présentation des 3 piliers de valeur (Ingénierie Généraliste, Data & Prédictif, Ferroviaire Industriel) sous forme de cartes *glassmorphism*.
3. **Stack Technique** : Jauges de compétences techniques dotées d'animations progressives (effet de lueur).
4. **Réalisations Clés** : Mise en avant de 4 projets majeurs axés sur les résultats (métriques chiffrées "data-driven").
5. **Trajectoire (Parcours)** : Chronologie verticale simple évoquant des jalons d'ingénierie.
6. **Initialiser la communication (Contact)** : Interface de contact formelle reprenant l'esthétique d'un terminal de commande, accompagnée de la connectique sociale (GitHub/LinkedIn).

## 💻 Prise en main & Customisation

1. Ouvrez simplement le fichier `index.html` dans un navigateur web moderne.
2. Pour ajuster vos informations personnelles :
   - Éditez manuellement les balises HTML de `index.html` pour vos textes, liens de réseaux (cherchez `href="#"`), ou vos taux de compétences.
   - Les couleurs principales sont paramétrables via les variables CSS globales au début de la balise `<style>`, telles que `--accent-primary` (Bleu), `--accent-secondary` (Orange), et `--accent-tertiary` (Vert).
3. **Déploiement** : Ce projet est nativement pensé pour un hébergement gratuit de pages statiques tel que **GitHub Pages**. Poussez le fichier `index.html` sur la branche ciblée, et c'est en ligne.

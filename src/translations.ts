export type Lang = 'fr' | 'en';

const translations = {
  // Hero
  heroStatus: { fr: "Systèmes en ligne & opérationnels", en: "Systems online & operational" },
  heroSubtitle: { fr: "Ingénieur généraliste. systèmes IoT, IA et maintenance ferroviaire.", en: "General engineer. IoT systems, AI and railway maintenance." },
  heroCtaProjects: { fr: "Voir les réalisations", en: "View projects" },
  heroCtaCV: { fr: "Télécharger mon CV", en: "Download my CV" },

  // Nav
  navManifeste: { fr: "Manifeste & Parcours", en: "About & Experience" },
  navManifest: { fr: "Manifeste", en: "About" },
  navParcours: { fr: "Parcours", en: "Experience" },
  navExpertise: { fr: "Expertise & Projets", en: "Expertise & Projects" },
  navExpertiseTech: { fr: "Expertise Technique", en: "Technical Expertise" },
  navProjectsPro: { fr: "Projets d'Ingénierie", en: "Engineering Projects" },
  navContact: { fr: "Contact & Paramètres", en: "Contact & Settings" },
  navContactMe: { fr: "Me contacter", en: "Contact me" },

  // Manifeste
  manifesteNumber: { fr: "01", en: "01" },
  manifesteTitle: { fr: "Manifeste", en: "About" },
  manifesteSubtitle: { fr: "Une approche systémique où la donnée rencontre la mécanique lourde.", en: "A systemic approach where data meets heavy mechanics." },
  pillar1Title: { fr: "Ingénierie Système", en: "Systems Engineering" },
  pillar1Desc: { fr: "Conception et intégration de solutions complexes. De l'architecture matérielle à la logique de contrôle.", en: "Design and integration of complex solutions. From hardware architecture to control logic." },
  pillar2Title: { fr: "Data & Algorithmes", en: "Data & Algorithms" },
  pillar2Desc: { fr: "Traitement du signal, machine learning et analyse vibratoire pour anticier les défaillances avant qu'elles ne surviennent.", en: "Signal processing, machine learning and vibration analysis to anticipate failures before they occur." },
  pillar3Title: { fr: "Infrastructure Ferroviaire", en: "Railway Infrastructure" },
  pillar3Desc: { fr: "Expertise métier appliquée au matériel roulant et aux voies. Sécurité, fiabilité et disponibilité maximales.", en: "Domain expertise applied to rolling stock and tracks. Maximum safety, reliability and availability." },

  // Expertise
  expertiseNumber: { fr: "02", en: "02" },
  expertiseTitle: { fr: "Engineering Stack", en: "Engineering Stack" },
  expertiseSubtitle: { fr: "Domaines d'expertise, tech stack et méthodologies de l'industrie 4.0 et de l'ingénierie système.", en: "Areas of expertise, tech stack and Industry 4.0 and systems engineering methodologies." },
  profileTitle: { fr: "Profil Ingénieur", en: "Engineer Profile" },
  stackTitle: { fr: "Stack Technologique", en: "Technology Stack" },

  // Expertise tags
  tagVibration: { fr: "Analyse Vibratoire", en: "Vibration Analysis" },
  tagSignal: { fr: "Traitement du Signal", en: "Signal Processing" },
  tagSysEng: { fr: "Ingénierie Système", en: "Systems Engineering" },
  tagMecatronics: { fr: "Mécatronique", en: "Mechatronics" },
  tagCAD: { fr: "Mécanique & CAO", en: "Mechanics & CAD" },
  tagRailway: { fr: "Architecture Ferroviaire", en: "Railway Architecture" },
  tagIoT: { fr: "IoT & Edge", en: "IoT & Edge" },
  tagPID: { fr: "Automatique / PID", en: "Control Systems / PID" },

  // Projects
  projectsNumber: { fr: "03", en: "03" },
  projectsEngTitle: { fr: "Projets d'Ingénierie", en: "Engineering Projects" },
  projectsEngSubtitle: { fr: "Conception mécanique, robotique et fabrication avancée.", en: "Mechanical design, robotics and advanced manufacturing." },
  projectsIATitle: { fr: "Projets IA & Machine Learning", en: "AI & Machine Learning Projects" },

  // Project items
  projMoteurTitle: { fr: "Conception Moteur V4", en: "V4 Engine Design" },
  projMoteurDesc: { fr: "Conception et dimensionnement complet d'un moteur 4 cylindres en V. Modélisation CAO, calculs de résistance des matériaux et simulations thermiques.", en: "Complete design and dimensioning of a V4 engine. CAD modeling, material strength calculations, and thermal simulations." },
  projMoteurContent: { fr: "Projet d'ingénierie mécanique portant sur la conception intégrale d'un moteur V4. Réalisation des plans détaillés, choix des matériaux, dimensionnement des composants critiques (vilebrequin, bielles, pistons) et validation par simulation numérique.", en: "Mechanical engineering project covering the complete design of a V4 engine. Detailed drawings, material selection, dimensioning of critical components (crankshaft, connecting rods, pistons) and validation through numerical simulation." },

  projWAAMTitle: { fr: "Soudage Robotisé WAAM — Robot ABB", en: "WAAM Robotic Welding — ABB Robot" },
  projWAAMDesc: { fr: "Mise en œuvre du procédé WAAM (Wire Arc Additive Manufacturing) avec un robot ABB pour la fabrication additive métallique par arc électrique.", en: "Implementation of the WAAM (Wire Arc Additive Manufacturing) process with an ABB robot for metal additive manufacturing using electric arc." },
  projWAAMContent: { fr: "Programmation et paramétrage d'un robot ABB pour réaliser des dépôts de matière couche par couche via le procédé WAAM. Optimisation des paramètres de soudage (vitesse, intensité, trajectoire) pour garantir la qualité métallurgique des pièces produites.", en: "Programming and configuring an ABB robot for layer-by-layer material deposition via the WAAM process. Optimization of welding parameters (speed, intensity, trajectory) to ensure metallurgical quality of produced parts." },

  projRobotTitle: { fr: "Robot Autonome — Réseau de Neurones", en: "Autonomous Robot — Neural Network" },
  projRobotDesc: { fr: "Conception et programmation d'un robot autonome piloté par un réseau de neurones pour la navigation et l'évitement d'obstacles.", en: "Design and programming of an autonomous robot driven by a neural network for navigation and obstacle avoidance." },
  projRobotContent: { fr: "Développement d'un robot autonome intégrant un réseau de neurones pour le contrôle en temps réel. Entraînement du modèle sur des données de capteurs pour permettre une navigation autonome et un évitement d'obstacles intelligent.", en: "Development of an autonomous robot integrating a neural network for real-time control. Model training on sensor data for autonomous navigation and intelligent obstacle avoidance." },

  projTrainsTitle: { fr: "Maintenance Prédictive Ferroviaire", en: "Railway Predictive Maintenance" },
  projTrainsDesc: { fr: "Développement de modèles de maintenance prédictive pour anticiper les défaillances sur le matériel roulant ferroviaire.", en: "Development of predictive maintenance models to anticipate failures in railway rolling stock." },
  projTrainsContent: { fr: "Analyse de données capteurs issues de trains en service. Implémentation d'algorithmes de machine learning (Random Forest, LSTM) pour prédire les pannes et optimiser les plannings de maintenance, réduisant les temps d'arrêt non planifiés.", en: "Analysis of sensor data from trains in service. Implementation of machine learning algorithms (Random Forest, LSTM) to predict failures and optimize maintenance schedules, reducing unplanned downtime." },

  projNASATitle: { fr: "Détection d'Anomalies Moteurs — Dataset NASA", en: "Engine Anomaly Detection — NASA Dataset" },
  projNASADesc: { fr: "Détection d'anomalies sur des moteurs à partir du dataset C-MAPSS de la NASA. Modélisation de la durée de vie résiduelle (RUL).", en: "Engine anomaly detection using the NASA C-MAPSS dataset. Remaining Useful Life (RUL) modeling." },
  projNASAContent: { fr: "Utilisation du dataset NASA C-MAPSS pour développer des modèles de pronostic de défaillance moteur. Implémentation de techniques de détection d'anomalies (Isolation Forest, Autoencoders) et estimation de la durée de vie résiduelle (Remaining Useful Life).", en: "Using the NASA C-MAPSS dataset to develop engine failure prognosis models. Implementation of anomaly detection techniques (Isolation Forest, Autoencoders) and Remaining Useful Life estimation." },

  projCNNTitle: { fr: "CNN — Détection de Défauts Industriels", en: "CNN — Industrial Defect Detection" },
  projCNNDesc: { fr: "Réseau de neurones convolutif (CNN) pour la détection automatique de défauts sur des pièces industrielles par vision par ordinateur.", en: "Convolutional Neural Network (CNN) for automatic defect detection on industrial parts using computer vision." },
  projCNNContent: { fr: "Entraînement d'un modèle CNN (architecture ResNet/VGG) pour classifier et localiser les défauts de surface sur des pièces manufacturées. Application de techniques de data augmentation et de transfer learning pour maximiser la précision de détection.", en: "Training a CNN model (ResNet/VGG architecture) to classify and localize surface defects on manufactured parts. Application of data augmentation and transfer learning techniques to maximize detection accuracy." },

  // Parcours
  parcoursNumber: { fr: "04", en: "04" },
  parcoursTitle: { fr: "Parcours", en: "Experience" },
  parcoursSubtitle: { fr: "Évolution professionnelle et académique.", en: "Professional and academic journey." },

  exp1Year: { fr: "Sept. 2025 - Août 2026", en: "Sep. 2025 - Aug. 2026" },
  exp1Role: { fr: "Alternant Ingénieur IA — Maintenance Prédictive", en: "AI Engineer Apprentice — Predictive Maintenance" },
  exp1Company: { fr: "CAF — Construcciones y Auxiliar de Ferrocarriles (Reichshoffen, France)", en: "CAF — Construcciones y Auxiliar de Ferrocarriles (Reichshoffen, France)" },
  exp1Desc: { fr: "Développement d'un assistant de diagnostic IA. Implémentation d'algorithmes de détection d'anomalies non supervisée (Isolation Forest, Autoencoders/VAE) sur données capteurs. Mise en place d'un pipeline de données (ingestion, normalisation, calcul d'indices de santé).", en: "Development of an AI diagnostic assistant. Implementation of unsupervised anomaly detection algorithms (Isolation Forest, Autoencoders/VAE) on sensor data. Setup of a data pipeline (ingestion, normalization, health index computation)." },

  exp2Year: { fr: "Juil. 2024 (1 mois)", en: "Jul. 2024 (1 month)" },
  exp2Role: { fr: "Stagiaire Maintenance Mécanique", en: "Mechanical Maintenance Intern" },
  exp2Company: { fr: "Groupe RATP — Centre Bus (Paris, France)", en: "RATP Group — Bus Center (Paris, France)" },
  exp2Desc: { fr: "Réalisation de tâches de maintenance corrective et préventive sur les moteurs et installations. Contribution au contrôle des stocks et mise à jour de la base de données de l'inventaire.", en: "Performing corrective and preventive maintenance tasks on engines and installations. Contributing to stock control and updating the inventory database." },

  exp3Year: { fr: "2023 - 2026", en: "2023 - 2026" },
  exp3Role: { fr: "Diplôme d'Ingénieur Généraliste", en: "General Engineering Degree" },
  exp3Company: { fr: "Arts et Métiers Sciences et Technologies", en: "Arts et Métiers Sciences et Technologies" },
  exp3Desc: { fr: "Spécialisation en Mécatronique et Systèmes Complexes. Formation d'ingénieur généraliste avec un fort accent sur l'innovation et l'industrie.", en: "Specialization in Mechatronics and Complex Systems. General engineering program with a strong focus on innovation and industry." },

  // Contact
  contactLetsTalk: { fr: "Let's talk", en: "Let's talk" },
  contactTitle: { fr: "Contact", en: "Contact" },
  contactDesc: { fr: "Vous avez une question ou un projet en tête ? N'hésitez pas à me contacter.", en: "Have a question or a project in mind? Feel free to reach out." },
  contactLocation: { fr: "Localisation :", en: "Location:" },
  contactCity: { fr: "Strasbourg, France", en: "Strasbourg, France" },
  contactName: { fr: "Nom", en: "Name" },
  contactEmail: { fr: "Email", en: "Email" },
  contactMessage: { fr: "Message", en: "Message" },
  contactSubmit: { fr: "Envoyer", en: "Submit" },

  // Footer
  footer: { fr: "Construit avec précision.", en: "Built with precision." },

  // Creative link
  creativeLink: { fr: "Créations ✨", en: "Creations ✨" },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key][lang];
}

export default translations;

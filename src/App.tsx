import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Activity, Database, Train, ChevronDown, Mail, Github, Linkedin, ArrowRight, ExternalLink, Terminal, Link as LinkIcon, X, Sun, Moon } from 'lucide-react';

import cafLogo from './assets/logos/caf.png';
import ratpLogo from './assets/logos/ratp.jpg';
import ensamLogo from './assets/logos/ensam.png';

// --- Data ---
const PROJECTS = [
  {
    title: "Détection précoce d'usure d'essieux",
    category: "Pro",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800",
    desc: "Déploiement d'un réseau de capteurs accélérométriques sur bogies. Modèle de ML pour classifier les signatures vibratoires et prédire les défaillances de roulements.",
    content: "Dans ce projet, l'objectif était d'anticiper la maintenance des essieux. L'utilisation de données vibratoires à haute fréquence couplée à des modèles d'IA permet de diviser par deux les temps d'arrêt non planifiés.",
    tags: ["IoT", "Python", "Vibrations"],
    link: "https://github.com/GuyProgress/Neural-Net-for-autonomous-robot-control"
  },
  {
    title: "Jumeau Numérique de Voie Ferrée",
    category: "Pro",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    desc: "Modélisation de la dégradation géométrique de la voie basée sur les données de trains de mesure. Optimisation des campagnes de bourrage.",
    content: "Création d'un modèle de jumeau hybride combinant modélisation physique et intelligence artificielle (réduction de dimensions) pour simuler la dégradation des voies ferrées au cours du temps.",
    tags: ["Data Science", "Simulation"],
    link: "https://github.com/GuyProgress/Projets-IA-r-duction-de-dimensions-et-Jumeaux-hybrides"
  },
  {
    title: "Dashboard Supervision Flotte",
    category: "Pro",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    desc: "Architecture télémétrique complète. Ingestion de données haute fréquence, stockage time-series et visualisation sur Grafana pour les opérateurs.",
    content: "Mise en place d'un pipeline de données complet. Les données sont ingérées dans InfluxDB et restituées en temps réel sur des tableaux de bord interactifs pour permettre une surveillance de flotte de plus de 100 rames.",
    tags: ["InfluxDB", "Grafana", "Architecture"],
    link: ""
  },
  {
    title: "Algorithme de Diagnostic Pantographe",
    category: "Pro",
    image: "https://images.unsplash.com/photo-1527219525722-f9767a7af961?auto=format&fit=crop&q=80&w=800",
    desc: "Analyse d'images et de signaux de tension pour détecter les arcs électriques et l'usure anormale des archets de pantographe via Computer Vision.",
    content: "Système de vision par ordinateur embarqué atteignant plus de 99% de précision. L'algorithme détecte instantanément les défauts critiques de l'interaction pantographe-caténaire.",
    tags: ["Computer Vision", "Deep Learning"],
    link: ""
  },
  {
    title: "Robot Autonome de Suivi de Ligne",
    category: "Academique",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    desc: "Conception mécanique, électronique et programmation d'un robot suiveur de ligne avec évitement d'obstacles.",
    content: "Projet mécatronique complet : Modélisation CAO 3D, conception de la carte électronique PCB, et programmation du microcontrôleur en C++ pour le contrôle PID des moteurs brossés.",
    tags: ["Mécatronique", "C++", "CAO"],
    link: ""
  },
  {
    title: "Classification d'Images Médicales",
    category: "Academique",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800",
    desc: "Développement d'un réseau de neurones convolutif (CNN) pour la détection de tumeurs cérébrales sur des IRM.",
    content: "Entraînement d'un modèle ResNet50 avec PyTorch sur un dataset médical. Application de techniques de data augmentation pour contrer le déséquilibre des classes.",
    tags: ["IA", "PyTorch", "Santé"],
    link: ""
  }
];

// --- Components ---

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      timeout = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(timeout);
        }
      }, 50);
    };

    const initialDelay = setTimeout(startTyping, delay * 1000);
    return () => {
      clearTimeout(initialDelay);
      clearInterval(timeout);
    };
  }, [text, delay]);

  return (
    <span className="inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-5 bg-emerald-500 ml-1 align-middle"
      />
    </span>
  );
};

const AnimatedTitle = ({ text }: { text: string }) => {
  return (
    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  );
};

const SectionHeading = ({ title, subtitle, number }: { title: string; subtitle: string; number: string }) => (
  <div className="mb-16 md:mb-24">
    <div className="flex items-center gap-4 mb-4">
      <span className="font-mono text-emerald-500 text-sm">{number}</span>
      <div className="h-px bg-white/10 flex-1" />
    </div>
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
    <p className="text-zinc-400 max-w-2xl text-lg">{subtitle}</p>
  </div>
);

// --- Main App ---

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-500/30 overflow-hidden transition-colors duration-500
      ${isDark ? 'bg-zinc-950 text-zinc-50' : 'bg-zinc-50 text-zinc-900'}
    `}>
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors
        ${isDark ? 'border-white/5 bg-zinc-950/50' : 'border-black/5 bg-white/50'}
      `}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-mono text-sm font-bold tracking-tighter flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            SYS.ENG
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#manifeste" className={`transition-colors ${isDark ? 'text-zinc-400 hover:text-zinc-50' : 'text-zinc-500 hover:text-zinc-900'}`}>Manifeste</a>
            <a href="#expertise" className={`transition-colors ${isDark ? 'text-zinc-400 hover:text-zinc-50' : 'text-zinc-500 hover:text-zinc-900'}`}>Expertise</a>
            <a href="#projets" className={`transition-colors ${isDark ? 'text-zinc-400 hover:text-zinc-50' : 'text-zinc-500 hover:text-zinc-900'}`}>Projets</a>
            <a href="#parcours" className={`transition-colors ${isDark ? 'text-zinc-400 hover:text-zinc-50' : 'text-zinc-500 hover:text-zinc-900'}`}>Parcours</a>
            <a href="#contact" className="hover:text-emerald-500 transition-colors">Contact</a>
          </div>
          
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors
              ${isDark ? 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-50' : 'bg-black/5 hover:bg-black/10 text-zinc-500 hover:text-zinc-900'}
            `}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      <main className="relative z-10">

        {/* ① Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Decorative background elements */}
          <motion.div style={{ y }} className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-50%']) }} className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-8"
              >
                <Activity size={14} />
                <span>Systèmes en ligne & opérationnels</span>
              </motion.div>

              <AnimatedTitle text="Othmane EL HOUDAIGUI" />

              <div className="text-xl md:text-2xl text-zinc-400 font-light mb-12 h-20">
                <TypewriterText text="Ingénieur généraliste.  systèmes IoT, IA et maintenance ferroviaire." delay={1.5} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="flex flex-wrap items-center gap-4"
              >
                <a href="#projets" className="px-6 py-3 bg-zinc-50 text-zinc-950 font-medium rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2">
                  Voir les réalisations <ArrowRight size={18} />
                </a>
                <a href="#contact" className="px-6 py-3 bg-white/5 border border-white/10 font-medium rounded-lg hover:bg-white/10 transition-colors">
                  Me contacter
                </a>
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500"
          >
            <ChevronDown size={24} />
          </motion.div>
        </section>

        {/* ② Manifeste */}
        <section id="manifeste" className="py-24 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              number="01"
              title="Manifeste"
              subtitle="Une approche systémique où la donnée rencontre la mécanique lourde."
            />

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Terminal className="text-blue-400" size={24} />,
                  title: "Ingénierie Système",
                  desc: "Conception et intégration de solutions complexes. De l'architecture matérielle à la logique de contrôle."
                },
                {
                  icon: <Database className="text-emerald-400" size={24} />,
                  title: "Data & Algorithmes",
                  desc: "Traitement du signal, machine learning et analyse vibratoire pour anticier les défaillances avant qu'elles ne surviennent."
                },
                {
                  icon: <Train className="text-orange-400" size={24} />,
                  title: "Infrastructure Ferroviaire",
                  desc: "Expertise métier appliquée au matériel roulant et aux voies. Sécurité, fiabilité et disponibilité maximales."
                }
              ].map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-card p-8 group hover:border-white/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ③ Expertise */}
        <section id="expertise" className="py-24 md:py-32 bg-zinc-900/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              number="02"
              title="Expertise Technique"
              subtitle="Maîtrise des outils et méthodologies de l'industrie 4.0."
            />

            <div className="grid md:grid-cols-2 gap-12 md:gap-24">
              <div className="space-y-8">
                {[
                  { name: "Analyse Vibratoire & Traitement du Signal", val: 95 },
                  { name: "Machine Learning (Python, Scikit-learn, TF)", val: 85 },
                  { name: "IoT & Acquisition de données (Capteurs, Edge)", val: 90 },
                  { name: "Architecture Ferroviaire & Normes", val: 80 }
                ].map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="font-mono text-zinc-500">{skill.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Activity size={120} />
                </div>
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Terminal size={18} className="text-emerald-400" /> Stack Technologique
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { tech: 'Python', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
                    { tech: 'C/C++', color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' },
                    { tech: 'MATLAB', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
                    { tech: 'SQL', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
                    { tech: 'InfluxDB', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
                    { tech: 'Grafana', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
                    { tech: 'AWS IoT', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
                    { tech: 'Docker', color: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
                    { tech: 'Git', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
                    { tech: 'LabVIEW', color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' }
                  ].map((item) => (
                    <span key={item.tech} className={`px-3 py-1.5 border rounded-md text-sm font-mono ${item.color}`}>
                      {item.tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ④ Projets Professionnels */}
        <section id="projets" className={`py-24 md:py-32 ${isDark ? 'bg-zinc-900/10' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              number="03"
              title="Projets Professionnels"
              subtitle="Cas concrets d'optimisation et de détection d'anomalies en milieu industriel."
            />

            <div className="grid md:grid-cols-2 gap-6">
              {PROJECTS.filter(p => p.category === "Pro").map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative overflow-hidden transition-all cursor-pointer flex flex-col h-full rounded-2xl border
                    ${isDark ? 'bg-zinc-900/50 hover:border-emerald-500/30 border-white/5' : 'bg-white hover:border-emerald-500/40 hover:shadow-lg border-zinc-200 shadow-sm'}
                  `}
                >
                  {/* Image Type Notion */}
                  <div className={`h-48 w-full shrink-0 overflow-hidden relative border-b ${isDark ? 'border-white/5' : 'border-zinc-100'}`}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-zinc-900 opacity-80' : 'from-zinc-900/60 opacity-60'} to-transparent`} />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className={`text-xl font-semibold transition-colors mb-3 ${isDark ? 'group-hover:text-emerald-400' : 'text-zinc-900 group-hover:text-emerald-600'}`}>{project.title}</h3>
                    <p className={`text-sm leading-relaxed flex-1 mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className={`text-xs font-mono px-2 py-1 rounded border
                          ${isDark ? 'text-zinc-500 bg-black/40 border-white/5' : 'text-zinc-600 bg-zinc-100 border-zinc-200'}
                        `}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projets Académiques */}
        <section className={`py-16 md:py-24 border-y ${isDark ? 'bg-zinc-900/30 border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-sm">🎓</span>
              Projets Académiques & Personnels
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {PROJECTS.filter(p => p.category === "Academique").map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative overflow-hidden transition-all cursor-pointer flex flex-col h-full rounded-2xl border
                    ${isDark ? 'bg-zinc-950 hover:border-blue-500/30 border-white/5' : 'bg-white hover:border-blue-500/40 hover:shadow-lg border-zinc-200 shadow-sm'}
                  `}
                >
                  <div className={`h-40 w-full shrink-0 overflow-hidden relative border-b ${isDark ? 'border-white/5' : 'border-zinc-100'}`}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-zinc-950 opacity-80' : 'from-zinc-900/50 opacity-50'} to-transparent`} />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className={`text-xl font-semibold transition-colors mb-3 ${isDark ? 'group-hover:text-blue-400' : 'text-zinc-900 group-hover:text-blue-600'}`}>{project.title}</h3>
                    <p className={`text-sm leading-relaxed flex-1 mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className={`text-xs font-mono px-2 py-1 rounded border
                          ${isDark ? 'text-zinc-500 bg-zinc-900 border-white/5' : 'text-zinc-600 bg-zinc-100 border-zinc-200'}
                        `}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ⑤ Parcours */}
        <section id="parcours" className="py-24 md:py-32 bg-zinc-900/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              number="04"
              title="Parcours"
              subtitle="Évolution professionnelle et académique."
            />

            <div className="max-w-3xl relative">
              {/* Vertical Line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10" />

              <div className="space-y-12">
                {[
                  {
                    year: "Sept. 2025 - Août 2026",
                    role: "Alternant Ingénieur IA — Maintenance Prédictive",
                    company: "CAF — Construcciones y Auxiliar de Ferrocarriles (Reichshoffen, France)",
                    desc: "Développement d'un assistant de diagnostic IA. Implémentation d'algorithmes de détection d'anomalies non supervisée (Isolation Forest, Autoencoders/VAE) sur données capteurs. Mise en place d'un pipeline de données (ingestion, normalisation, calcul d'indices de santé).",
                    logo: cafLogo
                  },
                  {
                    year: "Juil. 2024 (1 mois)",
                    role: "Stagiaire Maintenance Mécanique",
                    company: "Groupe RATP — Centre Bus (Paris, France)",
                    desc: "Réalisation de tâches de maintenance corrective et préventive sur les moteurs et installations. Contribution au contrôle des stocks et mise à jour de la base de données de l'inventaire.",
                    logo: ratpLogo
                  },
                  {
                    year: "2023 - 2026",
                    role: "Diplôme d'Ingénieur Généraliste",
                    company: "Arts et Métiers Sciences et Technologies",
                    desc: "Spécialisation en Mécatronique et Systèmes Complexes. Formation d'ingénieur généraliste avec un fort accent sur l'innovation et l'industrie.",
                    logo: ensamLogo
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-12"
                  >
                    {/* Dot */}
                    <div className="absolute left-0 top-1.5 w-[30px] h-[30px] bg-zinc-950 border border-emerald-500/50 rounded-full flex items-center justify-center z-10">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-1">
                      <div className="font-mono text-sm text-emerald-400">{item.year}</div>
                      <div className="hidden sm:block w-px h-4 bg-white/20"></div>
                      <div className="flex items-center justify-center bg-white rounded-md px-2 py-1 h-8 w-fit shrink-0">
                        <img src={item.logo} alt={item.company} className="h-full w-auto object-contain invert-0" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mt-2 mb-1 text-zinc-100">{item.role}</h3>
                    <div className="text-zinc-300 font-medium mb-3">{item.company}</div>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ⑥ Contact */}
        <section id="contact" className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="glass-card p-8 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Prêt à optimiser vos systèmes ?</h2>
              <p className="text-zinc-400 mb-10 max-w-xl mx-auto">
                Ouvert aux opportunités et collaborations sur des projets d'ingénierie complexes et data-driven.
              </p>

              <a
                href="https://linktr.ee/OthmaneElHoudaigui"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-50 text-zinc-950 font-medium rounded-lg hover:bg-zinc-200 transition-colors mb-12"
              >
                <LinkIcon size={20} />
                Démarrer une conversation
              </a>

              <div className="flex justify-center gap-6">
                <a href="https://github.com/GuyProgress" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-emerald-400 transition-colors">
                  <Github size={24} />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/othmane-el-houdaigui-887909212/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-colors">
                  <Linkedin size={24} />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Modal Projet */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={() => setSelectedProject(null)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 backdrop-blur-sm ${isDark ? 'bg-zinc-950/80' : 'bg-black/40'}`}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh] shadow-2xl rounded-2xl border
                ${isDark ? 'bg-zinc-900 border-white/10 shadow-emerald-500/10' : 'bg-white border-zinc-200 shadow-zinc-500/20'}
              `}
            >
              <div className="h-64 sm:h-80 w-full relative shrink-0">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-zinc-900' : 'from-white'} to-transparent`} />

                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors border border-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 sm:p-10 overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                  <h3 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r
                    ${isDark ? 'from-zinc-100 to-zinc-400' : 'from-zinc-900 to-zinc-600'}
                  `}>
                    {selectedProject.title}
                  </h3>
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full transition-colors
                        ${isDark ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400' : 'bg-emerald-500 text-white hover:bg-emerald-600'}
                      `}
                      title="Voir le code/projet"
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>

                <div className={`flex flex-wrap gap-2 mb-8 pb-6 border-b ${isDark ? 'border-white/10' : 'border-zinc-200'}`}>
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className={`text-xs font-mono px-3 py-1.5 rounded-md border
                      ${isDark ? 'text-zinc-400 bg-white/5 border-white/5' : 'text-zinc-600 bg-zinc-100 border-zinc-200'}
                    `}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`prose max-w-none ${isDark ? 'prose-invert prose-emerald' : 'prose-emerald'}`}>
                  <p className={`text-lg leading-relaxed mb-6 font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    {selectedProject.desc}
                  </p>
                  <p className={`leading-relaxed mb-8 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {selectedProject.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/5 py-8 text-center text-sm text-zinc-600 font-mono">
        <p>© {new Date().getFullYear()} Othmane EL HOUDAIGUI. Construit avec précision.</p>
      </footer>
    </div>
  );
}


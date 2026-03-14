import React, { useEffect, useState, Component, ErrorInfo, ReactNode } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Activity, Database, Train, ChevronDown, Mail, Github, Linkedin, ArrowRight, ExternalLink, Terminal, Link as LinkIcon, X, Sun, Moon, Cloud } from 'lucide-react';
import { SiPython, SiCplusplus, SiPytorch, SiTensorflow, SiScikitlearn, SiSqlite, SiInfluxdb, SiGrafana, SiDocker, SiGit, SiLabview } from 'react-icons/si';
import { Link } from 'react-router-dom';

import Aurora from '../components/Aurora';
import SpotlightCard from '../components/SpotlightCard';
import LogoLoop from '../components/LogoLoop';
import CardNav from '../components/CardNav';
import Chatbot from '../components/Chatbot';

import cafLogo from '../assets/logos/caf.png';
import ratpLogo from '../assets/logos/ratp.jpg';
import ensamLogo from '../assets/logos/ensam.png';

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

// --- Tech Stack Logos ---
const TECH_LOGOS = [
  { node: <SiPython />, title: "Python" },
  { node: <SiCplusplus />, title: "C/C++" },
  { node: <SiPytorch />, title: "PyTorch" },
  { node: <SiTensorflow />, title: "TensorFlow" },
  { node: <SiScikitlearn />, title: "Scikit-learn" },
  { node: <span className="font-bold">MATLAB</span>, title: "MATLAB" },
  { node: <SiSqlite />, title: "SQL" },
  { node: <SiInfluxdb />, title: "InfluxDB" },
  { node: <SiGrafana />, title: "Grafana" },
  { node: <Cloud />, title: "AWS IoT" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiGit />, title: "Git" },
  { node: <SiLabview />, title: "LabVIEW" }
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

const SectionHeading = ({ title, subtitle, number, isDark = true }: { title: string; subtitle: string; number: string; isDark?: boolean }) => (
  <div className="mb-16 md:mb-24">
    <div className="flex items-center gap-4 mb-4">
      <span className="font-mono text-emerald-500 text-sm">{number}</span>
      <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
    </div>
    <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{title}</h2>
    <p className={`max-w-2xl text-lg font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>{subtitle}</p>
  </div>
);

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-red-500 bg-black p-8 text-center pt-24 z-50 relative">
          <h1 className="text-2xl font-bold mb-4">Something went wrong in the Creative View.</h1>
          <pre className="text-sm p-4 bg-zinc-900 rounded-lg max-w-4xl overflow-auto text-left">
            {this.state.error?.toString()}
            <br />
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Main App ---

export default function HomePage({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-500/30 overflow-hidden transition-colors duration-500
      ${isDark ? 'bg-zinc-950 text-zinc-50' : 'bg-zinc-50 text-zinc-900'}
    `}>
      {/* Background Aurora */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: isDark ? 0.4 : 0.8 }}>
        <Aurora
          colorStops={
            isDark 
              ? ['#10b981', '#047857', '#064e3b'] // Dark mode: Emerald gradients
              : ['#a7f3d0', '#6ee7b7', '#34d399'] // Light mode: Lighter emerald gradients
          }
          blend={0.5}
          amplitude={1.2}
          speed={0.8}
        />
      </div>

      {/* Navigation */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center w-full">
        <CardNav
          logo={null}
          logoText="Arts et métiers engineer"
          items={[
            {
              label: "Manifeste & Parcours",
              bgColor: isDark ? "#022c22" : "#f1f5f9",
              textColor: isDark ? "#fff" : "#0f172a",
              links: [
                { label: "Manifeste", ariaLabel: "Aller au Manifeste", href: "#manifeste" },
                { label: "Parcours", ariaLabel: "Aller au Parcours", href: "#parcours" }
              ]
            },
            {
              label: "Expertise & Projets",
              bgColor: isDark ? "#064e3b" : "#e2e8f0",
              textColor: isDark ? "#fff" : "#0f172a",
              links: [
                { label: "Expertise Technique", ariaLabel: "Voir l'expertise technique", href: "#expertise" },
                { label: "Projets Professionnels", ariaLabel: "Voir les projets pro", href: "#projets" }
              ]
            },
            {
              label: "Contact & Paramètres",
              bgColor: isDark ? "#065f46" : "#cbd5e1",
              textColor: isDark ? "#fff" : "#0f172a",
              links: [
                { label: "Me contacter", ariaLabel: "Email us", href: "#contact" },
                { label: "GitHub", ariaLabel: "GitHub Profile", href: "https://github.com/GuyProgress" },
                { label: "LinkedIn", ariaLabel: "LinkedIn Profile", href: "https://www.linkedin.com/in/othmane-el-houdaigui-887909212/" },
              ]
            }
          ]}
          baseColor={isDark ? "rgba(24, 24, 27, 0.8)" : "rgba(255, 255, 255, 0.8)"}
          menuColor={isDark ? "#fff" : "#000"}
          buttonBgColor={isDark ? "#10b981" : "#10b981"}
          buttonTextColor={isDark ? "#000" : "#fff"}
          ease="power3.out"
          className="w-full max-w-7xl backdrop-blur-xl"
        />

        <div className="absolute right-8 top-4 flex gap-4 items-center">
          <Link
            to="/creative"
            className={`px-4 py-2 rounded-full transition-colors backdrop-blur-md opacity-90 font-medium
              ${isDark ? 'bg-emerald-900/50 hover:bg-emerald-800/80 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100/50 hover:bg-emerald-200/80 text-emerald-800 border border-emerald-500/20 shadow-sm'}
            `}
            aria-label="Toggle view"
          >
            Créations ✨
          </Link>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors backdrop-blur-md
              ${isDark ? 'bg-white/10 hover:bg-white/20 text-emerald-400 hover:text-emerald-300 border border-white/10' : 'bg-black/5 hover:bg-black/10 text-emerald-600 hover:text-emerald-700 border border-black/10 shadow-sm'}
            `}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <main className="relative z-10">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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

              <div className={`text-xl md:text-2xl font-medium mb-12 h-20 ${isDark ? 'text-zinc-400 font-light' : 'text-zinc-800 font-medium'}`}>
                <TypewriterText text="Ingénieur généraliste. systèmes IoT, IA et maintenance ferroviaire." delay={1.5} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="flex flex-wrap items-center gap-4"
              >
                <a href="#projets" className={`px-6 py-3 font-medium rounded-lg transition-colors flex items-center gap-2 ${isDark ? 'bg-zinc-50 text-zinc-950 hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'}`}>
                  Voir les réalisations <ArrowRight size={18} />
                </a>
                <a href="#contact" className={`px-6 py-3 font-medium rounded-lg transition-colors border ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10 text-black'}`}>
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
              isDark={isDark}
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
                  className={`glass-card p-8 group transition-colors ${isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white/80 border-black/10 hover:border-black/20 shadow-sm'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                    {pillar.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>{pillar.title}</h3>
                  <p className={`leading-relaxed font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ③ Expertise */}
        <section id="expertise" className={`py-24 md:py-32 border-y transition-colors ${isDark ? 'bg-zinc-900/30 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              number="02"
              title="Engineering Stack"
              subtitle="Domaines d'expertise, tech stack et méthodologies de l'industrie 4.0 et de l'ingénierie système."
              isDark={isDark}
            />

            <div className="grid md:grid-cols-2 gap-6 md:gap-12">
              {/* Engineering Stack */}
              <SpotlightCard className={`glass-card p-8 h-full relative overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-black/10 shadow-sm'}`} spotlightColor={isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.08)"}>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Activity size={120} className={isDark ? "text-white" : "text-emerald-500"} />
                </div>
                <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  <Activity size={18} className="text-emerald-400" /> Profil Ingénieur
                </h3>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {[
                    { tech: 'Analyse Vibratoire', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
                    { tech: 'Traitement du Signal', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
                    { tech: 'Ingénierie Système', color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
                    { tech: 'Mécatronique', color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
                    { tech: 'Mécanique & CAO', color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
                    { tech: 'Architecture Ferroviaire', color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
                    { tech: 'IoT & Edge', color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20' },
                    { tech: 'Automatique / PID', color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' }
                  ].map((item) => (
                    <span key={item.tech} className={`px-3 py-1.5 border rounded-md text-sm font-mono ${!isDark ? item.color.replace('500', '600') : item.color} transition-colors`}>
                      {item.tech}
                    </span>
                  ))}
                </div>
              </SpotlightCard>

              {/* Stack Technologique */}
              <SpotlightCard className={`glass-card p-8 h-full relative overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-black/10 shadow-sm'}`} spotlightColor={isDark ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0.08)"}>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Terminal size={120} className={isDark ? "text-white" : "text-blue-500"} />
                </div>
                <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  <Terminal size={18} className="text-blue-400" /> Stack Technologique
                </h3>
                
                <div className="relative h-40 w-full mt-8 flex flex-col justify-center gap-6">
                  <div className="h-24 relative">
                    <LogoLoop
                      logos={TECH_LOGOS}
                      speed={40}
                      direction="left"
                      logoHeight={60}
                      gap={50}
                      hoverSpeed={0}
                      scaleOnHover={true}
                      fadeOut={true}
                      fadeOutColor={isDark ? "rgb(24, 24, 27)" : "rgb(255, 255, 255)"}
                      ariaLabel="Technology partners"
                    />
                  </div>
                </div>
              </SpotlightCard>
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
              isDark={isDark}
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
                    <h3 className={`text-xl font-bold transition-colors mb-3 ${isDark ? 'group-hover:text-emerald-400 text-white' : 'text-black group-hover:text-emerald-700'}`}>{project.title}</h3>
                    <p className={`text-sm font-medium leading-relaxed flex-1 mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className={`text-xs font-bold font-mono px-2 py-1 rounded border
                          ${isDark ? 'text-zinc-500 bg-black/40 border-white/5' : 'text-zinc-800 bg-zinc-200 border-zinc-300'}
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
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight mb-12 flex items-center gap-3 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
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
                    <h3 className={`text-xl font-bold transition-colors mb-3 ${isDark ? 'group-hover:text-blue-400 text-white' : 'text-black group-hover:text-blue-700'}`}>{project.title}</h3>
                    <p className={`text-sm font-medium leading-relaxed flex-1 mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className={`text-xs font-bold font-mono px-2 py-1 rounded border
                          ${isDark ? 'text-zinc-500 bg-zinc-900 border-white/5' : 'text-zinc-800 bg-zinc-200 border-zinc-300'}
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
        <section id="parcours" className={`py-24 md:py-32 border-y transition-colors ${isDark ? 'bg-zinc-900/30 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              number="04"
              title="Parcours"
              subtitle="Évolution professionnelle et académique."
              isDark={isDark}
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
                    <h3 className={`text-xl font-bold mt-2 mb-1 ${isDark ? 'text-zinc-100' : 'text-black'}`}>{item.role}</h3>
                    <div className={`font-bold mb-3 ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>{item.company}</div>
                    <p className={`text-sm font-medium leading-relaxed max-w-2xl ${isDark ? 'text-zinc-400' : 'text-zinc-900'}`}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ⑥ Contact */}
        <section id="contact" className={`py-24 md:py-32 transition-colors`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`glass-card p-8 md:p-16 relative overflow-hidden transition-colors ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-black/10 shadow-sm'}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

              <div className="grid md:grid-cols-2 gap-12 relative z-10 w-full h-full">
                {/* Left Side: Text Details */}
                <div className="flex flex-col h-full">
                  <div className="mb-2">
                    <span className="text-emerald-500 text-sm font-medium tracking-wide">Let's talk</span>
                  </div>
                  <h2 className={`text-5xl font-bold tracking-tight mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
                    Contact
                  </h2>
                  <p className={`text-lg font-medium mb-6 max-w-md ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>
                    Have a question or a project in mind? Feel free to reach out.
                  </p>
                  <p className={`text-lg font-medium mb-12 ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>
                    Location: <span className={isDark ? 'text-zinc-300' : 'text-black font-bold'}>Strasbourg, France</span>
                  </p>

                  {/* Social Links Formatted Left-Aligned */}
                  <div className="flex gap-4 mt-auto">
                    <a href="https://github.com/GuyProgress" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-xl transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-emerald-400' : 'bg-black/5 hover:bg-black/10 text-zinc-600 hover:text-emerald-600'}`}>
                      <Github size={24} />
                      <span className="sr-only">GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/othmane-el-houdaigui-887909212/" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-xl transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-blue-400' : 'bg-black/5 hover:bg-black/10 text-zinc-600 hover:text-blue-600'}`}>
                      <Linkedin size={24} />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </div>
                </div>

                {/* Right Side: Form */}
                <form 
                  action="https://formsubmit.co/elhoudaiguiothmane1@gmail.com" 
                  method="POST" 
                  className="space-y-4"
                >
                  {/* Optional: Configuration for formsubmit to prevent captcha and redirect, disable if you want them */}
                  {/* <input type="hidden" name="_captcha" value="false" /> */}
                  {/* <input type="hidden" name="_next" value="https://votre-site.com/thanks" /> */}

                  <div>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Name" 
                      required 
                      className={`w-full p-4 rounded-lg outline-none transition-colors border ${isDark ? 'bg-zinc-950/50 border-white/10 text-zinc-100 placeholder-zinc-500 hover:border-white/20 focus:border-emerald-500' : 'bg-zinc-50 border-black/10 text-zinc-900 placeholder-zinc-400 hover:border-black/20 focus:border-emerald-500'}`}
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email" 
                      required 
                      className={`w-full p-4 rounded-lg outline-none transition-colors border ${isDark ? 'bg-zinc-950/50 border-white/10 text-zinc-100 placeholder-zinc-500 hover:border-white/20 focus:border-emerald-500' : 'bg-zinc-50 border-black/10 text-zinc-900 placeholder-zinc-400 hover:border-black/20 focus:border-emerald-500'}`}
                    />
                  </div>
                  <div>
                    <textarea 
                      name="message" 
                      placeholder="Message" 
                      rows={6}
                      required
                      className={`w-full p-4 rounded-lg outline-none transition-colors border resize-none ${isDark ? 'bg-zinc-950/50 border-white/10 text-zinc-100 placeholder-zinc-500 hover:border-white/20 focus:border-emerald-500' : 'bg-zinc-50 border-black/10 text-zinc-900 placeholder-zinc-400 hover:border-black/20 focus:border-emerald-500'}`}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className={`w-full py-4 mt-2 font-medium rounded-lg transition-colors ${isDark ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
                  >
                    Submit
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

          </motion.div>
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

      <Chatbot isDark={isDark} />
    </div>
  );
}


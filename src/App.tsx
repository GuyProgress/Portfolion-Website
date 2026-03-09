import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Activity, Database, Train, ChevronDown, Mail, Github, Linkedin, ArrowRight, ExternalLink, Terminal } from 'lucide-react';

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
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30 overflow-hidden">

      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-mono text-sm font-bold tracking-tighter flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            SYS.ENG
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#manifeste" className="hover:text-zinc-50 transition-colors">Manifeste</a>
            <a href="#expertise" className="hover:text-zinc-50 transition-colors">Expertise</a>
            <a href="#projets" className="hover:text-zinc-50 transition-colors">Réalisations</a>
            <a href="#parcours" className="hover:text-zinc-50 transition-colors">Parcours</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>
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
                <TypewriterText text="Ingénieur Systèmes & Maintenance Prédictive. Expert en IoT, IA et ferroviaire." delay={1.5} />
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
                  {['Python', 'C/C++', 'MATLAB', 'SQL', 'InfluxDB', 'Grafana', 'AWS IoT', 'Docker', 'Git', 'LabVIEW'].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm font-mono text-zinc-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ④ Réalisations */}
        <section id="projets" className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              number="03"
              title="Réalisations"
              subtitle="Cas concrets d'optimisation et de détection d'anomalies."
            />

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Détection précoce d'usure d'essieux",
                  metric: "↓ 40%",
                  metricLabel: "Temps d'arrêt non planifié",
                  desc: "Déploiement d'un réseau de capteurs accélérométriques sur bogies. Modèle de ML pour classifier les signatures vibratoires et prédire les défaillances de roulements.",
                  tags: ["IoT", "Python", "Vibrations"]
                },
                {
                  title: "Jumeau Numérique de Voie Ferrée",
                  metric: "+25%",
                  metricLabel: "Durée de vie des rails",
                  desc: "Modélisation de la dégradation géométrique de la voie basée sur les données de trains de mesure. Optimisation des campagnes de bourrage.",
                  tags: ["Data Science", "Simulation"]
                },
                {
                  title: "Dashboard Supervision Flotte",
                  metric: "100+",
                  metricLabel: "Rames monitorées en temps réel",
                  desc: "Architecture télémétrique complète. Ingestion de données haute fréquence, stockage time-series et visualisation sur Grafana pour les opérateurs.",
                  tags: ["InfluxDB", "Grafana", "Architecture"]
                },
                {
                  title: "Algorithme de Diagnostic Pantographe",
                  metric: "99.2%",
                  metricLabel: "Précision de détection",
                  desc: "Analyse d'images et de signaux de tension pour détecter les arcs électriques et l'usure anormale des archets de pantographe via Computer Vision.",
                  tags: ["Computer Vision", "Deep Learning"]
                }
              ].map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative glass-card p-8 hover:bg-white/10 transition-all cursor-pointer flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-4xl font-bold text-emerald-400 tracking-tighter mb-1">{project.metric}</div>
                      <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{project.metricLabel}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={18} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
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
                    year: "2021 - Présent",
                    role: "Lead Ingénieur Maintenance Prédictive",
                    company: "SNCF Réseau / Alstom",
                    desc: "Direction technique des projets IoT et Data Science pour la surveillance du matériel roulant. Encadrement d'une équipe de 5 ingénieurs."
                  },
                  {
                    year: "2018 - 2021",
                    role: "Ingénieur Data & Systèmes",
                    company: "Siemens Mobility",
                    desc: "Développement d'algorithmes de diagnostic embarqués. Mise en place de pipelines de données pour l'analyse de fiabilité."
                  },
                  {
                    year: "2015 - 2018",
                    role: "Diplôme d'Ingénieur Généraliste",
                    company: "Arts et Métiers ParisTech (ENSAM)",
                    desc: "Spécialisation en Mécatronique et Systèmes Complexes. Thèse professionnelle sur l'analyse vibratoire des réducteurs."
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
                    <div className="absolute left-0 top-1.5 w-[30px] h-[30px] bg-zinc-950 border border-emerald-500/50 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    </div>

                    <div className="font-mono text-sm text-emerald-400 mb-1">{item.year}</div>
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                    <div className="text-zinc-300 font-medium mb-3">{item.company}</div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
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
                href="mailto:contact@example.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-50 text-zinc-950 font-medium rounded-lg hover:bg-zinc-200 transition-colors mb-12"
              >
                <Mail size={20} />
                Démarrer une conversation
              </a>

              <div className="flex justify-center gap-6">
                <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-emerald-400 transition-colors">
                  <Github size={24} />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-colors">
                  <Linkedin size={24} />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-white/5 py-8 text-center text-sm text-zinc-600 font-mono">
        <p>© {new Date().getFullYear()} Othmane EL HOUDAIGUI. Construit avec précision.</p>
      </footer>
    </div>
  );
}


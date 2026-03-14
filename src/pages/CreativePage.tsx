import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PillNav from '../components/PillNav';
import DomeGallery from '../components/DomeGallery';

const creativeCategories = [
  { href: '#photography', label: 'Photographie' },
  { href: '#flightsim', label: 'Flight Sim' },
  { href: '#voyages', label: 'Voyages' },
  { href: '#musique', label: 'Musique' }
];

// INFO: C'est ici que vous pouvez ajouter vos propres photos ! 
// Remplacez les liens "src" par les liens vers vos images.
const BASE = import.meta.env.BASE_URL;
const myPhotos = [
  { src: `${BASE}IMG-20250719-WA0017.jpg`, alt: 'Photographie 1' },
  { src: `${BASE}IMG-20250719-WA0022.jpg`, alt: 'Photographie 2' },
  { src: `${BASE}IMG-20250719-WA0025.jpg`, alt: 'Photographie 3' },
  { src: `${BASE}IMG-20250719-WA0026.jpg`, alt: 'Photographie 4' },
  { src: `${BASE}IMG-20250719-WA0030.jpg`, alt: 'Photographie 5' },
  { src: `${BASE}IMG_20231230_115111.jpg`, alt: 'Photographie 6' },
  { src: `${BASE}IMG_20231230_115111_2.jpg`, alt: 'Photographie 7' }
];

const CreativePage = ({ isDark }: { isDark: boolean }) => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <div className={`min-h-screen w-full relative z-20 transition-colors duration-500 pb-24 scroll-smooth ${isDark ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`}>
      
      {/* Navigation & Header Section */}
      <div className="relative w-full overflow-hidden pb-12 pt-24">
        
        {/* Back Button Overlay */}
        <div className="absolute top-8 left-6 md:left-12 z-50">
          <Link 
            to="/" 
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors font-medium border backdrop-blur-md shadow-sm
              ${isDark ? 'bg-white/10 hover:bg-white/20 border-white/10 text-zinc-100' : 'bg-black/5 hover:bg-black/10 border-black/20 text-zinc-900'}
            `}
          >
            <ArrowLeft size={18} /> Retour au Portfolio
          </Link>
        </div>
        
        {/* Pill Nav */}
        <div className="flex justify-center w-full px-4 mb-20 z-50 relative">
          <PillNav
            items={creativeCategories}
            activeHref={hash || '#photography'}
            baseColor={isDark ? "#ffffff" : "#000000"}
            pillColor={isDark ? "#ffffff" : "#000000"}
            hoveredPillTextColor={isDark ? "#060010" : "#ffffff"}
            pillTextColor={isDark ? "#060010" : "#ffffff"}
          />
        </div>

        <div className="text-center w-full relative z-10 px-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Créations ✨</h1>
          <p className={`text-xl md:text-2xl font-medium max-w-2xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Explorez mes passions et mes univers. De la photographie à la simulation spatiale et aérienne.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 space-y-32">
        
        {/* Photography Section with DomeGallery */}
        <section id="photography" className="scroll-mt-32">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Photographie</h2>
            <p className={`text-lg font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Une collection interactive de mes clichés. Cliquez pour agrandir.
            </p>
          </div>
          
          <div className={`w-full h-[600px] md:h-[800px] relative overflow-hidden rounded-3xl border shadow-2xl ${isDark ? 'border-white/10 bg-black' : 'border-black/5 bg-zinc-100'}`}>
            <DomeGallery
              images={myPhotos}
              fit={0.8}
              minRadius={600}
              maxVerticalRotationDeg={0}
              segments={34}
              dragDampening={2}
              grayscale={true}
            />
          </div>
        </section>

        {/* Flight Sim Section */}
        <section id="flightsim" className="scroll-mt-32">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">Flight Sim</h2>
          <div className={`w-full h-64 rounded-3xl border flex items-center justify-center ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
            <p className={`font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Contenu Flight Sim à venir...</p>
          </div>
        </section>

        {/* Voyages Section */}
        <section id="voyages" className="scroll-mt-32">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">Voyages</h2>
          <div className={`w-full h-64 rounded-3xl border flex items-center justify-center ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
            <p className={`font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Contenu Voyages à venir...</p>
          </div>
        </section>

        {/* Musique Section */}
        <section id="musique" className="scroll-mt-32">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">Musique</h2>
          <div className={`w-full h-64 rounded-3xl border flex items-center justify-center ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
            <p className={`font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Contenu Musique à venir...</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CreativePage;

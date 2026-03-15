import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreativePage from './pages/CreativePage';
import { Lang } from './translations';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lang, setLang] = useState<Lang>('fr');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  const toggleLang = () => {
    setLang(prev => prev === 'fr' ? 'en' : 'fr');
  };
  const isDark = theme === 'dark';

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage isDark={isDark} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} />} />
        <Route path="/creative" element={<CreativePage isDark={isDark} />} />
      </Routes>
    </HashRouter>
  );
}

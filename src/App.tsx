import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreativePage from './pages/CreativePage';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  const isDark = theme === 'dark';

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/creative" element={<CreativePage isDark={isDark} />} />
      </Routes>
    </HashRouter>
  );
}

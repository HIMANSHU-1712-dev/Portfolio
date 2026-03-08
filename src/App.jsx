import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Layout from './components/Layout';
import FlightIntro from './components/FlightIntro';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Project1 from './pages/Project1';
import Project2 from './pages/Project2';
import Project3 from './pages/Project3';
import Project4 from './pages/Project4';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Research from './pages/Research';
import Contact from './pages/Contact';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Main routing configuration
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/1" element={<Project1 />} />
          <Route path="projects/2" element={<Project2 />} />
          <Route path="projects/3" element={<Project3 />} />
          <Route path="projects/4" element={<Project4 />} />
          <Route path="experience" element={<Experience />} />
          <Route path="education" element={<Education />} />
          <Route path="research" element={<Research />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  // Show intro on every load (for testing — re-enable sessionStorage before going live)
  const [introPhase, setIntroPhase] = useState('playing'); // 'playing', 'fading', 'done'

  return (
    <Router>
      <ScrollToTop />
      {/* Mount AnimatedRoutes as soon as the intro starts fading out */}
      {introPhase !== 'playing' && <AnimatedRoutes />}

      {/* Keep FlightIntro in the DOM until it completely finishes fading */}
      {introPhase !== 'done' && (
        <FlightIntro
          onFadeStart={() => setIntroPhase('fading')}
          onComplete={() => setIntroPhase('done')}
        />
      )}
    </Router>
  );
};

export default App;

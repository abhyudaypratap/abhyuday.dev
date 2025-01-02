import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import WritingPage from '../pages/WritingPage';
import TechPage from '../pages/TechPage';
import JourneyPage from '../pages/JourneyPage';
import YearOverview from '../pages/YearOverview';
import BlogPost from '../pages/BlogPost';

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/writing" element={<WritingPage />} />
        <Route path="/writing/:slug" element={<BlogPost type="writing" />} />
        <Route path="/tech" element={<TechPage />} />
        <Route path="/tech/:slug" element={<BlogPost type="tech" />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/journey/:year" element={<YearOverview />} />
      </Routes>
    </AnimatePresence>
  );
}
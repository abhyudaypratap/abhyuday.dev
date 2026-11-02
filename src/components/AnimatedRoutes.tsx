import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import WritingPage from '../pages/WritingPage';
import PostPage from '../pages/PostPage';
import JourneyPage from '../pages/JourneyPage';
import YearOverview from '../pages/YearOverview';

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/writing" element={<WritingPage />} />
        <Route path="/writing/:slug" element={<PostPage />} />
        <Route path="/personal" element={<WritingPage collection="personal" />} />
        <Route path="/personal/:slug" element={<PostPage collection="personal" />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/journey/:year" element={<YearOverview />} />
      </Routes>
    </AnimatePresence>
  );
}
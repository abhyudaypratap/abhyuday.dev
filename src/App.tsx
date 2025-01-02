import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import AnimatedRoutes from './components/AnimatedRoutes';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-16">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}
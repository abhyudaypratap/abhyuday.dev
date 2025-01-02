import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-emerald-700 text-white py-32 px-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h2 className="text-emerald-200 text-xl mb-4">Abhyuday's blog</h2>
            <h1 className="text-7xl font-bold mb-6">
              कर्म
              <br />
              <span className="text-emerald-300">ही जीवन है।</span>
            </h1>
            <p className="text-l font-light mb-8 text-emerald-100">To live is to work; our actions define our existence.</p>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed max-w-3xl">
              I help build useful, delightful products alongside passionate teams. 
              I believe in starting with the customer experience and working backwards 
              to create something magical.
            </p>
            <Link 
              to="/journey" 
              className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
            >
              View My Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
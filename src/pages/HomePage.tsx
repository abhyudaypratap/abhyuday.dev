import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import profileimage from '../assets/images/abhyuday_profile_crop.jpeg';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function HomePage() {
  const handleImageProtection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-emerald-700 text-white py-32 px-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl"
          >
            {/* Mobile Card-based Introduction (Option 3) */}
            <div className="lg:hidden mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/20 shadow-xl">
                <div className="flex items-center gap-4">
                  <img 
                    src={profileimage} 
                    alt="Abhyuday Pratap Singh"
                    className="w-16 h-16 rounded-full object-cover object-top border-3 border-emerald-300 shadow-lg select-none"
                    onContextMenu={handleImageProtection}
                    onDragStart={handleImageProtection}
                    draggable={false}
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">अभ्युदय प्रताप सिंह</h2>
                    <p className="text-emerald-200 text-base font-medium mb-1">Abhyuday Pratap Singh</p>
                    <p className="text-emerald-100 text-xs">Software Engineer • Berlin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout (Option 1) */}
            <div className="flex items-center gap-12">
              <div className="flex-1">
                {/* Desktop Name Display - hidden on mobile */}
                <div className="mb-6 hidden lg:block">
                  <h2 className="text-3xl font-bold mb-2 text-emerald-200">
                    अभ्युदय प्रताप सिंह
                  </h2>
                  <h3 className="text-2xl font-medium text-emerald-100">
                    Abhyuday Pratap Singh
                  </h3>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                  कर्म
                  <br />
                  <span className="text-emerald-300">ही जीवन है।</span>
                </h1>
                <p className="text-base lg:text-lg font-light mb-8 text-emerald-100">
                  To live is to work; our actions define our existence.
                </p>
                <p className="text-lg lg:text-xl text-emerald-100 mb-8 leading-relaxed max-w-3xl">
                  I love building products that create meaningful impact. When I'm not crafting 
                  digital experiences, you'll find me connecting with nature.
                </p>
                {/* <Link 
                  to="/journey" 
                  className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                >
                  View My Journey
                  <ArrowRight className="w-4 h-4" />
                </Link> */}
              </div>
              
              <div className="hidden lg:block flex-shrink-0">
                <div className="relative">
                  <img 
                    src={profileimage} 
                    alt="Abhyuday Pratap Singh"
                    className="w-80 h-80 rounded-2xl object-cover object-top shadow-2xl border-4 border-emerald-500/20 select-none"
                    onContextMenu={handleImageProtection}
                    onDragStart={handleImageProtection}
                    draggable={false}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-emerald-900/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
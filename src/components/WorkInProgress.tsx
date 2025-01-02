import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

export default function WorkInProgress() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Construction className="w-24 h-24 text-gray-400 mx-auto mb-8" />
        <h1 className="text-4xl font-bold text-white mb-4">
          Coming Soon
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          We're working hard to bring you an amazing journey experience. 
          Stay tuned for updates!
        </p>
      </motion.div>
    </div>
  );
}
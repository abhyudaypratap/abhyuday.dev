import { motion } from 'framer-motion';

interface BlogHeaderProps {
  title: string;
  color: string;
}

export default function BlogHeader({ title, color }: BlogHeaderProps) {
  return (
    <div className={`min-h-screen ${color} flex items-center justify-center relative overflow-hidden`}>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-8xl font-bold text-white text-center max-w-4xl mx-auto px-8"
      >
        {title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce mx-auto" />
        </div>
      </motion.div>
    </div>
  );
}
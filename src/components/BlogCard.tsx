import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BlogCardProps {
  title: string;
  color: string;
  icon: React.ReactNode;
  href: string;
}

export default function BlogCard({ title, color, icon, href }: BlogCardProps) {
  return (
    <Link to={href}>
      <motion.div
        whileHover={{ y: -5 }}
        className={`${color} rounded-xl p-8 h-72 flex flex-col items-center justify-center text-center text-white transition-transform cursor-pointer`}
      >
        <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-6">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold leading-tight">{title}</h2>
      </motion.div>
    </Link>
  );
}
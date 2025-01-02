import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import { useNavigationStore } from '../../stores/navigationStore';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/writing', label: 'Writing' },
  { href: '/journey', label: 'Journey' },
  { href: '/tech', label: 'Tech' },
];

export default function Sidebar() {
  const { isOpen } = useNavigationStore();

  return (
    <motion.nav
      initial={false}
      animate={{ width: isOpen ? 'auto' : '0' }}
      className="fixed left-0 top-0 h-screen z-40"
    >
      <div className="relative h-full">
        <motion.div
          initial={false}
          animate={{ 
            opacity: isOpen ? 1 : 0,
            x: isOpen ? 0 : -20,
          }}
          className="w-64 h-full bg-white/10 backdrop-blur-lg p-8 flex flex-col border-r border-white/10"
        >
          {/* Navigation Links */}
          <div className="flex-1 mt-16">
            <ul className="space-y-4">
              {navItems.map(({ href, label }) => (
                <li key={label}>
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      `text-lg font-medium transition-colors duration-200 block ${
                        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <SocialLinks />
        </motion.div>
      </div>
    </motion.nav>
  );
}
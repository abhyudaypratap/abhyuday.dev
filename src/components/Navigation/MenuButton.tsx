import { Menu } from 'lucide-react';
import { useNavigationStore } from '../../stores/navigationStore';

export default function MenuButton() {
  const { toggleSidebar } = useNavigationStore();

  return (
    <button 
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-300"
      aria-label="Toggle Menu"
    >
      <Menu className="w-6 h-6 text-white" />
    </button>
  );
}
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isJourneyPage = location.pathname.includes('/journey');

  return (
    <div className={`min-h-screen ${
      isJourneyPage 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      <div className="h-screen overflow-y-auto pt-16">
        {children}
      </div>
    </div>
  );
}
import { NavLink } from 'react-router-dom';
import { navItems } from '../../constants/navigation';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex items-center h-16">
          <div className="flex items-center space-x-8">
            {navItems.map(({ href, label }) => (
              <NavLink
                key={label}
                to={href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
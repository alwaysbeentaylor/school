import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';
import { TRAITEUR_URL } from '../constants';

export const SchoolLogo = ({ className = "h-12" }: { className?: string }) => (
  <svg viewBox="0 0 300 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Yellow Frame Box */}
    <path d="M10 10 H90 V90 H10 V10" fill="none" stroke="#FBBF24" strokeWidth="8" />
    
    {/* Red Figure (Left) - Abstract jumping child */}
    <circle cx="40" cy="35" r="8" fill="#E11D48" />
    <path d="M30 50 C 20 60, 20 80, 35 85 L 45 60 L 55 85 C 70 80, 70 60, 60 50" fill="#E11D48" />
    
    {/* Green Figure (Right) - Abstract jumping child */}
    <circle cx="70" cy="30" r="8" fill="#16A34A" />
    <path d="M60 45 C 50 55, 50 75, 65 80 L 75 55 L 85 80 C 100 75, 100 55, 90 45" fill="#16A34A" />

    {/* Text Part */}
    <text x="110" y="55" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="38" fill="#1E3A8A">Sint</text>
    <text x="110" y="88" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="38" fill="#1E3A8A">Maarten</text>
  </svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Onze School', path: '/school' },
    { name: 'Inschrijven', path: '/inschrijven' },
    { name: 'Praktisch', path: '/praktisch' },
    { name: 'Nieuws', path: '/nieuws' },
    { name: 'Foto\'s', path: '/fotos' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-school-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24"> {/* Increased height for logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={() => setIsOpen(false)}>
              <SchoolLogo className="h-16 md:h-20 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-school-blue bg-blue-50 shadow-sm transform scale-105'
                    : 'text-gray-600 hover:text-school-red hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href={TRAITEUR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2.5 rounded-full shadow-md text-sm font-bold text-white bg-school-yellow hover:bg-yellow-500 text-shadow transition-transform hover:-translate-y-0.5 flex items-center gap-2"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
            >
              Menu <ExternalLink size={14} />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-school-blue hover:bg-blue-50 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-bold ${
                  isActive(item.path)
                    ? 'text-school-blue bg-blue-50 pl-6'
                    : 'text-gray-600 hover:text-school-red hover:bg-gray-50'
                } transition-all duration-200`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href={TRAITEUR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-white bg-school-yellow mt-4 shadow-md"
            >
              Menu Bekijken
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
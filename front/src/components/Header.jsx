import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `font-medium text-sm tracking-wide uppercase transition-colors duration-200 py-2 border-b-2 ${
      isActive
        ? 'text-orange-400 border-orange-400'
        : 'text-gray-300 border-transparent hover:text-orange-400 hover:border-orange-400/50'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 font-medium text-sm tracking-wide uppercase transition-colors ${
      isActive ? 'text-orange-400 bg-gray-800' : 'text-gray-300 hover:text-orange-400 hover:bg-gray-800'
    }`;

  const links = [
    { to: '/', label: 'Domů', end: true },
    { to: '/about', label: 'O nás' },
    { to: '/trainings', label: 'Moje tréninky' },
    { to: '/profile', label: 'Můj profil' },
  ];

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm text-white sticky top-0 z-40 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-extrabold tracking-tight">
            <span className="text-orange-500">Arto</span>
            <span className="text-white">Fit</span>
          </NavLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.end}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={mobileLinkClass}
              end={link.end}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

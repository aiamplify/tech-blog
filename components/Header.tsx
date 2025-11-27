import React from 'react';
import { Search, Activity } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/10 dark:border-gray-700/50 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Activity className="h-8 w-8 text-primary group-hover:animate-pulse transition-all" />
              <span className="text-2xl font-display font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors text-glow">
                TechPulse News
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium tracking-wide text-sm uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-dark/50">
              <Search className="h-5 w-5" />
            </button>
            {localStorage.getItem('isAuthenticated') === 'true' ? (
              <Link to="/admin" className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-80 transition-all text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-80 transition-all text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

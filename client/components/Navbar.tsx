import React from 'react';
import { Link } from 'react-router-dom';
import { Link2, BarChart3, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Link2 className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">LinkShort</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50"
            >
              <Link2 className="h-4 w-4" />
              <span>Shorten</span>
            </Link>
            <Link
              to="/admin"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-48 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-sm rounded-lg mt-2 border border-gray-200 shadow-lg">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 px-3 py-2 rounded-md text-base font-medium"
            >
              <Link2 className="h-5 w-5" />
              <span>Shorten URL</span>
            </Link>
            <Link
              to="/admin"
              onClick={closeMenu}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 px-3 py-2 rounded-md text-base font-medium"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};
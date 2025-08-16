import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link2, BarChart3, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const handleNavigate = (path: string) => {
    closeMenu();
    navigate(path);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Link2 className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">LinkShort</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
            >
              <Link2 className="h-4 w-4" />
              <span>Shorten</span>
            </Link>
            <Link
              to="/admin"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg z-50">
          <button
            onClick={() => handleNavigate('/')}
            className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center space-x-2 text-gray-700"
          >
            <Link2 className="h-5 w-5" />
            <span>Shorten URL</span>
          </button>
          <button
            onClick={() => handleNavigate('/admin')}
            className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center space-x-2 text-gray-700"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </button>
        </div>
      )}
    </nav>
  );
};
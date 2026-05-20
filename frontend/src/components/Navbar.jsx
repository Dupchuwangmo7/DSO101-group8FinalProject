/**
 * Navigation Bar Component
 * Responsive navbar with dark mode toggle and user menu
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🧠</span>
            </div>
            <span className="font-bold text-lg text-primary-700 dark:text-primary-500">Semzung</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary-500 transition">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-primary-500 transition">Dashboard</Link>
                <Link to="/community" className="hover:text-primary-500 transition">Community</Link>
                <Link to="/resources" className="hover:text-primary-500 transition">Resources</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-primary-500 transition">Admin</Link>
                )}
              </>
            ) : null}
          </div>

          {/* Right side - Dark mode + Auth */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {user ? (
              <div className="relative group hidden md:block">
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition">
                  {user.name}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-2 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Dashboard</Link>
                <Link to="/community" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Community</Link>
                <Link to="/resources" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Resources</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Admin</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 bg-primary-500 text-white rounded">Login</Link>
                <Link to="/register" className="block px-4 py-2 bg-secondary-500 text-white rounded">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

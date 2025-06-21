import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navLinks = isAdmin
    ? [
        { to: '/admin/dashboard', label: 'Dashboard' },
        { to: '/admin/users', label: 'Users' },
        { to: '/admin/blogs', label: 'Blogs' },
        { to: '/admin/categories', label: 'Categories' },
        { to: '/admin/logs', label: 'Logs' },
        { to: '/contact', label: 'Contact' },
        { to: '/about', label: 'About' },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/blogs', label: 'Blogs' },
        { to: '/my-blogs', label: 'My Blogs' },
        { to: '/create-blog', label: 'Create Blog' },
        { to: '/profile', label: 'Profile' },
        { to: '/contact', label: 'Contact' },
        { to: '/about', label: 'About' },
      ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold text-indigo-600">
              Blogging Platform
            </NavLink>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
            </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>Login</NavLink>
                <NavLink to="/register" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>Register</NavLink>
                <NavLink to="/contact" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>Contact</NavLink>
                <NavLink to="/about" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>About</NavLink>
              </>
            )}
          </div>
          <div className="hidden md:flex items-center ml-4">
            <span className="text-sm font-medium text-gray-700 mr-4">
              Welcome, {user?.username || user?.name || 'Guest'}
            </span>
            {user && (
              <button
                onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
            >
              Logout
              </button>
            )}
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-white rounded shadow p-4 flex flex-col space-y-2">
            {user ? (
              navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => setMenuOpen(false)}>Login</NavLink>
                <NavLink to="/register" className={({ isActive }) => `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => setMenuOpen(false)}>Register</NavLink>
                <NavLink to="/contact" className={({ isActive }) => `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => setMenuOpen(false)}>Contact</NavLink>
                <NavLink to="/about" className={({ isActive }) => `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => setMenuOpen(false)}>About</NavLink>
              </>
            )}
            {user && (
              <button
                onClick={() => { setMenuOpen(false); handleLogout(); }}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 mt-2"
              >
                Logout
              </button>
            )}
            <span className="block text-sm text-gray-500 mt-2">Welcome, {user?.username || user?.name || 'Guest'}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 
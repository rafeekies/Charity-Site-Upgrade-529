import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      path: '/about',
      submenu: [
        { name: 'Our Mission', path: '/about#mission' },
        { name: 'Our Team', path: '/about#team' },
        { name: 'Our Impact', path: '/about#impact' },
      ]
    },
    { 
      name: 'Projects', 
      path: '/projects',
      submenu: [
        { name: 'Food Programs', path: '/projects?category=food' },
        { name: 'Water Projects', path: '/projects?category=water' },
        { name: 'Housing', path: '/projects?category=housing' },
        { name: 'Orphan Care', path: '/projects?category=orphans' },
      ]
    },
    { name: 'Contact', path: '/contact' },
    { name: 'Donor Portal', path: '/donor-portal' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/vite.svg" 
              alt="Ihsan Charity Foundation" 
              className="h-10 w-10 mr-2"
            />
            <span className={`font-serif text-xl font-bold ${scrolled ? 'text-primary-600' : 'text-white'}`}>
              Ihsan Charity
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <button 
                    className={`px-3 py-2 rounded-md font-medium flex items-center ${
                      location.pathname === item.path 
                        ? 'text-primary-600' 
                        : scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gray-200'
                    }`}
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    {item.name}
                    <FaChevronDown className="ml-1 h-3 w-3" />
                  </button>
                ) : (
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => `px-3 py-2 rounded-md font-medium ${
                      isActive 
                        ? 'text-primary-600' 
                        : scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gray-200'
                    }`}
                  >
                    {item.name}
                  </NavLink>
                )}

                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                    {item.submenu.map((subitem) => (
                      <NavLink
                        key={subitem.name}
                        to={subitem.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-600 hover:text-white"
                      >
                        {subitem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Donate Button */}
            <Link 
              to="/donate"
              className="ml-4 px-4 py-2 bg-accent hover:bg-opacity-90 text-white font-medium rounded-md transition-colors"
            >
              Donate Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className={scrolled ? 'text-gray-800' : 'text-white'} size={24} />
            ) : (
              <FaBars className={scrolled ? 'text-gray-800' : 'text-white'} size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-3">
              {navItems.map((item) => (
                <div key={item.name} className="py-1">
                  {item.submenu ? (
                    <div>
                      <button 
                        className="w-full flex justify-between items-center py-2 text-gray-800 font-medium"
                        onClick={() => toggleSubmenu(item.name)}
                      >
                        {item.name}
                        <FaChevronDown className={`ml-1 h-3 w-3 transition-transform ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 border-l-2 border-primary-600 ml-2"
                          >
                            {item.submenu.map((subitem) => (
                              <NavLink
                                key={subitem.name}
                                to={subitem.path}
                                className="block py-2 text-gray-600 hover:text-primary-600"
                              >
                                {subitem.name}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => `block py-2 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-800'}`}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </div>
              ))}
              
              <Link 
                to="/donate"
                className="block w-full text-center mt-4 px-4 py-2 bg-accent hover:bg-opacity-90 text-white font-medium rounded-md transition-colors"
              >
                Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

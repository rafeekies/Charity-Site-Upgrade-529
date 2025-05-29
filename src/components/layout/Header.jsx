import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-green-700">Our Ancestors Foundation</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={({isActive}) => isActive ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"}>
            Home
          </NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"}>
            About
          </NavLink>
          <NavLink to="/projects" className={({isActive}) => isActive ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"}>
            Projects
          </NavLink>
          <NavLink to="/donate" className={({isActive}) => isActive ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"}>
            Donate
          </NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"}>
            Contact
          </NavLink>
          <NavLink to="/donor-portal" className={({isActive}) => isActive ? "text-green-600 font-medium" : "text-gray-700 hover:text-green-600"}>
            Donor Portal
          </NavLink>
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl text-gray-700 hover:text-green-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50">
            <div className="flex flex-col px-4 py-2">
              <NavLink 
                to="/" 
                className={({isActive}) => isActive ? "py-2 text-green-600 font-medium" : "py-2 text-gray-700"}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/about" 
                className={({isActive}) => isActive ? "py-2 text-green-600 font-medium" : "py-2 text-gray-700"}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink 
                to="/projects" 
                className={({isActive}) => isActive ? "py-2 text-green-600 font-medium" : "py-2 text-gray-700"}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </NavLink>
              <NavLink 
                to="/donate" 
                className={({isActive}) => isActive ? "py-2 text-green-600 font-medium" : "py-2 text-gray-700"}
                onClick={() => setIsMenuOpen(false)}
              >
                Donate
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({isActive}) => isActive ? "py-2 text-green-600 font-medium" : "py-2 text-gray-700"}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink 
                to="/donor-portal" 
                className={({isActive}) => isActive ? "py-2 text-green-600 font-medium" : "py-2 text-gray-700"}
                onClick={() => setIsMenuOpen(false)}
              >
                Donor Portal
              </NavLink>
              <Link 
                to="/cart" 
                className="py-2 text-gray-700 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaShoppingCart className="mr-2" />
                Cart {cart.length > 0 && <span className="ml-1">({cart.length})</span>}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

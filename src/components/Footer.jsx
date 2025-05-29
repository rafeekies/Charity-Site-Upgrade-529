import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn, FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-600 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Ihsan Charity Foundation</h3>
            <p className="text-gray-200 mb-4">
              Dedicated to providing humanitarian aid and sustainable development projects to those in need around the world.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors">
                <FaYoutube />
              </a>
              <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-200 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-200 hover:text-white transition-colors">Our Projects</Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-200 hover:text-white transition-colors">Ways to Donate</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/donor-portal" className="text-gray-200 hover:text-white transition-colors">Donor Portal</Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Our Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/projects?category=food" className="text-gray-200 hover:text-white transition-colors">Food Programs</Link>
              </li>
              <li>
                <Link to="/projects?category=water" className="text-gray-200 hover:text-white transition-colors">Clean Water</Link>
              </li>
              <li>
                <Link to="/projects?category=housing" className="text-gray-200 hover:text-white transition-colors">Housing Projects</Link>
              </li>
              <li>
                <Link to="/projects?category=orphans" className="text-gray-200 hover:text-white transition-colors">Orphan Care</Link>
              </li>
              <li>
                <Link to="/projects?category=education" className="text-gray-200 hover:text-white transition-colors">Education</Link>
              </li>
              <li>
                <Link to="/projects?category=emergency" className="text-gray-200 hover:text-white transition-colors">Emergency Relief</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-secondary" />
                <span>123 Charity Lane, Suite 101<br />Houston, TX 77001</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-secondary" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-secondary" />
                <span>info@ihsancharity.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Donation CTA */}
        <div className="mt-12 mb-8 py-6 px-6 bg-white bg-opacity-10 rounded-lg text-center">
          <h3 className="text-2xl font-serif font-bold mb-3">Make a Difference Today</h3>
          <p className="text-gray-200 mb-4">Your donation can change lives and bring hope to those who need it most.</p>
          <Link 
            to="/donate" 
            className="inline-block bg-secondary hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            Donate Now
          </Link>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 mt-8 border-t border-white border-opacity-20 text-center text-gray-300 text-sm">
          <p className="mb-2">
            Ihsan Charity Foundation is a registered 501(c)(3) nonprofit organization. EIN: 12-3456789
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
            <p>&copy; {currentYear} Ihsan Charity Foundation. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          <p className="mt-4 flex items-center justify-center text-xs">
            Made with <FaHeart className="mx-1 text-accent" /> for humanity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

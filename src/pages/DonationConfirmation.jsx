import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaFileAlt, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const DonationConfirmation = () => {
  return (
    <div className="container pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-lg"
      >
        <div className="text-center">
          <FaCheckCircle className="mx-auto mb-6 text-6xl text-green-500" />
          <h1 className="mb-4 text-3xl font-bold text-gray-800">Thank You for Your Donation!</h1>
          <p className="mb-6 text-lg text-gray-600">
            Your generous contribution will help make a difference in the lives of those in need.
          </p>
          
          <div className="p-6 mb-6 text-left bg-gray-50 rounded-lg">
            <h2 className="mb-4 text-xl font-bold">Donation Details</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600">Confirmation Number:</span>
                <span className="font-medium">IHC-{Math.floor(Math.random() * 1000000)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">Credit Card (ending in 1234)</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link 
              to="/donor-portal" 
              className="flex items-center justify-center px-6 py-3 font-medium text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
            >
              <FaFileAlt className="mr-2" />
              View Receipt
            </Link>
            <Link 
              to="/projects" 
              className="flex items-center justify-center px-6 py-3 font-medium transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Explore More Projects
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="p-4 mt-8 text-sm text-center text-gray-600 border-t border-gray-200">
            <p>A confirmation email has been sent to your email address.</p>
            <p className="mt-2">
              If you have any questions, please contact us at{' '}
              <a href="mailto:support@ihsancharity.org" className="text-primary-600 hover:underline">
                support@ihsancharity.org
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationConfirmation;

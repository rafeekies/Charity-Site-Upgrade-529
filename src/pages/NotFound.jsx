import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-screen py-16 bg-gray-50">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-6 text-6xl font-bold text-primary-600">404</h1>
            <h2 className="mb-4 text-3xl font-bold">Page Not Found</h2>
            <p className="mb-8 text-lg text-gray-600">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link 
              to="/" 
              className="px-6 py-3 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
            >
              Return to Homepage
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default NotFound

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative pt-24 overflow-hidden bg-gradient-to-br from-primary-700 to-primary-900 text-white min-h-[90vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 rounded-full bg-white top-20 -left-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-white bottom-20 -right-20"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-800 bg-primary-100 rounded-full">
              Compassion in Action
            </span>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Together We Can Make a <span className="text-secondary-300">Difference</span>
            </h1>
            <p className="mb-8 text-lg text-primary-100 md:text-xl">
              Join our mission to provide food, clean water, housing, and care for orphans to those in need around the world. Your generosity can change lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/donate" className="btn btn-secondary">
                Donate Now
              </Link>
              <Link to="/projects" className="btn btn-outline text-white border-white hover:bg-white/10">
                Our Projects
              </Link>
            </div>
          </motion.div>

          {/* Image/Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg" 
                alt="Children receiving aid" 
                className="object-cover w-full h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent"></div>
            </div>

            {/* Stats Cards */}
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-4 p-4 -mb-16 md:grid-cols-2 lg:-ml-16 lg:-mb-8">
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <h3 className="text-3xl font-bold text-primary-600">12K+</h3>
                <p className="text-gray-600">People Fed Monthly</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <h3 className="text-3xl font-bold text-secondary-600">250+</h3>
                <p className="text-gray-600">Water Wells Built</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero

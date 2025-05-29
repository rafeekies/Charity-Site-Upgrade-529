import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaUtensils, FaTint, FaHome, FaChild, FaMosque, FaBookOpen } from 'react-icons/fa'

const causes = [
  {
    id: 'food',
    title: 'Food Distribution',
    description: 'Providing nutritious meals to families in need across crisis regions.',
    icon: <FaUtensils className="text-4xl text-primary-500" />,
    raised: 45000,
    goal: 100000,
    image: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg'
  },
  {
    id: 'water',
    title: 'Clean Water Wells',
    description: 'Building wells to provide clean drinking water to communities without access.',
    icon: <FaTint className="text-4xl text-primary-500" />,
    raised: 78000,
    goal: 150000,
    image: 'https://images.pexels.com/photos/2537610/pexels-photo-2537610.jpeg'
  },
  {
    id: 'housing',
    title: 'Housing Projects',
    description: 'Constructing safe homes for displaced families and those living in poverty.',
    icon: <FaHome className="text-4xl text-primary-500" />,
    raised: 120000,
    goal: 250000,
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg'
  },
  {
    id: 'orphans',
    title: 'Orphan Care',
    description: 'Supporting orphaned children with education, healthcare, and loving homes.',
    icon: <FaChild className="text-4xl text-primary-500" />,
    raised: 65000,
    goal: 200000,
    image: 'https://images.pexels.com/photos/1250452/pexels-photo-1250452.jpeg'
  },
  {
    id: 'mosques',
    title: 'Mosque Construction',
    description: 'Building places of worship and community centers in underserved areas.',
    icon: <FaMosque className="text-4xl text-primary-500" />,
    raised: 95000,
    goal: 180000,
    image: 'https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg'
  },
  {
    id: 'education',
    title: 'Education Programs',
    description: 'Providing educational resources and schools for children in need.',
    icon: <FaBookOpen className="text-4xl text-primary-500" />,
    raised: 55000,
    goal: 120000,
    image: 'https://images.pexels.com/photos/8471835/pexels-photo-8471835.jpeg'
  }
]

const CauseCard = ({ cause, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const percentage = Math.round((cause.raised / cause.goal) * 100)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card card-hover"
    >
      <div className="relative overflow-hidden h-52">
        <img 
          src={cause.image} 
          alt={cause.title} 
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-primary-50 rounded-lg">{cause.icon}</div>
          <span className="px-3 py-1 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
            {percentage}% Funded
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold">{cause.title}</h3>
        <p className="mb-4 text-gray-600">{cause.description}</p>
        
        {/* Progress bar */}
        <div className="w-full h-2 mb-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 rounded-full bg-primary-500 animate-progress" 
            style={{ '--progress-width': `${percentage}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between mb-4 text-sm">
          <span className="font-medium text-gray-600">Raised: ${cause.raised.toLocaleString()}</span>
          <span className="font-medium text-gray-800">Goal: ${cause.goal.toLocaleString()}</span>
        </div>
        
        <Link 
          to={`/projects/${cause.id}`} 
          className="w-full btn btn-primary"
        >
          Donate Now
        </Link>
      </div>
    </motion.div>
  )
}

const CausesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Our <span className="text-primary-600">Causes</span></h2>
          <p className="section-subtitle">
            Support our ongoing projects and help us make a lasting impact in communities around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {causes.map((cause, index) => (
            <CauseCard key={cause.id} cause={cause} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/projects" className="btn btn-outline">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CausesSection

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaHandsHelping, FaChartLine, FaUsers, FaGlobeAfrica } from 'react-icons/fa'

const OurApproachSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const approaches = [
    {
      icon: <FaHandsHelping className="text-4xl text-white" />,
      title: "Community-Led",
      description: "We work directly with local communities to understand their needs and develop solutions that are culturally appropriate and sustainable."
    },
    {
      icon: <FaChartLine className="text-4xl text-white" />,
      title: "Sustainable Impact",
      description: "Our programs are designed to create lasting change by addressing the root causes of poverty and building self-reliance."
    },
    {
      icon: <FaUsers className="text-4xl text-white" />,
      title: "Empowerment",
      description: "We believe in empowering individuals and communities with the skills, resources, and opportunities they need to thrive."
    },
    {
      icon: <FaGlobeAfrica className="text-4xl text-white" />,
      title: "Global Reach",
      description: "With projects in over 20 countries, we maintain a global perspective while ensuring locally relevant solutions."
    }
  ]

  return (
    <section className="py-20 text-white bg-primary-700">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Approach to Humanitarian Work</h2>
          <p className="max-w-3xl mx-auto text-lg text-primary-100">
            At Ihsan Charity, we believe in a holistic approach to humanitarian aid that goes beyond immediate relief to create sustainable, long-term solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 text-center rounded-lg bg-primary-800"
            >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-primary-600">
                {approach.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold">{approach.title}</h3>
              <p className="text-primary-100">{approach.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl p-8 mx-auto mt-16 text-center bg-white rounded-lg shadow-lg text-gray-800">
          <h3 className="mb-4 text-2xl font-bold text-primary-600">Our Commitment to Excellence</h3>
          <p className="mb-6">
            We are committed to maintaining the highest standards of accountability, transparency, and effectiveness in all our work. Our programs are regularly evaluated to ensure they are making a meaningful difference in the lives of those we serve.
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="p-4">
              <h4 className="text-2xl font-bold text-primary-600">95%</h4>
              <p className="text-sm text-gray-600">of funds go directly to programs</p>
            </div>
            <div className="p-4">
              <h4 className="text-2xl font-bold text-primary-600">20+</h4>
              <p className="text-sm text-gray-600">countries served</p>
            </div>
            <div className="p-4">
              <h4 className="text-2xl font-bold text-primary-600">15+</h4>
              <p className="text-sm text-gray-600">years of experience</p>
            </div>
            <div className="p-4">
              <h4 className="text-2xl font-bold text-primary-600">4★</h4>
              <p className="text-sm text-gray-600">charity rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurApproachSection

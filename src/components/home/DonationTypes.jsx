import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { FaHandHoldingHeart, FaMoneyBillWave, FaCalendarAlt, FaPrayingHands } from 'react-icons/fa'

const DonationTypes = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const donationTypes = [
    {
      id: 'general',
      title: 'General Donation',
      description: 'Support our overall mission and help us allocate funds where they are needed most.',
      icon: <FaHandHoldingHeart className="text-4xl text-primary-500" />,
      link: '/donate?type=general'
    },
    {
      id: 'monthly',
      title: 'Monthly Giving',
      description: 'Become a sustaining donor with a recurring monthly contribution to support our ongoing work.',
      icon: <FaCalendarAlt className="text-4xl text-primary-500" />,
      link: '/donate?type=monthly'
    },
    {
      id: 'zakat',
      title: 'Zakat & Sadaqah',
      description: 'Fulfill your religious obligation and support those in need through Zakat and Sadaqah donations.',
      icon: <FaPrayingHands className="text-4xl text-primary-500" />,
      link: '/donate?type=zakat'
    },
    {
      id: 'qurbani',
      title: 'Qurbani/Udhiyah',
      description: 'Contribute to our Qurbani program to provide meat to families during Eid al-Adha.',
      icon: <FaMoneyBillWave className="text-4xl text-primary-500" />,
      link: '/donate?type=qurbani'
    }
  ]

  return (
    <section className="section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Ways to <span className="text-primary-600">Give</span></h2>
          <p className="section-subtitle">
            Choose how you'd like to contribute to our mission and help those in need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {donationTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 text-center bg-white rounded-lg shadow-custom card-hover"
            >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-primary-50 rounded-full">
                {type.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{type.title}</h3>
              <p className="mb-6 text-gray-600">{type.description}</p>
              <Link 
                to={type.link} 
                className="inline-block w-full py-2 text-center text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
              >
                Donate Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DonationTypes

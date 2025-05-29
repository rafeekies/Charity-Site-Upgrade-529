import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { FaUtensils, FaHandHoldingHeart, FaGlobe, FaUsers } from 'react-icons/fa'

const FoodAidSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const programs = [
    {
      icon: <FaUtensils className="text-4xl text-primary-500" />,
      title: "Emergency Food Relief",
      description: "Providing immediate food assistance to families affected by natural disasters, conflicts, and humanitarian crises."
    },
    {
      icon: <FaHandHoldingHeart className="text-4xl text-primary-500" />,
      title: "Ramadan Food Packages",
      description: "Distributing essential food items to families in need during the holy month of Ramadan."
    },
    {
      icon: <FaGlobe className="text-4xl text-primary-500" />,
      title: "Global Hunger Initiative",
      description: "Working to combat hunger in the most food-insecure regions through sustainable food programs."
    },
    {
      icon: <FaUsers className="text-4xl text-primary-500" />,
      title: "Community Kitchens",
      description: "Establishing community kitchens that provide nutritious meals to vulnerable populations."
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Our <span className="text-primary-600">Food Aid</span> Programs</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Hunger affects millions of people worldwide. Our food aid programs provide immediate relief and long-term solutions to combat food insecurity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white rounded-lg shadow-custom"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary-50 rounded-full">
                {program.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-center">{program.title}</h3>
              <p className="text-center text-gray-600">{program.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="mb-4 text-2xl font-bold">Making a Difference Through Food</h3>
              <p className="mb-4 text-gray-700">
                Every day, millions of people around the world go to bed hungry. At Ihsan Charity, we believe that access to nutritious food is a fundamental human right. Our food aid programs are designed to provide immediate relief while also addressing the root causes of hunger.
              </p>
              <p className="mb-6 text-gray-700">
                In 2022 alone, we distributed over 500,000 food packages to families in need across 15 countries. Each package contains essential items like rice, flour, oil, and other staples that can sustain a family for up to one month.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <h4 className="text-xl font-bold text-primary-600">500,000+</h4>
                  <p className="text-gray-700">Food packages distributed</p>
                </div>
                <div className="p-4 bg-primary-50 rounded-lg">
                  <h4 className="text-xl font-bold text-primary-600">2.5 Million</h4>
                  <p className="text-gray-700">People fed</p>
                </div>
              </div>
              <Link to="/donate?type=food" className="btn btn-primary">
                Support Our Food Programs
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <img 
                src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg" 
                alt="Volunteers distributing food packages" 
                className="object-cover w-full rounded-lg shadow-lg h-96"
              />
              <div className="absolute p-4 text-white transform -translate-x-1/2 rounded-lg shadow-lg bg-primary-600 -bottom-6 left-1/2">
                <p className="text-center">
                  "A single meal can restore hope and dignity to those in need."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FoodAidSection

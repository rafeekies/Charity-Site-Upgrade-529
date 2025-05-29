import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const ImpactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const stats = [
    { value: 250000, label: 'People Fed', suffix: '+' },
    { value: 500, label: 'Water Wells', suffix: '+' },
    { value: 1200, label: 'Homes Built', suffix: '+' },
    { value: 5000, label: 'Orphans Supported', suffix: '+' }
  ]

  return (
    <section className="relative py-20 text-white bg-primary-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 rounded-full bg-white top-20 -left-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-white bottom-20 -right-20"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-white">Our <span className="text-secondary-300">Impact</span></h2>
          <p className="section-subtitle text-primary-100">
            Through your generous support, we've been able to make a significant difference in the lives of many.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-4 text-primary-700 bg-white rounded-full">
                {inView && (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                    className="text-3xl font-bold"
                  />
                )}
              </div>
              <h3 className="text-xl font-medium">{stat.label}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactSection

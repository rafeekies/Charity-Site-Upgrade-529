import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CTASection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="relative py-20 text-white bg-gradient-to-r from-primary-700 to-primary-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 rounded-full bg-white top-20 -left-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-white bottom-20 -right-20"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Your Generosity Can Change Lives Today
            </h2>
            <p className="mb-8 text-lg text-primary-100">
              Every donation, no matter the size, makes a difference. Join us in our mission to provide food, clean water, shelter, and care to those who need it most.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/donate" className="btn btn-secondary">
                Donate Now
              </Link>
              <Link to="/contact" className="btn btn-outline text-white border-white hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTASection

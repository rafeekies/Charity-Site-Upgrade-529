import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Slider from 'react-slick'
import { FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Volunteer',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    quote: 'Working with Ihsan Charity has been one of the most rewarding experiences of my life. Seeing the direct impact of our work on communities in need is truly humbling.'
  },
  {
    id: 2,
    name: 'Mohammed Al-Farsi',
    role: 'Donor',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    quote: 'I\'ve been supporting Ihsan Charity for years, and I\'m always impressed by their transparency and the tangible results they achieve. My donations are truly making a difference.'
  },
  {
    id: 3,
    name: 'Aisha Rahman',
    role: 'Community Partner',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    quote: 'The water well project in our village has transformed our community. Children no longer have to walk miles for clean water, and waterborne diseases have decreased significantly.'
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Monthly Donor',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    quote: 'What I appreciate most about Ihsan Charity is how they empower communities rather than creating dependency. They\'re building sustainable solutions that last.'
  }
]

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const sliderRef = useRef(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

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
          <h2 className="section-title">What People <span className="text-primary-600">Say</span></h2>
          <p className="section-subtitle">
            Hear from our volunteers, donors, and the communities we've helped around the world.
          </p>
        </motion.div>

        <Slider ref={sliderRef} {...settings} className="testimonial-slider">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-white rounded-lg shadow-custom"
              >
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="object-cover w-16 h-16 rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="relative pl-8">
                  <FaQuoteLeft className="absolute top-0 left-0 text-primary-200 text-xl" />
                  <p className="text-gray-700">{testimonial.quote}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default TestimonialsSection

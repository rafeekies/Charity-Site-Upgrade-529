import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  const projects = [
    {
      id: 1,
      title: "Clean Water Initiative",
      description: "Providing clean water solutions to communities in need.",
      image: "https://images.pexels.com/photos/2962405/pexels-photo-2962405.jpeg",
      category: "Water"
    },
    {
      id: 2,
      title: "Education Support Program",
      description: "Building schools and supporting education in underserved areas.",
      image: "https://images.pexels.com/photos/8471835/pexels-photo-8471835.jpeg",
      category: "Education"
    },
    {
      id: 3,
      title: "Healthcare Access",
      description: "Improving healthcare access for vulnerable communities.",
      image: "https://images.pexels.com/photos/5214952/pexels-photo-5214952.jpeg",
      category: "Healthcare"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Donor",
      quote: "Our Ancestors Foundation has made it so easy to contribute to causes I care about. I can see the direct impact of my donations through their transparent reporting.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Community Partner",
      quote: "Working with Our Ancestors Foundation has been transformative for our community. Their sustainable approach ensures long-lasting positive change.",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Volunteer",
      quote: "Volunteering with Our Ancestors Foundation has been the most rewarding experience. Their commitment to cultural preservation while addressing immediate needs is inspiring.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Preserving Heritage, Building Futures
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Ancestors Foundation is dedicated to honoring our past while creating sustainable solutions for tomorrow.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/donate" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Donate Now
            </Link>
            <Link to="/projects" className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-bold py-3 px-8 rounded-full transition duration-300">
              Our Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Ancestors Foundation is committed to preserving cultural heritage while addressing critical needs in underserved communities through sustainable development projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Cultural Preservation</h3>
              <p className="text-gray-600">
                Honoring and preserving ancestral knowledge, traditions, and practices for future generations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Community Development</h3>
              <p className="text-gray-600">
                Building sustainable infrastructure and programs that empower communities to thrive.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Education & Advocacy</h3>
              <p className="text-gray-600">
                Promoting awareness and understanding of cultural heritage while advocating for community needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our current initiatives making a difference in communities around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Link to={`/projects/${project.id}`} className="text-green-600 font-medium hover:text-green-700 flex items-center">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/projects" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section ref={statsRef} className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg max-w-3xl mx-auto">
              Through the generosity of our donors and the dedication of our volunteers, we've made a significant impact in communities worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {statsInView && <CountUp end={50} duration={2.5} />}+
              </div>
              <p className="text-xl">Projects Completed</p>
            </div>
            
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {statsInView && <CountUp end={25000} duration={2.5} separator="," />}+
              </div>
              <p className="text-xl">People Helped</p>
            </div>
            
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {statsInView && <CountUp end={15} duration={2.5} />}+
              </div>
              <p className="text-xl">Countries Reached</p>
            </div>
            
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">$
                {statsInView && <CountUp end={2} decimals={1} duration={2.5} />}M+
              </div>
              <p className="text-xl">Funds Raised</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What People Say</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our donors, partners, and the communities we serve.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Slider {...sliderSettings}>
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="px-4">
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in Making a Difference</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Your support helps us preserve cultural heritage and create sustainable solutions for communities in need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/donate" className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300">
              Donate Now
            </Link>
            <Link to="/contact" className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-bold py-3 px-8 rounded-full transition duration-300">
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

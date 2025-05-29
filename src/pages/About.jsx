import * as React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref: missionRef, inView: missionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: teamRef, inView: teamInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Amina Hassan",
      role: "Founder & Executive Director",
      bio: "Dr. Hassan founded Our Ancestors Foundation after 15 years working in international development. She holds a PhD in Anthropology and is dedicated to preserving cultural heritage while addressing community needs.",
      image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg"
    },
    {
      id: 2,
      name: "James Wilson",
      role: "Director of Operations",
      bio: "With over 10 years of experience in nonprofit management, James oversees the day-to-day operations and ensures our projects are executed efficiently and effectively.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
    },
    {
      id: 3,
      name: "Sophia Chen",
      role: "Director of Development",
      bio: "Sophia leads our fundraising efforts and donor relations. Her background in philanthropy and corporate partnerships has been instrumental in expanding our impact.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      id: 4,
      name: "Robert Okafor",
      role: "Project Manager",
      bio: "Robert coordinates our field operations and ensures that projects are implemented with community input and cultural sensitivity. He has managed development projects in over 10 countries.",
      image: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg"
    },
    {
      id: 5,
      name: "Maria Gonzalez",
      role: "Community Engagement Specialist",
      bio: "Maria works directly with communities to ensure their voices are heard in the planning and implementation of our projects. She specializes in participatory development approaches.",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
    },
    {
      id: 6,
      name: "David Kim",
      role: "Finance Director",
      bio: "David manages our financial operations, ensuring transparency and accountability in all our financial dealings. He has over 15 years of experience in nonprofit finance.",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg)' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Our Ancestors Foundation</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Learn about our mission, our team, and the impact we're making around the world.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="w-20 h-1 bg-green-600 mb-6"></div>
              <p className="text-gray-700 mb-4">
                Our Ancestors Foundation was established in 2010 with a vision to honor ancestral wisdom while addressing contemporary challenges. What began as a small initiative to preserve cultural traditions has grown into a global organization working at the intersection of cultural heritage and sustainable development.
              </p>
              <p className="text-gray-700 mb-4">
                Our founder, Dr. Amina Hassan, recognized that many development efforts failed to consider the cultural context and ancestral knowledge of the communities they aimed to serve. She believed that sustainable solutions must be rooted in respect for cultural heritage and traditional wisdom.
              </p>
              <p className="text-gray-700">
                Today, Our Ancestors Foundation works in 15 countries across Africa, Asia, and Latin America, implementing projects that preserve cultural heritage while addressing critical needs in water access, education, healthcare, and economic development.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg" alt="Our work" className="rounded-lg shadow-md h-64 object-cover w-full" />
              <img src="https://images.pexels.com/photos/6647035/pexels-photo-6647035.jpeg" alt="Community engagement" className="rounded-lg shadow-md h-64 object-cover w-full mt-8" />
              <img src="https://images.pexels.com/photos/6647007/pexels-photo-6647007.jpeg" alt="Cultural preservation" className="rounded-lg shadow-md h-64 object-cover w-full" />
              <img src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg" alt="Education initiatives" className="rounded-lg shadow-md h-64 object-cover w-full mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Values */}
      <section ref={missionRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission & Values</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are guided by a commitment to cultural preservation and sustainable development.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div className="bg-white p-8 rounded-lg shadow-md" variants={fadeIn}>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-4">
                Our mission is to preserve cultural heritage while implementing sustainable development solutions that address critical community needs. We believe that honoring ancestral wisdom is essential to building resilient communities and creating lasting positive change.
              </p>
              <p className="text-gray-700">
                We work in partnership with local communities, respecting their knowledge, traditions, and aspirations while providing resources and expertise to address challenges in water access, education, healthcare, and economic development.
              </p>
            </motion.div>

            <motion.div className="bg-white p-8 rounded-lg shadow-md" variants={fadeIn}>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Cultural Respect</h4>
                    <p className="text-gray-700">We honor and respect the cultural heritage, traditions, and knowledge of the communities we serve.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Community Partnership</h4>
                    <p className="text-gray-700">We work in true partnership with communities, ensuring their voices guide our projects.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Sustainability</h4>
                    <p className="text-gray-700">We implement solutions that are environmentally, socially, and economically sustainable.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Transparency</h4>
                    <p className="text-gray-700">We maintain the highest standards of accountability and transparency in all our operations.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section ref={teamRef} className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals working to fulfill our mission around the world.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {teamMembers.map(member => (
              <motion.div 
                key={member.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md"
                variants={fadeIn}
              >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Annual Reports & Financials</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are committed to transparency and accountability. View our annual reports and financial statements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">2022 Annual Report</h3>
              <p className="text-gray-600 mb-4">
                Our most recent annual report detailing our projects, impact, and financial information.
              </p>
              <a href="#" className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-300">
                Download PDF
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Financial Statements</h3>
              <p className="text-gray-600 mb-4">
                Detailed financial statements audited by independent accounting firms.
              </p>
              <a href="#" className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-300">
                View Financials
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Impact Reports</h3>
              <p className="text-gray-600 mb-4">
                Detailed reports on the impact of our projects and initiatives.
              </p>
              <a href="#" className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-300">
                View Impact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Partners</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We collaborate with organizations that share our commitment to cultural preservation and sustainable development.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex items-center justify-center p-4">
              <img src="https://via.placeholder.com/150x80?text=Partner+1" alt="Partner 1" className="max-h-16" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src="https://via.placeholder.com/150x80?text=Partner+2" alt="Partner 2" className="max-h-16" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src="https://via.placeholder.com/150x80?text=Partner+3" alt="Partner 3" className="max-h-16" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src="https://via.placeholder.com/150x80?text=Partner+4" alt="Partner 4" className="max-h-16" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src="https://via.placeholder.com/150x80?text=Partner+5" alt="Partner 5" className="max-h-16" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src="https://via.placeholder.com/150x80?text=Partner+6" alt="Partner 6" className="max-h-16" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src="https://via.placeholder.com/150x80?text=Partner+7" alt="Partner 7" className="max-h-16" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src="https://via.placeholder.com/150x80?text=Partner+8" alt="Partner 8" className="max-h-16" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Together, we can preserve cultural heritage and create sustainable solutions for communities around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/donate" className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300">
              Donate Now
            </a>
            <a href="/contact" className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-bold py-3 px-8 rounded-full transition duration-300">
              Get Involved
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

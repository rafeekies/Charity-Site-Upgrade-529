import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Projects = () => {
  const [filter, setFilter] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const projects = [
    {
      id: 1,
      title: "Clean Water Initiative",
      description: "Providing clean water solutions to communities in need through well construction, water purification systems, and rainwater harvesting.",
      image: "https://images.pexels.com/photos/2962405/pexels-photo-2962405.jpeg",
      category: "Water",
      location: "East Africa",
      progress: 75
    },
    {
      id: 2,
      title: "Education Support Program",
      description: "Building schools and supporting education in underserved areas through teacher training, scholarship programs, and educational resources.",
      image: "https://images.pexels.com/photos/8471835/pexels-photo-8471835.jpeg",
      category: "Education",
      location: "South Asia",
      progress: 60
    },
    {
      id: 3,
      title: "Healthcare Access",
      description: "Improving healthcare access for vulnerable communities through mobile clinics, medical supplies, and health education programs.",
      image: "https://images.pexels.com/photos/5214952/pexels-photo-5214952.jpeg",
      category: "Healthcare",
      location: "West Africa",
      progress: 40
    },
    {
      id: 4,
      title: "Cultural Heritage Preservation",
      description: "Documenting and preserving traditional knowledge, languages, and cultural practices through community archives and educational programs.",
      image: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg",
      category: "Culture",
      location: "Latin America",
      progress: 85
    },
    {
      id: 5,
      title: "Sustainable Agriculture",
      description: "Supporting farmers with training in sustainable farming techniques, seed banks, and market access to improve food security.",
      image: "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg",
      category: "Food",
      location: "Southeast Asia",
      progress: 65
    },
    {
      id: 6,
      title: "Women's Empowerment",
      description: "Providing skills training, microfinance, and support networks for women to build economic independence and leadership.",
      image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg",
      category: "Empowerment",
      location: "South Asia",
      progress: 70
    },
    {
      id: 7,
      title: "Emergency Relief Fund",
      description: "Providing immediate assistance to communities affected by natural disasters, conflicts, and other emergencies.",
      image: "https://images.pexels.com/photos/6647035/pexels-photo-6647035.jpeg",
      category: "Emergency",
      location: "Global",
      progress: 50
    },
    {
      id: 8,
      title: "Youth Leadership Program",
      description: "Mentoring and training young people to become community leaders and advocates for cultural preservation and sustainable development.",
      image: "https://images.pexels.com/photos/8471739/pexels-photo-8471739.jpeg",
      category: "Education",
      location: "East Africa",
      progress: 80
    },
    {
      id: 9,
      title: "Clean Energy Initiative",
      description: "Implementing solar power and other renewable energy solutions in rural communities to reduce environmental impact and improve quality of life.",
      image: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg",
      category: "Environment",
      location: "West Africa",
      progress: 30
    }
  ];

  const categories = ['all', 'Water', 'Education', 'Healthcare', 'Culture', 'Food', 'Empowerment', 'Emergency', 'Environment'];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/6647007/pexels-photo-6647007.jpeg)' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Projects</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Explore the initiatives we're implementing to preserve cultural heritage and support sustainable development.
          </p>
        </div>
      </section>

      {/* Filter and Search */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 w-full md:w-auto">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filter === category 
                        ? 'bg-green-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category === 'all' ? 'All Projects' : category}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProjects.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {filteredProjects.map(project => (
                <motion.div 
                  key={project.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                  variants={fadeIn}
                >
                  <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        {project.category}
                      </span>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                        {project.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-600 h-2.5 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link 
                        to={`/projects/${project.id}`} 
                        className="text-green-600 font-medium hover:text-green-700 flex items-center"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                      <Link 
                        to="/donate" 
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                      >
                        Support
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No projects found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {setFilter('all'); setSearchTerm('');}} 
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg max-w-3xl mx-auto">
              Through our projects, we've made a significant difference in communities around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-xl">Projects Completed</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">25,000+</div>
              <p className="text-xl">People Helped</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <p className="text-xl">Countries Reached</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">$2.1M+</div>
              <p className="text-xl">Funds Raised</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Support Our Work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your contribution helps us preserve cultural heritage and implement sustainable development projects in communities around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/donate" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Donate Now
            </Link>
            <Link to="/contact" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full transition duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;

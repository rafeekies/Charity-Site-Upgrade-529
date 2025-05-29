import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaHandHoldingHeart, FaChartLine, FaShareAlt, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import AddToDonationCart from '../components/donation/AddToDonationCart';

// Mock project data - in a real app, this would come from an API
const projectsData = [
  {
    id: 'water-wells',
    title: 'Clean Water Wells',
    category: 'Water',
    location: 'Somalia',
    startDate: 'January 2023',
    beneficiaries: 5000,
    raised: 35000,
    goal: 50000,
    image: 'https://images.pexels.com/photos/2962405/pexels-photo-2962405.jpeg',
    description: `Access to clean water is a fundamental human right, yet millions around the world still lack this basic necessity. Our Clean Water Wells project in Somalia aims to address this critical issue by constructing sustainable water wells in communities facing severe water scarcity.

Each well provides clean, safe drinking water to approximately 1,000 people, dramatically reducing waterborne diseases and improving overall community health. The wells are strategically located to serve multiple villages, ensuring maximum impact.

Beyond the immediate health benefits, these wells transform communities by:
- Reducing the time women and children spend collecting water, allowing more time for education and economic activities
- Enabling local agriculture and livestock management
- Preventing conflicts over scarce water resources
- Creating community ownership through local management committees

Each well is built using durable materials and appropriate technology to ensure longevity and ease of maintenance. Local community members are trained in basic maintenance and repair, creating a sustainable solution.`,
    updates: [
      {
        date: 'March 15, 2023',
        title: 'Construction Begins',
        content: 'We have broken ground on the first 3 wells in the Baidoa region.'
      },
      {
        date: 'May 20, 2023',
        title: 'First Well Completed',
        content: 'The first well is now operational, serving over 1,000 people in the village of Dharkenley.'
      }
    ]
  },
  {
    id: 'food-distribution',
    title: 'Emergency Food Distribution',
    category: 'Food',
    location: 'Yemen',
    startDate: 'March 2023',
    beneficiaries: 10000,
    raised: 75000,
    goal: 100000,
    image: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg',
    description: `Yemen continues to face one of the world's worst humanitarian crises, with millions on the brink of famine. Our Emergency Food Distribution program provides life-saving food packages to families in the most affected regions.

Each food package contains essential items such as rice, flour, oil, sugar, and canned goods - enough to sustain a family of six for one month. We work with local partners to ensure aid reaches those most in need, including internally displaced persons, female-headed households, and families with malnourished children.

Our approach includes:
- Comprehensive needs assessments to identify the most vulnerable communities
- Coordination with other humanitarian actors to avoid duplication
- Transparent distribution processes with community involvement
- Post-distribution monitoring to ensure effectiveness

Beyond immediate relief, we're working to implement sustainable food security solutions, including agricultural support and livelihood programs to help communities rebuild.`,
    updates: [
      {
        date: 'April 5, 2023',
        title: 'First Distribution Completed',
        content: 'Successfully distributed 500 food packages in Sana\'a, reaching approximately 3,000 individuals.'
      },
      {
        date: 'June 10, 2023',
        title: 'Expanded to New Region',
        content: 'Program expanded to Hodeidah governorate, with 700 additional packages distributed.'
      }
    ]
  },
  {
    id: 'orphan-care',
    title: 'Orphan Care Program',
    category: 'Education',
    location: 'Bangladesh',
    startDate: 'February 2023',
    beneficiaries: 250,
    raised: 45000,
    goal: 75000,
    image: 'https://images.pexels.com/photos/1250452/pexels-photo-1250452.jpeg',
    description: `Our Orphan Care Program in Bangladesh provides comprehensive support to children who have lost one or both parents. We believe every child deserves the opportunity to thrive, regardless of their circumstances.

The program takes a holistic approach to orphan care, addressing not just basic needs but the full spectrum of a child's development:

- Education: School fees, uniforms, books, and supplies
- Healthcare: Regular check-ups, vaccinations, and medical treatment when needed
- Nutrition: Ensuring children receive balanced, nutritious meals
- Psychosocial support: Counseling and emotional care to address trauma
- Guardian support: Training and resources for the relatives or community members caring for orphans

Each sponsored child is matched with a dedicated case worker who monitors their progress and ensures they receive the support they need. We work closely with local communities and existing family structures, avoiding institutional care whenever possible.

Our goal is to help these children grow into self-sufficient adults who can break the cycle of poverty and contribute positively to their communities.`,
    updates: [
      {
        date: 'March 1, 2023',
        title: 'Program Launch',
        content: 'Officially launched with 100 children enrolled from the Dhaka and Chittagong regions.'
      },
      {
        date: 'May 15, 2023',
        title: 'Education Progress',
        content: '95% of enrolled children now regularly attending school with all necessary supplies.'
      }
    ]
  },
  {
    id: 'mosque-construction',
    title: 'Mosque Construction Project',
    category: 'Infrastructure',
    location: 'Mali',
    startDate: 'April 2023',
    beneficiaries: 1500,
    raised: 60000,
    goal: 120000,
    image: 'https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg',
    description: `Our Mosque Construction Project in Mali aims to build houses of worship that serve as spiritual centers and community hubs in underserved areas. These mosques provide spaces for prayer, education, and community gatherings.

Each mosque is designed to serve approximately 500 worshippers and includes:
- Main prayer hall
- Ablution facilities
- Separate prayer spaces for women
- Classrooms for Quranic and general education
- Community meeting spaces

The construction process employs local workers and uses locally-sourced materials whenever possible, providing economic benefits to the community. We work closely with local religious leaders and community representatives to ensure the mosque meets the specific needs of each area.

Beyond serving as places of worship, these mosques become centers for community development, hosting educational programs, charity distributions, and community events. They serve as gathering places during religious holidays and provide spaces for community conflict resolution.

All construction follows sustainable building practices, with considerations for water conservation and energy efficiency where feasible.`,
    updates: [
      {
        date: 'May 1, 2023',
        title: 'Land Acquisition Complete',
        content: 'Secured land for the first mosque in Bamako region with community support.'
      },
      {
        date: 'July 10, 2023',
        title: 'Foundation Completed',
        content: 'Foundation work completed and wall construction has begun.'
      }
    ]
  },
  {
    id: 'emergency-relief',
    title: 'Gaza Emergency Relief',
    category: 'Emergency',
    location: 'Palestine',
    startDate: 'October 2023',
    beneficiaries: 25000,
    raised: 150000,
    goal: 500000,
    image: 'https://images.pexels.com/photos/2058128/pexels-photo-2058128.jpeg',
    description: `Our Gaza Emergency Relief program provides urgent humanitarian assistance to civilians affected by the ongoing crisis. With critical infrastructure damaged and access to basic necessities severely limited, thousands of families are in desperate need of immediate support.

Our emergency response includes:

- Medical aid: Supporting hospitals and clinics with essential supplies, medications, and equipment
- Food security: Distributing emergency food packages to displaced families and vulnerable households
- Clean water: Providing water purification systems and bottled water to areas with compromised water infrastructure
- Shelter: Supporting displaced families with temporary shelter solutions and basic household items
- Psychosocial support: Offering trauma counseling, particularly for children

We work through established local partners with deep community connections to ensure aid reaches those most in need, even in difficult-to-access areas. Our teams on the ground continuously assess changing needs to adapt our response accordingly.

Beyond immediate relief, we're committed to supporting long-term recovery and rebuilding efforts once the situation stabilizes. This includes infrastructure rehabilitation, livelihood restoration, and community healing initiatives.`,
    updates: [
      {
        date: 'October 15, 2023',
        title: 'Initial Response Activated',
        content: 'First shipment of medical supplies delivered to Al-Shifa Hospital.'
      },
      {
        date: 'November 5, 2023',
        title: 'Food Distribution Expanded',
        content: 'Distributed 1,000 emergency food packages to displaced families in central Gaza.'
      }
    ]
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProject = projectsData.find(p => p.id === id);
      setProject(foundProject || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="container pt-32 pb-20">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full border-t-primary-600 animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container pt-32 pb-20">
        <div className="max-w-2xl p-8 mx-auto text-center bg-white rounded-lg shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Project Not Found</h1>
          <p className="mb-6 text-gray-600">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/projects" 
            className="inline-flex items-center px-6 py-3 font-medium text-white rounded-md bg-primary-600 hover:bg-primary-700"
          >
            Browse All Projects
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = Math.min(Math.round((project.raised / project.goal) * 100), 100);

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 text-white bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${project.image})` 
        }}
      >
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{project.title}</h1>
            <div className="flex flex-wrap items-center mb-6 text-primary-100">
              <div className="flex items-center mr-6 mb-2">
                <FaMapMarkerAlt className="mr-2" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <FaCalendarAlt className="mr-2" />
                <span>Started: {project.startDate}</span>
              </div>
              <div className="flex items-center mb-2">
                <FaUsers className="mr-2" />
                <span>{project.beneficiaries.toLocaleString()} Beneficiaries</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/donation-cart" 
                className="inline-flex items-center px-6 py-3 font-medium text-white rounded-md bg-primary-600 hover:bg-primary-700"
              >
                <FaHandHoldingHeart className="mr-2" />
                Donate Now
              </Link>
              <div className="flex space-x-2">
                <button className="p-3 text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700">
                  <FaFacebook />
                </button>
                <button className="p-3 text-white transition-colors rounded-full bg-sky-500 hover:bg-sky-600">
                  <FaTwitter />
                </button>
                <button className="p-3 text-white transition-colors bg-blue-700 rounded-full hover:bg-blue-800">
                  <FaLinkedin />
                </button>
                <button className="p-3 text-white transition-colors bg-green-600 rounded-full hover:bg-green-700">
                  <FaWhatsapp />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Project Details */}
            <div className="lg:col-span-2">
              <motion.div
                ref={contentRef}
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
                  <h2 className="mb-4 text-2xl font-bold">About This Project</h2>
                  <div className="prose max-w-none">
                    {project.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                {project.updates && project.updates.length > 0 && (
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="mb-4 text-2xl font-bold">Project Updates</h2>
                    <div className="space-y-6">
                      {project.updates.map((update, index) => (
                        <div key={index} className="relative pl-6 border-l-2 border-primary-200">
                          <div className="absolute w-4 h-4 bg-primary-500 rounded-full -left-[9px] top-0"></div>
                          <div className="mb-1 text-sm text-gray-500">{update.date}</div>
                          <h3 className="mb-2 text-lg font-bold">{update.title}</h3>
                          <p className="text-gray-700">{update.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <motion.div
                ref={statsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="sticky p-6 bg-white rounded-lg shadow-md top-24">
                  <h2 className="mb-4 text-xl font-bold">Fundraising Progress</h2>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">${project.raised.toLocaleString()} raised</span>
                      <span className="text-gray-600">of ${project.goal.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full">
                      <div 
                        className="h-4 rounded-full bg-primary-600" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-600">{progressPercentage}% Complete</span>
                      <span className="text-sm text-gray-600">${(project.goal - project.raised).toLocaleString()} to go</span>
                    </div>
                  </div>
                  
                  <div className="p-4 mb-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-3">
                      <FaChartLine className="mr-2 text-primary-600" />
                      <h3 className="text-lg font-medium">Impact Stats</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Beneficiaries:</span>
                        <span className="font-medium">{project.beneficiaries.toLocaleString()}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{project.location}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{project.category}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Started:</span>
                        <span className="font-medium">{project.startDate}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <AddToDonationCart project={project} />
                  
                  <div className="mt-6">
                    <h3 className="mb-3 text-lg font-medium">Share This Project</h3>
                    <div className="flex space-x-2">
                      <button className="flex-1 p-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700">
                        <FaFacebook className="mx-auto" />
                      </button>
                      <button className="flex-1 p-2 text-white transition-colors rounded-md bg-sky-500 hover:bg-sky-600">
                        <FaTwitter className="mx-auto" />
                      </button>
                      <button className="flex-1 p-2 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700">
                        <FaWhatsapp className="mx-auto" />
                      </button>
                      <button className="flex-1 p-2 text-white transition-colors bg-gray-700 rounded-md hover:bg-gray-800">
                        <FaShareAlt className="mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;

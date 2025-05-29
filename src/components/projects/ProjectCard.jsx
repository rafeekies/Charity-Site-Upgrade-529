import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegHeart } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const { id, title, category, image, description, raised, goal, donorCount } = project;
  
  // Calculate progress percentage
  const progress = Math.min(Math.round((raised / goal) * 100), 100);
  
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
          {category}
        </div>
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <FaRegHeart className="text-primary" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">${raised.toLocaleString()} raised</span>
            <span className="text-gray-500">Goal: ${goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{donorCount} donors</span>
          <Link 
            to={`/projects/${id}`}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2 px-4 rounded transition-colors"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

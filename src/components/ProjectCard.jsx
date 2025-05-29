import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { DonationCartContext } from '../App';
import { toast } from 'react-toastify';

const ProjectCard = ({ project }) => {
  const { id, title, category, description, image, goal, raised, featured } = project;
  const { addToCart } = useContext(DonationCartContext);
  
  const progress = (raised / goal) * 100;
  
  const handleAddToCart = () => {
    addToCart({
      id,
      name: title,
      category,
      amount: 50 // Default donation amount
    });
    
    toast.success(`Added ${title} to your donation cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  
  return (
    <div className={`card h-full flex flex-col ${featured ? 'border-2 border-accent' : ''}`}>
      {featured && (
        <div className="bg-accent text-white text-center py-1 text-sm font-medium">
          Featured Project
        </div>
      )}
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
          <span className="text-primary text-xs font-bold">{category}</span>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Raised: ${raised.toLocaleString()}</span>
            <span className="font-medium">Goal: ${goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleAddToCart}
            className="btn-primary flex-grow flex items-center justify-center"
          >
            <FaHeart className="mr-2" /> Donate Now
          </button>
          <Link 
            to={`/projects/${id}`} 
            className="btn-outline"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

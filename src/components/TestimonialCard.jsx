import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => {
  const { name, location, quote, image } = testimonial;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <div className="mb-4 text-primary">
        <FaQuoteLeft className="text-3xl opacity-50" />
      </div>
      
      <p className="text-gray-700 mb-6 flex-grow italic">"{quote}"</p>
      
      <div className="flex items-center">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-600 text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

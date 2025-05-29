import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-md"
    >
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 mr-4 overflow-hidden rounded-full">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold">{testimonial.name}</h3>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      
      <div className="relative">
        <FaQuoteLeft className="absolute text-2xl text-gray-200 -top-2 -left-2" />
        <p className="pl-6 italic text-gray-700">
          "{testimonial.quote}"
        </p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;

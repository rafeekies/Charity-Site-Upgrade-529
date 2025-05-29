import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const ImpactCounter = ({ icon, value, label, prefix = '', suffix = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 text-center bg-primary-800 rounded-lg"
    >
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="mb-2 text-3xl font-bold md:text-4xl">
        {prefix}
        {isVisible && (
          <CountUp 
            end={value} 
            duration={2.5} 
            separator="," 
          />
        )}
        {suffix}
      </h3>
      <p className="text-primary-100">{label}</p>
    </motion.div>
  );
};

export default ImpactCounter;

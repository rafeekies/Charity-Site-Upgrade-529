import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const ImpactCounter = ({ icon: Icon, count, label, duration = 2.5 }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);
  
  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-primary text-4xl mb-4">
        <Icon />
      </div>
      <div className="text-4xl font-bold mb-2">
        {hasAnimated ? (
          <CountUp 
            end={count} 
            duration={duration}
            separator=","
          />
        ) : (
          '0'
        )}
      </div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

export default ImpactCounter;

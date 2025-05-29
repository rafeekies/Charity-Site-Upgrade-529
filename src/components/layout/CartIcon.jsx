import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

const CartIcon = () => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link to="/donation-cart">
        <motion.div
          className="relative bg-primary text-white p-4 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <FaShoppingCart size={24} />
          {itemCount > 0 && (
            <motion.div
              className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={itemCount}
            >
              {itemCount}
            </motion.div>
          )}
        </motion.div>
      </Link>
    </div>
  );
};

export default CartIcon;

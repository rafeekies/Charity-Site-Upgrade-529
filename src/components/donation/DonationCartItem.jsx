import { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const DonationCartItem = ({ item }) => {
  const { updateItemAmount, removeFromCart } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(item.amount);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleUpdateAmount = () => {
    const newAmount = parseFloat(amount);
    if (newAmount >= 1) {
      updateItemAmount(item.id, item.type, newAmount);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdateAmount();
    } else if (e.key === 'Escape') {
      setAmount(item.amount);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col p-4 mb-4 border rounded-lg shadow-sm md:flex-row md:items-center">
      <div className="flex-grow mb-3 md:mb-0">
        <h3 className="text-lg font-medium">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.type}</p>
      </div>
      
      <div className="flex items-center">
        {isEditing ? (
          <div className="flex items-center">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={handleAmountChange}
                onKeyDown={handleKeyDown}
                onBlur={handleUpdateAmount}
                autoFocus
                className="w-24 py-2 pl-8 pr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button 
              onClick={handleUpdateAmount}
              className="p-2 ml-2 text-white rounded-md bg-primary-600 hover:bg-primary-700"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <span className="text-lg font-medium">${item.amount.toFixed(2)}</span>
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 ml-3 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-primary-600"
              aria-label="Edit amount"
            >
              <FaEdit />
            </button>
          </>
        )}
        
        <button 
          onClick={() => removeFromCart(item.id, item.type)}
          className="p-2 ml-2 text-gray-600 transition-colors rounded-full hover:bg-gray-100 hover:text-red-600"
          aria-label="Remove item"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default DonationCartItem;

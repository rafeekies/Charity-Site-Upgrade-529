import { useState } from 'react';
import { FaPlus, FaMinus, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const AddToDonationCart = ({ project, category = 'general' }) => {
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [coverFees, setCoverFees] = useState(true);
  const [tributeType, setTributeType] = useState('');
  const { addToCart } = useCart();

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleAmountClick = (value) => {
    setAmount(value);
    setIsCustom(false);
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    setAmount(0);
  };

  const handleCustomChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setCustomAmount(value);
      setAmount(Number(value));
    }
  };

  const handleIncrement = () => {
    if (isCustom) {
      const newAmount = Number(customAmount) + 5;
      setCustomAmount(newAmount.toString());
      setAmount(newAmount);
    } else {
      setAmount(amount + 5);
    }
  };

  const handleDecrement = () => {
    if (isCustom) {
      const newAmount = Math.max(5, Number(customAmount) - 5);
      setCustomAmount(newAmount.toString());
      setAmount(newAmount);
    } else {
      setAmount(Math.max(5, amount - 5));
    }
  };

  // Calculate processing fee (typically around 2.9% + $0.30 per transaction)
  const calculateProcessingFee = (amount) => {
    const fee = amount * 0.029 + 0.30;
    return parseFloat(fee.toFixed(2));
  };

  // Get final donation amount including fees if covered
  const getFinalAmount = () => {
    if (coverFees) {
      const fee = calculateProcessingFee(amount);
      return amount + fee;
    }
    return amount;
  };

  const handleAddToCart = () => {
    if (amount > 0) {
      addToCart({
        id: project.id,
        title: project.title,
        image: project.image,
        amount: getFinalAmount(),
        originalAmount: amount,
        coverFees: coverFees,
        tributeType: tributeType || null,
        category: category
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-primary">Make a Donation</h3>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        {presetAmounts.map((value) => (
          <button
            key={value}
            onClick={() => handleAmountClick(value)}
            className={`py-2 px-4 rounded-md transition-colors ${
              !isCustom && amount === value
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            ${value}
          </button>
        ))}
        <button
          onClick={handleCustomClick}
          className={`py-2 px-4 rounded-md transition-colors ${
            isCustom
              ? 'bg-primary text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          Custom
        </button>
      </div>

      {isCustom && (
        <div className="mb-4">
          <div className="flex items-center">
            <span className="text-lg mr-2">$</span>
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter amount"
              autoFocus
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleDecrement}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full"
          aria-label="Decrease amount"
        >
          <FaMinus />
        </button>
        <span className="text-2xl font-bold">${amount}</span>
        <button
          onClick={handleIncrement}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full"
          aria-label="Increase amount"
        >
          <FaPlus />
        </button>
      </div>

      {/* Cover processing fees option */}
      <div className="mb-4">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 form-checkbox h-5 w-5 text-primary"
            checked={coverFees}
            onChange={() => setCoverFees(!coverFees)}
          />
          <div className="ml-2">
            <span className="text-gray-800 font-medium flex items-center">
              Cover processing fees
              <span className="ml-1 text-sm text-gray-500">
                (+${calculateProcessingFee(amount).toFixed(2)})
              </span>
              <FaInfoCircle className="ml-1 text-gray-400 text-sm" title="This ensures 100% of your donation goes to our programs" />
            </span>
          </div>
        </label>
      </div>

      {/* Tribute options */}
      <div className="mb-4">
        <div className="text-gray-800 font-medium mb-2">Tribute donation:</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTributeType('')}
            className={`py-1 px-3 text-sm rounded-md transition-colors ${
              tributeType === ''
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            None
          </button>
          <button
            onClick={() => setTributeType('honor')}
            className={`py-1 px-3 text-sm rounded-md transition-colors ${
              tributeType === 'honor'
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            In Honor Of
          </button>
          <button
            onClick={() => setTributeType('memory')}
            className={`py-1 px-3 text-sm rounded-md transition-colors ${
              tributeType === 'memory'
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            In Memory Of
          </button>
        </div>
      </div>

      {/* Total amount display */}
      <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Donation:</span>
          <span>${amount.toFixed(2)}</span>
        </div>
        
        {coverFees && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>Processing Fee:</span>
            <span>${calculateProcessingFee(amount).toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-gray-300 mt-2">
          <span>Total:</span>
          <span>${getFinalAmount().toFixed(2)}</span>
        </div>
      </div>

      <motion.button
        onClick={handleAddToCart}
        className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md font-semibold transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={amount <= 0}
      >
        Add to Donation Cart
      </motion.button>
    </div>
  );
};

export default AddToDonationCart;

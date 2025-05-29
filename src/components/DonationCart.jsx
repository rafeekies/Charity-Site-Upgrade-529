import { useContext, useState } from 'react';
import { FaTimes, FaTrash, FaPlus, FaMinus, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { DonationCartContext } from '../App';
import { toast } from 'react-toastify';

const DonationCart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateCartItem, 
    clearCart, 
    cartTotal,
    isCartOpen,
    setIsCartOpen
  } = useContext(DonationCartContext);
  
  const [coverFees, setCoverFees] = useState(false);
  const [donationType, setDonationType] = useState('self');
  const [onBehalfName, setOnBehalfName] = useState('');
  const [inMemoryName, setInMemoryName] = useState('');
  const [employerMatch, setEmployerMatch] = useState(false);
  const [employerName, setEmployerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  
  const processingFee = cartTotal * 0.029 + 0.30; // 2.9% + $0.30 typical credit card fee
  const totalWithFees = coverFees ? cartTotal + processingFee : cartTotal;
  
  const closeCart = () => {
    setIsCartOpen(false);
  };
  
  const handleQuantityChange = (id, currentAmount, change) => {
    const newAmount = Math.max(5, currentAmount + change);
    updateCartItem(id, newAmount);
  };
  
  const handleManualAmountChange = (id, value) => {
    const amount = Math.max(5, Number(value) || 0);
    updateCartItem(id, amount);
  };
  
  const handleCheckout = () => {
    toast.success('Thank you for your donation! Redirecting to payment...', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    // In a real application, this would redirect to a payment processor
    // For demo purposes, we'll just close the cart and clear it after a delay
    setTimeout(() => {
      clearCart();
      closeCart();
    }, 2000);
  };
  
  return (
    <div className={`donation-cart-panel transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Your Donation Cart</h2>
        <button 
          onClick={closeCart}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close cart"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-500 mb-4">Your donation cart is empty.</p>
          <button 
            onClick={closeCart}
            className="btn-primary"
          >
            Continue Browsing
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-header">
                  <h3 className="cart-item-title">{item.name}</h3>
                  <span className="cart-item-amount">${item.amount.toFixed(2)}</span>
                </div>
                <p className="cart-item-category">{item.category}</p>
                <div className="cart-item-controls">
                  <div className="cart-item-quantity">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.amount, -5)}
                      className="cart-quantity-btn"
                      aria-label="Decrease amount by $5"
                      disabled={item.amount <= 5}
                    >
                      <FaMinus />
                    </button>
                    <input 
                      type="number" 
                      min="5"
                      value={item.amount}
                      onChange={(e) => handleManualAmountChange(item.id, e.target.value)}
                      className="cart-quantity-input"
                    />
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.amount, 5)}
                      className="cart-quantity-btn"
                      aria-label="Increase amount by $5"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="cart-remove-btn"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${totalWithFees.toFixed(2)}</span>
            </div>
            
            <div className="cart-options">
              <div className="mb-4">
                <label className="cart-option-label">
                  <input 
                    type="checkbox" 
                    checked={coverFees} 
                    onChange={() => setCoverFees(!coverFees)}
                    className="mr-2"
                  />
                  <span>Cover processing fees (${processingFee.toFixed(2)})</span>
                </label>
              </div>
              
              <div className="mb-4">
                <p className="font-medium mb-2">I am donating:</p>
                <div className="space-y-2">
                  <label className="cart-option-label">
                    <input 
                      type="radio" 
                      name="donationType" 
                      value="self" 
                      checked={donationType === 'self'} 
                      onChange={() => setDonationType('self')}
                      className="mr-2"
                    />
                    <span>For myself</span>
                  </label>
                  <label className="cart-option-label">
                    <input 
                      type="radio" 
                      name="donationType" 
                      value="behalf" 
                      checked={donationType === 'behalf'} 
                      onChange={() => setDonationType('behalf')}
                      className="mr-2"
                    />
                    <span>On behalf of someone</span>
                  </label>
                  {donationType === 'behalf' && (
                    <input 
                      type="text" 
                      value={onBehalfName} 
                      onChange={(e) => setOnBehalfName(e.target.value)}
                      placeholder="Enter their name"
                      className="input-field mt-2"
                    />
                  )}
                  <label className="cart-option-label">
                    <input 
                      type="radio" 
                      name="donationType" 
                      value="memory" 
                      checked={donationType === 'memory'} 
                      onChange={() => setDonationType('memory')}
                      className="mr-2"
                    />
                    <span>In memory of someone</span>
                  </label>
                  {donationType === 'memory' && (
                    <input 
                      type="text" 
                      value={inMemoryName} 
                      onChange={(e) => setInMemoryName(e.target.value)}
                      placeholder="Enter their name"
                      className="input-field mt-2"
                    />
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="cart-option-label">
                  <input 
                    type="checkbox" 
                    checked={employerMatch} 
                    onChange={() => setEmployerMatch(!employerMatch)}
                    className="mr-2"
                  />
                  <span>My employer will match this donation</span>
                </label>
                {employerMatch && (
                  <input 
                    type="text" 
                    value={employerName} 
                    onChange={(e) => setEmployerName(e.target.value)}
                    placeholder="Enter employer name"
                    className="input-field mt-2"
                  />
                )}
              </div>
              
              <div className="cart-payment-methods">
                <p className="font-medium mb-2">Payment Method:</p>
                <label className="cart-payment-method">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="credit" 
                    checked={paymentMethod === 'credit'} 
                    onChange={() => setPaymentMethod('credit')}
                    className="mr-2"
                  />
                  <FaCreditCard className="mr-2" />
                  <span>Credit Card</span>
                </label>
                <label className="cart-payment-method">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="zelle" 
                    checked={paymentMethod === 'zelle'} 
                    onChange={() => setPaymentMethod('zelle')}
                    className="mr-2"
                  />
                  <FaMoneyBillWave className="mr-2" />
                  <span>Zelle</span>
                </label>
              </div>
            </div>
            
            <div className="cart-actions">
              <button 
                onClick={handleCheckout}
                className="checkout-btn"
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={closeCart}
                className="continue-btn mt-2"
              >
                Continue Browsing
              </button>
              <button 
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm mt-4 mx-auto block"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DonationCart;

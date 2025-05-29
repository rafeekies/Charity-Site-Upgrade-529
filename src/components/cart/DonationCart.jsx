import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaTimes, FaTrash, FaCreditCard, FaMobile, FaUser, FaBuilding, FaCheck } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const DonationCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Cart, 2: Options, 3: Payment, 4: Confirmation
  const { 
    cartItems, 
    removeFromCart, 
    updateItemAmount, 
    clearCart, 
    calculateTotals,
    coverFees,
    setCoverFees,
    donationFor,
    setDonationFor,
    employerMatch,
    setEmployerMatch,
    paymentMethod,
    setPaymentMethod,
    cartCount
  } = useCart();
  
  const { subtotal, processingFee, total } = calculateTotals();
  
  const toggleCart = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setStep(1);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Reset cart and close
      clearCart();
      setIsOpen(false);
      setStep(1);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Only show cart icon if there are items in the cart
  if (cartCount === 0 && !isOpen) return null;
  
  return (
    <>
      {/* Cart Icon */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed z-50 flex items-center justify-center w-16 h-16 text-white rounded-full shadow-lg bottom-6 right-6 bg-primary-600 hover:bg-primary-700"
        onClick={toggleCart}
      >
        <FaShoppingCart className="text-2xl" />
        {cartCount > 0 && (
          <span className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
            {cartCount}
          </span>
        )}
      </motion.button>
      
      {/* Cart Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black bg-opacity-50"
              onClick={toggleCart}
            />
            
            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
              className="fixed top-0 right-0 z-50 flex flex-col w-full h-full max-w-md bg-white shadow-xl md:max-w-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">
                  {step === 1 && 'Your Donation Cart'}
                  {step === 2 && 'Donation Options'}
                  {step === 3 && 'Payment Method'}
                  {step === 4 && 'Confirmation'}
                </h2>
                <button 
                  onClick={toggleCart}
                  className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-grow p-4 overflow-y-auto">
                {/* Step 1: Cart Items */}
                {step === 1 && (
                  <>
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <FaShoppingCart className="mb-4 text-5xl text-gray-300" />
                        <p className="mb-2 text-xl font-medium text-gray-600">Your donation cart is empty</p>
                        <p className="text-gray-500">Add items from our projects to make a difference</p>
                      </div>
                    ) : (
                      <>
                        <div className="mb-6 space-y-4">
                          {cartItems.map((item, index) => (
                            <div key={`${item.id}-${item.type}-${index}`} className="flex items-center p-4 bg-gray-50 rounded-lg">
                              <div className="flex-grow">
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.type}</p>
                              </div>
                              <div className="flex items-center">
                                <div className="relative w-24 mr-3">
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                  <input
                                    type="number"
                                    min="1"
                                    value={item.amount}
                                    onChange={(e) => updateItemAmount(item.id, item.type, e.target.value)}
                                    className="w-full py-2 pl-8 pr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                  />
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id, item.type)}
                                  className="p-2 text-red-500 rounded-full hover:bg-red-50"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="p-4 mb-4 bg-gray-100 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>Processing Fee:</span>
                            <span>${processingFee.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between pt-2 mt-2 text-lg font-bold border-t border-gray-300">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-6">
                          <input
                            type="checkbox"
                            id="coverFees"
                            checked={coverFees}
                            onChange={() => setCoverFees(!coverFees)}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <label htmlFor="coverFees" className="ml-2 text-sm text-gray-700">
                            Cover processing fees so 100% of my donation goes to the cause
                          </label>
                        </div>
                      </>
                    )}
                  </>
                )}
                
                {/* Step 2: Donation Options */}
                {step === 2 && (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-medium">Who are you donating for?</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="donationType"
                            value="self"
                            checked={donationFor.type === 'self'}
                            onChange={() => setDonationFor({ type: 'self', name: '' })}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="ml-2">Myself</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="donationType"
                            value="behalf"
                            checked={donationFor.type === 'behalf'}
                            onChange={() => setDonationFor({ type: 'behalf', name: '' })}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="ml-2">On behalf of someone</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="donationType"
                            value="memory"
                            checked={donationFor.type === 'memory'}
                            onChange={() => setDonationFor({ type: 'memory', name: '' })}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="ml-2">In memory of someone</span>
                        </label>
                      </div>
                      
                      {(donationFor.type === 'behalf' || donationFor.type === 'memory') && (
                        <div className="mt-3">
                          <label htmlFor="donationName" className="block mb-1 text-sm font-medium text-gray-700">
                            {donationFor.type === 'behalf' ? "Person's Name" : "In Memory of"}
                          </label>
                          <input
                            type="text"
                            id="donationName"
                            value={donationFor.name}
                            onChange={(e) => setDonationFor({ ...donationFor, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder={donationFor.type === 'behalf' ? "Enter person's name" : "Enter name"}
                            required={donationFor.type !== 'self'}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-medium">Employer Donation Matching</h3>
                      <div className="p-4 mb-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center mb-3">
                          <input
                            type="checkbox"
                            id="employerMatch"
                            checked={employerMatch.enabled}
                            onChange={() => setEmployerMatch({ ...employerMatch, enabled: !employerMatch.enabled })}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <label htmlFor="employerMatch" className="ml-2 font-medium">
                            My employer will match this donation
                          </label>
                        </div>
                        
                        <p className="mb-3 text-sm text-gray-600">
                          Many employers match donations made by their employees, potentially doubling your impact.
                        </p>
                        
                        {employerMatch.enabled && (
                          <div className="space-y-3">
                            <div>
                              <label htmlFor="employerName" className="block mb-1 text-sm font-medium text-gray-700">
                                Company Name
                              </label>
                              <input
                                type="text"
                                id="employerName"
                                value={employerMatch.company}
                                onChange={(e) => setEmployerMatch({ ...employerMatch, company: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Enter company name"
                                required={employerMatch.enabled}
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="employerEmail" className="block mb-1 text-sm font-medium text-gray-700">
                                Company Email
                              </label>
                              <input
                                type="email"
                                id="employerEmail"
                                value={employerMatch.email}
                                onChange={(e) => setEmployerMatch({ ...employerMatch, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Enter company email"
                                required={employerMatch.enabled}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                )}
                
                {/* Step 3: Payment Method */}
                {step === 3 && (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <h3 className="mb-4 text-lg font-medium">Select Payment Method</h3>
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="sr-only"
                          />
                          <FaCreditCard className="mb-2 text-3xl text-primary-600" />
                          <span className="font-medium">Credit Card</span>
                          <span className="mt-1 text-xs text-gray-500">Visa, Mastercard, Amex</span>
                        </label>
                        
                        <label className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'zelle' ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="zelle"
                            checked={paymentMethod === 'zelle'}
                            onChange={() => setPaymentMethod('zelle')}
                            className="sr-only"
                          />
                          <FaMobile className="mb-2 text-3xl text-primary-600" />
                          <span className="font-medium">Zelle</span>
                          <span className="mt-1 text-xs text-gray-500">No processing fees</span>
                        </label>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="p-4 mt-4 space-y-4 border border-gray-300 rounded-lg">
                          <div>
                            <label htmlFor="cardName" className="block mb-1 text-sm font-medium text-gray-700">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              id="cardName"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                              placeholder="John Doe"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cardNumber" className="block mb-1 text-sm font-medium text-gray-700">
                              Card Number
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="cardExpiry" className="block mb-1 text-sm font-medium text-gray-700">
                                Expiration Date
                              </label>
                              <input
                                type="text"
                                id="cardExpiry"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="MM/YY"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cardCvc" className="block mb-1 text-sm font-medium text-gray-700">
                                CVC
                              </label>
                              <input
                                type="text"
                                id="cardCvc"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === 'zelle' && (
                        <div className="p-4 mt-4 space-y-4 border border-gray-300 rounded-lg">
                          <div className="p-3 bg-blue-50 text-blue-700 rounded-md">
                            <p className="text-sm">
                              <strong>Zelle Instructions:</strong> After clicking "Complete Donation", you'll receive instructions on how to complete your Zelle payment to Ihsan Charity.
                            </p>
                          </div>
                          
                          <div>
                            <label htmlFor="zelleEmail" className="block mb-1 text-sm font-medium text-gray-700">
                              Your Email (for confirmation)
                            </label>
                            <input
                              type="email"
                              id="zelleEmail"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 mb-4 bg-gray-100 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Processing Fee:</span>
                        <span>${processingFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-2 mt-2 text-lg font-bold border-t border-gray-300">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </form>
                )}
                
                {/* Step 4: Confirmation */}
                {step === 4 && (
                  <div className="text-center">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-white bg-green-500 rounded-full">
                      <FaCheck className="text-3xl" />
                    </div>
                    
                    <h3 className="mb-2 text-2xl font-bold text-green-600">Thank You!</h3>
                    <p className="mb-6 text-gray-600">
                      Your donation has been processed successfully. A confirmation email has been sent to your email address.
                    </p>
                    
                    <div className="p-4 mb-6 text-left bg-gray-50 rounded-lg">
                      <h4 className="mb-3 text-lg font-medium">Donation Summary</h4>
                      
                      <div className="mb-4 space-y-2">
                        {cartItems.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{item.title}</span>
                            <span>${item.amount.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-2 mt-2 border-t border-gray-300">
                        <div className="flex justify-between mb-1">
                          <span>Processing Fee:</span>
                          <span>${processingFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 mb-6 text-left bg-blue-50 text-blue-700 rounded-md">
                      <p className="text-sm">
                        <strong>Tax Receipt:</strong> A tax receipt for your donation will be emailed to you within 24 hours. You can also access all your tax receipts in your Donor Portal.
                      </p>
                    </div>
                    
                    {donationFor.type !== 'self' && (
                      <div className="p-4 mb-6 text-left bg-gray-50 rounded-lg">
                        <h4 className="mb-2 text-lg font-medium">
                          {donationFor.type === 'behalf' ? 'Donated on behalf of:' : 'Donated in memory of:'}
                        </h4>
                        <p>{donationFor.name}</p>
                      </div>
                    )}
                    
                    {employerMatch.enabled && (
                      <div className="p-4 mb-6 text-left bg-gray-50 rounded-lg">
                        <h4 className="mb-2 text-lg font-medium">Employer Match Information</h4>
                        <p className="mb-1"><strong>Company:</strong> {employerMatch.company}</p>
                        <p><strong>Email:</strong> {employerMatch.email}</p>
                        <p className="mt-2 text-sm text-gray-600">
                          We'll follow up with your employer about matching this donation.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-4 border-t">
                {step === 1 && (
                  <div className="flex justify-between">
                    <button
                      onClick={clearCart}
                      className="px-4 py-2 text-sm font-medium text-red-600 transition-colors bg-white border border-red-600 rounded-md hover:bg-red-50"
                      disabled={cartItems.length === 0}
                    >
                      Clear Cart
                    </button>
                    
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 text-sm font-medium text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                      disabled={cartItems.length === 0}
                    >
                      Continue
                    </button>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="flex justify-between">
                    <button
                      onClick={handleBack}
                      className="px-4 py-2 text-sm font-medium transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Back
                    </button>
                    
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 text-sm font-medium text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="flex justify-between">
                    <button
                      onClick={handleBack}
                      className="px-4 py-2 text-sm font-medium transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Back
                    </button>
                    
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 text-sm font-medium text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                    >
                      Complete Donation
                    </button>
                  </div>
                )}
                
                {step === 4 && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 text-sm font-medium text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DonationCart;

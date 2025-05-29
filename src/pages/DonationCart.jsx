import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaShoppingCart, FaTrash, FaArrowLeft, FaHandHoldingHeart, FaCreditCard, FaMoneyBillWave, FaBuilding, FaUser, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import DonationCartItem from '../components/donation/DonationCartItem';

const DonationCart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    clearCart, 
    calculateTotals, 
    coverFees, 
    setCoverFees,
    donationFor,
    setDonationFor,
    employerMatch,
    setEmployerMatch,
    paymentMethod,
    setPaymentMethod
  } = useCart();
  
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [honoreeNameInput, setHonoreeNameInput] = useState('');
  const [employerNameInput, setEmployerNameInput] = useState('');
  const [employerEmailInput, setEmployerEmailInput] = useState('');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { subtotal, processingFee, total } = calculateTotals();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update donation for information if applicable
    if (donationFor.type !== 'self' && honoreeNameInput) {
      setDonationFor({
        ...donationFor,
        name: honoreeNameInput
      });
    }
    
    // Update employer match information if applicable
    if (employerMatch.enabled && employerNameInput) {
      setEmployerMatch({
        ...employerMatch,
        company: employerNameInput,
        email: employerEmailInput
      });
    }
    
    // In a real application, you would process the payment here
    toast.success("Thank you for your generous donation!");
    clearCart();
    navigate('/donation-confirmation');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container pt-32 pb-20">
        <div className="max-w-2xl p-8 mx-auto text-center bg-white rounded-lg shadow-md">
          <FaShoppingCart className="mx-auto mb-4 text-5xl text-gray-400" />
          <h1 className="mb-4 text-2xl font-bold">Your Donation Cart is Empty</h1>
          <p className="mb-6 text-gray-600">
            You haven't added any donations to your cart yet. Browse our projects and causes to make a difference today.
          </p>
          <Link 
            to="/projects" 
            className="inline-flex items-center px-6 py-3 font-medium text-white rounded-md bg-primary-600 hover:bg-primary-700"
          >
            <FaArrowLeft className="mr-2" />
            Browse Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 text-white bg-primary-700">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 rounded-full bg-white top-20 -left-20"></div>
          <div className="absolute w-96 h-96 rounded-full bg-white bottom-20 -right-20"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Your Donation Cart</h1>
            <p className="text-xl text-primary-100">
              Review and complete your donation to make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Donation Items</h2>
                  <button
                    onClick={clearCart}
                    className="flex items-center px-3 py-2 text-sm text-red-600 transition-colors bg-white border border-red-200 rounded-md hover:bg-red-50"
                  >
                    <FaTrash className="mr-2" />
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <DonationCartItem key={`${item.id}-${item.type}-${index}`} item={item} />
                  ))}
                </div>

                {/* Donation Options */}
                <div className="p-6 mt-8 bg-white rounded-lg shadow-md">
                  <h2 className="mb-6 text-xl font-bold">Donation Options</h2>
                  
                  {/* Payment Method */}
                  <div className="mb-6">
                    <h3 className="mb-3 text-lg font-medium">Payment Method</h3>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center justify-center p-4 border rounded-md ${
                          paymentMethod === 'card'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <FaCreditCard className="mr-2" />
                        <span>Credit Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('zelle')}
                        className={`flex items-center justify-center p-4 border rounded-md ${
                          paymentMethod === 'zelle'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <FaMoneyBillWave className="mr-2" />
                        <span>Zelle</span>
                      </button>
                    </div>
                    
                    {paymentMethod === 'zelle' && (
                      <div className="p-4 mt-3 text-sm bg-blue-50 text-blue-700 rounded-md">
                        <p>To donate via Zelle, please use the email: <strong>donations@ihsancharity.org</strong></p>
                        <p className="mt-1">Include your name and donation purpose in the memo.</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Cover Processing Fees */}
                  {paymentMethod === 'card' && (
                    <div className="mb-6">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          checked={coverFees}
                          onChange={() => setCoverFees(!coverFees)}
                          className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2">
                          <span className="font-medium">Cover processing fees</span>
                          <p className="text-sm text-gray-600">
                            Add {(subtotal * 0.029 + 0.30).toFixed(2)} to cover credit card processing fees so 100% of your donation goes to the cause.
                          </p>
                        </span>
                      </label>
                    </div>
                  )}
                  
                  {/* Donate on behalf/in memory */}
                  <div className="mb-6">
                    <h3 className="mb-3 text-lg font-medium">Donation Attribution</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="donationType"
                          checked={donationFor.type === 'self'}
                          onChange={() => setDonationFor({ type: 'self', name: '' })}
                          className="w-5 h-5 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <span className="ml-2">Donate as yourself</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="donationType"
                          checked={donationFor.type === 'behalf'}
                          onChange={() => setDonationFor({ type: 'behalf', name: honoreeNameInput })}
                          className="w-5 h-5 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <span className="ml-2">Donate in honor of someone</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="donationType"
                          checked={donationFor.type === 'memory'}
                          onChange={() => setDonationFor({ type: 'memory', name: honoreeNameInput })}
                          className="w-5 h-5 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <span className="ml-2">Donate in memory of someone</span>
                      </label>
                      
                      {(donationFor.type === 'behalf' || donationFor.type === 'memory') && (
                        <div className="pl-7">
                          <label className="block mb-1 text-sm font-medium text-gray-700">
                            {donationFor.type === 'behalf' ? "Honoree's Name" : "In Memory of"}
                          </label>
                          <input
                            type="text"
                            value={honoreeNameInput}
                            onChange={(e) => setHonoreeNameInput(e.target.value)}
                            placeholder={donationFor.type === 'behalf' ? "Enter honoree's name" : "Enter name"}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Employer Match */}
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={employerMatch.enabled}
                        onChange={() => setEmployerMatch({
                          ...employerMatch,
                          enabled: !employerMatch.enabled
                        })}
                        className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2">
                        <span className="font-medium">My employer will match my donation</span>
                        <p className="text-sm text-gray-600">
                          Many employers match charitable donations, potentially doubling your impact.
                        </p>
                      </span>
                    </label>
                    
                    {employerMatch.enabled && (
                      <div className="p-4 mt-3 space-y-3 border border-gray-200 rounded-md">
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">
                            Employer/Company Name
                          </label>
                          <input
                            type="text"
                            value={employerNameInput}
                            onChange={(e) => setEmployerNameInput(e.target.value)}
                            placeholder="Enter your employer's name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">
                            Employer Contact Email (Optional)
                          </label>
                          <input
                            type="email"
                            value={employerEmailInput}
                            onChange={(e) => setEmployerEmailInput(e.target.value)}
                            placeholder="Enter employer contact email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky p-6 bg-white rounded-lg shadow-md top-24">
                  <h2 className="mb-6 text-2xl font-bold">Donation Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {processingFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing Fee</span>
                        <span className="font-medium">${processingFee.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-lg font-bold">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Enter your name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="flex items-center justify-center w-full py-3 text-lg font-medium text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                    >
                      <FaHandHoldingHeart className="mr-2" />
                      Complete Donation
                    </button>
                  </form>
                  
                  <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
                    <FaHeart className="mr-2 text-primary-500" />
                    100% tax-deductible donation
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DonationCart;

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Donate = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [donationAmount, setDonationAmount] = React.useState('');
  const [customAmount, setCustomAmount] = React.useState('');
  const [donationType, setDonationType] = React.useState('general');
  const [isRecurring, setIsRecurring] = React.useState(false);
  const [recurringFrequency, setRecurringFrequency] = React.useState('monthly');
  const [isHonorGift, setIsHonorGift] = React.useState(false);
  const [honoreeInfo, setHonoreeInfo] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const predefinedAmounts = [25, 50, 100, 250, 500];
  
  const donationTypes = [
    { id: 'general', name: 'General Fund', description: 'Support all of our initiatives' },
    { id: 'water', name: 'Clean Water Initiative', description: 'Provide clean water to communities in need' },
    { id: 'education', name: 'Education Support', description: 'Help build schools and support education' },
    { id: 'healthcare', name: 'Healthcare Access', description: 'Improve healthcare access for vulnerable communities' },
    { id: 'culture', name: 'Cultural Preservation', description: 'Preserve traditional knowledge and practices' },
    { id: 'emergency', name: 'Emergency Relief', description: 'Provide immediate assistance in crisis situations' }
  ];

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value);
      setDonationAmount('custom');
    }
  };

  const handleHonoreeInfoChange = (e) => {
    const { name, value } = e.target;
    setHonoreeInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddToCart = () => {
    const finalAmount = donationAmount === 'custom' ? parseFloat(customAmount) : parseFloat(donationAmount);
    
    if (isNaN(finalAmount) || finalAmount <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }

    const selectedDonationType = donationTypes.find(type => type.id === donationType);
    
    const donation = {
      id: Date.now(),
      type: selectedDonationType.name,
      amount: finalAmount,
      recurring: isRecurring,
      frequency: isRecurring ? recurringFrequency : null,
      isHonorGift: isHonorGift,
      honoreeInfo: isHonorGift ? honoreeInfo : null
    };

    addToCart(donation);
    toast.success('Donation added to cart!');
    navigate('/cart');
  };

  const handleDonateNow = () => {
    handleAddToCart();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/6647035/pexels-photo-6647035.jpeg)' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Make a Donation</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Your support helps us preserve cultural heritage and implement sustainable development projects.
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Donation</h2>
                
                {/* Donation Type */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Select a Fund</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {donationTypes.map(type => (
                      <div 
                        key={type.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          donationType === type.id 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                        onClick={() => setDonationType(type.id)}
                      >
                        <div className="flex items-start">
                          <div className={`w-5 h-5 rounded-full border flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center ${
                            donationType === type.id ? 'border-green-500 bg-green-500' : 'border-gray-300'
                          }`}>
                            {donationType === type.id && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </svg>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{type.name}</h4>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Donation Amount */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Amount</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map(amount => (
                      <button
                        key={amount}
                        type="button"
                        className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                          donationAmount === amount.toString() 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => handleAmountSelect(amount.toString())}
                      >
                        ${amount}
                      </button>
                    ))}
                    <div className={`py-2 px-4 rounded-lg border flex items-center ${
                      donationAmount === 'custom' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300'
                    }`}>
                      <span className="text-gray-700 mr-2">$</span>
                      <input
                        type="text"
                        placeholder="Custom"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        onClick={() => setDonationAmount('custom')}
                        className="bg-transparent border-none focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Recurring Options */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <input
                      id="recurring"
                      type="checkbox"
                      checked={isRecurring}
                      onChange={() => setIsRecurring(!isRecurring)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="recurring" className="ml-2 text-gray-700 font-medium">
                      Make this a recurring donation
                    </label>
                  </div>
                  
                  {isRecurring && (
                    <div className="ml-6 mt-3">
                      <p className="text-sm text-gray-600 mb-2">Frequency:</p>
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <input
                            id="monthly"
                            type="radio"
                            value="monthly"
                            checked={recurringFrequency === 'monthly'}
                            onChange={() => setRecurringFrequency('monthly')}
                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                          />
                          <label htmlFor="monthly" className="ml-2 text-gray-700">
                            Monthly
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="quarterly"
                            type="radio"
                            value="quarterly"
                            checked={recurringFrequency === 'quarterly'}
                            onChange={() => setRecurringFrequency('quarterly')}
                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                          />
                          <label htmlFor="quarterly" className="ml-2 text-gray-700">
                            Quarterly
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="annually"
                            type="radio"
                            value="annually"
                            checked={recurringFrequency === 'annually'}
                            onChange={() => setRecurringFrequency('annually')}
                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                          />
                          <label htmlFor="annually" className="ml-2 text-gray-700">
                            Annually
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Honor/Memorial Gift */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <input
                      id="honorGift"
                      type="checkbox"
                      checked={isHonorGift}
                      onChange={() => setIsHonorGift(!isHonorGift)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="honorGift" className="ml-2 text-gray-700 font-medium">
                      Make this a gift in honor or memory of someone
                    </label>
                  </div>
                  
                  {isHonorGift && (
                    <div className="ml-6 mt-3 space-y-4">
                      <div>
                        <label htmlFor="honoreeName" className="block text-sm font-medium text-gray-700 mb-1">
                          Honoree's Name
                        </label>
                        <input
                          type="text"
                          id="honoreeName"
                          name="name"
                          value={honoreeInfo.name}
                          onChange={handleHonoreeInfoChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="honoreeEmail" className="block text-sm font-medium text-gray-700 mb-1">
                          Honoree's Email (optional)
                        </label>
                        <input
                          type="email"
                          id="honoreeEmail"
                          name="email"
                          value={honoreeInfo.email}
                          onChange={handleHonoreeInfoChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="honoreeMessage" className="block text-sm font-medium text-gray-700 mb-1">
                          Personal Message (optional)
                        </label>
                        <textarea
                          id="honoreeMessage"
                          name="message"
                          value={honoreeInfo.message}
                          onChange={handleHonoreeInfoChange}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        ></textarea>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Donation Summary */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Donation Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fund:</span>
                      <span className="font-medium text-gray-800">
                        {donationTypes.find(type => type.id === donationType)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium text-gray-800">
                        ${donationAmount === 'custom' ? customAmount || '0' : donationAmount || '0'}
                      </span>
                    </div>
                    {isRecurring && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frequency:</span>
                        <span className="font-medium text-gray-800">
                          {recurringFrequency.charAt(0).toUpperCase() + recurringFrequency.slice(1)}
                        </span>
                      </div>
                    )}
                    {isHonorGift && honoreeInfo.name && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">In honor of:</span>
                        <span className="font-medium text-gray-800">{honoreeInfo.name}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDonateNow}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex-1"
                  >
                    Donate Now
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 flex-1"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Other Ways to Give</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              There are many ways you can support our mission beyond online donations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Mail a Check</h3>
              <p className="text-gray-600 mb-4">
                You can mail a check to our office address:
              </p>
              <address className="not-italic text-gray-700">
                Our Ancestors Foundation<br />
                123 Charity Lane<br />
                Giving City, GC 12345<br />
                United States
              </address>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Corporate Giving</h3>
              <p className="text-gray-600 mb-4">
                Partner with us through corporate donations, matching gifts, or sponsorships.
              </p>
              <p className="text-gray-700">
                Contact our development team to discuss partnership opportunities:
              </p>
              <p className="text-gray-700 mt-2">
                <a href="mailto:partnerships@ourancestorsfoundation.org" className="text-green-600 hover:text-green-700">
                  partnerships@ourancestorsfoundation.org
                </a>
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Legacy Giving</h3>
              <p className="text-gray-600 mb-4">
                Include Our Ancestors Foundation in your will or estate planning to create a lasting impact.
              </p>
              <p className="text-gray-700">
                For more information on planned giving options, please contact:
              </p>
              <p className="text-gray-700 mt-2">
                <a href="mailto:legacy@ourancestorsfoundation.org" className="text-green-600 hover:text-green-700">
                  legacy@ourancestorsfoundation.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about donating to Our Ancestors Foundation.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Is my donation tax-deductible?</h3>
                <p className="text-gray-700">
                  Yes, Our Ancestors Foundation is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law. You will receive a tax receipt for your records.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-2">How is my donation used?</h3>
                <p className="text-gray-700">
                  Your donation directly supports our programs and initiatives. Approximately 85% of all donations go directly to our programs, with the remaining 15% used for administrative costs and fundraising efforts.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Can I specify how my donation is used?</h3>
                <p className="text-gray-700">
                  Yes, you can designate your donation to a specific fund or project. If you don't specify, your donation will go to our General Fund, which allows us to allocate resources where they are most needed.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-2">How do I cancel or modify a recurring donation?</h3>
                <p className="text-gray-700">
                  You can cancel or modify your recurring donation at any time by logging into your donor account or by contacting our donor services team at donations@ourancestorsfoundation.org or by calling (555) 123-4567.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Is my payment information secure?</h3>
                <p className="text-gray-700">
                  Yes, we use industry-standard encryption and security protocols to protect your personal and financial information. We never store your full credit card information on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Have Questions About Donating?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Our donor services team is here to help. Contact us with any questions about making a donation or supporting our work.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:donations@ourancestorsfoundation.org" className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300">
              Email Us
            </a>
            <a href="tel:+15551234567" className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-bold py-3 px-8 rounded-full transition duration-300">
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;

import * as React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const DonorPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loginForm, setLoginForm] = React.useState({
    email: '',
    password: '',
    remember: false
  });
  const [isLoading, setIsLoading] = React.useState(false);

  // Mock donor data
  const donorData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    donationHistory: [
      { id: 1, date: "2023-09-15", amount: 100, project: "Clean Water Initiative", status: "Completed" },
      { id: 2, date: "2023-08-10", amount: 50, project: "Education Support", status: "Completed" },
      { id: 3, date: "2023-07-05", amount: 75, project: "Healthcare Access", status: "Completed" },
      { id: 4, date: "2023-06-20", amount: 25, project: "General Fund", status: "Completed" },
      { id: 5, date: "2023-05-12", amount: 150, project: "Emergency Relief", status: "Completed" }
    ],
    recurringDonations: [
      { id: 101, amount: 25, frequency: "Monthly", project: "General Fund", nextDate: "2023-10-15", status: "Active" }
    ],
    taxReceipts: [
      { id: 1001, year: 2022, amount: 450, downloadUrl: "#" },
      { id: 1002, year: 2021, amount: 350, downloadUrl: "#" }
    ],
    impactStats: {
      totalDonated: 400,
      projectsSupported: 4,
      peopleHelped: 120
    }
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
      toast.success('Successfully logged in!');
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({
      email: '',
      password: '',
      remember: false
    });
    toast.info('You have been logged out');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg)' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Donor Portal</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            {isLoggedIn 
              ? "Welcome back! Manage your donations and see your impact."
              : "Access your donation history, tax receipts, and see the impact of your generosity."}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Login to Your Account</h2>
                
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        checked={loginForm.remember}
                        onChange={handleLoginChange}
                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-green-600 hover:text-green-700">
                      Forgot password?
                    </a>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                      Contact us
                    </a>{' '}
                    to set one up.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Dashboard Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Welcome, {donorData.name}</h2>
                  <p className="text-gray-600">{donorData.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-4 md:mt-0 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-300"
                >
                  Logout
                </button>
              </div>
              
              {/* Impact Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Donated</h3>
                  <p className="text-3xl font-bold text-green-600">{formatCurrency(donorData.impactStats.totalDonated)}</p>
                  <p className="text-gray-600 mt-2">Thank you for your generosity!</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Projects Supported</h3>
                  <p className="text-3xl font-bold text-green-600">{donorData.impactStats.projectsSupported}</p>
                  <p className="text-gray-600 mt-2">Making a difference in multiple areas</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">People Helped</h3>
                  <p className="text-3xl font-bold text-green-600">{donorData.impactStats.peopleHelped}+</p>
                  <p className="text-gray-600 mt-2">Lives impacted by your support</p>
                </motion.div>
              </div>
              
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Donation History</h3>
                  
                  {donorData.donationHistory.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-gray-700 font-semibold">Date</th>
                            <th className="px-4 py-3 text-gray-700 font-semibold">Amount</th>
                            <th className="px-4 py-3 text-gray-700 font-semibold">Project</th>
                            <th className="px-4 py-3 text-gray-700 font-semibold">Status</th>
                            <th className="px-4 py-3 text-gray-700 font-semibold">Receipt</th>
                          </tr>
                        </thead>
                        <tbody>
                          {donorData.donationHistory.map(donation => (
                            <tr key={donation.id} className="border-t border-gray-200">
                              <td className="px-4 py-3 text-gray-700">{formatDate(donation.date)}</td>
                              <td className="px-4 py-3 text-gray-700 font-medium">{formatCurrency(donation.amount)}</td>
                              <td className="px-4 py-3 text-gray-700">{donation.project}</td>
                              <td className="px-4 py-3">
                                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                  {donation.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                                  Download
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-600">No donation history found.</p>
                  )}
                </div>
              </div>
              
              {/* Recurring Donations */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Recurring Donations</h3>
                  
                  {donorData.recurringDonations.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-gray-700 font-semibold">Amount</th>
                            <th className="px-4 py-3 text-gray-700 font-semibold">Frequency</th>
                            <th className="px-4 py-3 text-gray-700 font-semibold">Project</th>
                            <th className="px-4 py-3 text-gray-700 font-semibold">Next Date</th>
                            <th className="px-4 py-3 text-gray-700 font-semibold">Status</th>
                            <th className="px-4 py-3 text-gray-700 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {donorData.recurringDonations.map(donation => (
                            <tr key={donation.id} className="border-t border-gray-200">
                              <td className="px-4 py-3 text-gray-700 font-medium">{formatCurrency(donation.amount)}</td>
                              <td className="px-4 py-3 text-gray-700">{donation.frequency}</td>
                              <td className="px-4 py-3 text-gray-700">{donation.project}</td>
                              <td className="px-4 py-3 text-gray-700">{formatDate(donation.nextDate)}</td>
                              <td className="px-4 py-3">
                                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                  {donation.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <button className="text-green-600 hover:text-green-700 font-medium mr-3">
                                  Edit
                                </button>
                                <button className="text-red-600 hover:text-red-700 font-medium">
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-600">No recurring donations found.</p>
                  )}
                </div>
              </div>
              
              {/* Tax Receipts */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Tax Receipts</h3>
                  
                  {donorData.taxReceipts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {donorData.taxReceipts.map(receipt => (
                        <div key={receipt.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-gray-800">{receipt.year} Tax Receipt</h4>
                            <p className="text-gray-600">Total: {formatCurrency(receipt.amount)}</p>
                          </div>
                          <a 
                            href={receipt.downloadUrl} 
                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                          >
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No tax receipts available.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Help?</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our donor services team is here to assist you with any questions or issues.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Email Us</h3>
              <p className="text-gray-600 mb-4">
                Send us an email and we'll respond within 24 hours.
              </p>
              <a href="mailto:donors@ourancestorsfoundation.org" className="text-green-600 hover:text-green-700 font-medium">
                donors@ourancestorsfoundation.org
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our donor services team.
              </p>
              <a href="tel:+15551234567" className="text-green-600 hover:text-green-700 font-medium">
                +1 (555) 123-4567
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">FAQ</h3>
              <p className="text-gray-600 mb-4">
                Find answers to common donor questions.
              </p>
              <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonorPortal;

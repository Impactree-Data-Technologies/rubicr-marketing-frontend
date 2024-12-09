'use client';

import React from 'react';
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

const ESGComingSoonPage: React.FC = () => {
  const [email, setEmail] = React.useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Submitted email for early access: ${email}`);
    // Here you would typically handle email submission, e.g., send to backend
    alert('Thank you! We will notify you when the service launches.');
    setEmail('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-10 text-center mt-14">
          <div className="mb-8 ">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              ESG Solutions
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Our comprehensive ESG analytics platform is coming soon!
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-700">
                Be the first to know when we launch our ESG analytics tools.
              </p>
            </div>
          </div>
          
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
              <input 
                type="email" 
                placeholder="Enter your email for early access" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-6 py-3 hover:bg-blue-600 transition duration-300"
              >
                Notify Me
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>
              We respect your privacy. No spam, ever. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ESGComingSoonPage;
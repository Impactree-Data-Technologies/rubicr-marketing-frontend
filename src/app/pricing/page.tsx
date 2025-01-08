// 'use client';

// import React from 'react';
// import Navbar from "../Components/navbar";
// import Footer from "../Components/footer";

// const ESGComingSoonPage: React.FC = () => {
//   const [email, setEmail] = React.useState('');

//   const handleEmailSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(`Submitted email for early access: ${email}`);
//     // Here you would typically handle email submission, e.g., send to backend
//     alert('Thank you! We will notify you when the service launches.');
//     setEmail('');
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//         <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-10 text-center mt-14">
//           <div className="mb-8 ">
//             <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
//               ESG Solutions
//             </h2>
//             <p className="text-xl text-gray-600 mb-6">
//               Our comprehensive ESG analytics platform is coming soon!
//             </p>
            
//             <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
//               <p className="text-blue-700">
//                 Be the first to know when we launch our ESG analytics tools.
//               </p>
//             </div>
//           </div>
          
//           <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
//             <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
//               <input 
//                 type="email" 
//                 placeholder="Enter your email for early access" 
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button 
//                 type="submit" 
//                 className="bg-blue-500 text-white px-6 py-3 hover:bg-blue-600 transition duration-300"
//               >
//                 Notify Me
//               </button>
//             </div>
//           </form>
          
//           <div className="mt-8 text-sm text-gray-500">
//             <p>
//               We respect your privacy. No spam, ever. Unsubscribe at any time.
//             </p>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ESGComingSoonPage;
'use client';

import React from 'react';
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import Image from 'next/image';
import { motion } from 'framer-motion';

const ESGContactPage: React.FC = () => {
  const [email, setEmail] = React.useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Submitted email for contact: ${email}`);
    alert('Thank you! Our team will get in touch with you soon.');
    setEmail('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-5xl w-full bg-white shadow-xl rounded-lg p-10 mt-14 flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              ESG Solutions
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Empower your business with our cutting-edge ESG analytics platform.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-700">
                Contact our growth team at{' '}
                <a href="mailto:growth@impactree.ai" className="text-blue-600 underline">
                  <b>growth@impactree.ai</b>
                </a>{' '}
                to learn more, or leave your information, and we'll reach out to you!
              </p>
            </div>
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto md:mx-0">
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email and we’ll reach out"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 hover:bg-blue-600 transition duration-300"
                >
                  Contact Me
                </button>
              </div>
            </form>
            <div className="mt-8 text-sm text-gray-500">
              <p>We respect your privacy. No spam, ever. Unsubscribe at any time.</p>
            </div>
          </div>

          {/* Right Image */}
          {/* Right Image */}
<div className="md:w-1/2 flex justify-end mt-8 md:mt-0 ml-40">
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto"
  >
    <Image
      src="/six_steps.png" // Replace with your actual path
      alt="ESG Process Steps"
      width={250} // Adjust the width as needed
      height={350} 
      layout="intrinsic" // Ensures the image keeps its aspect ratio
      className="rounded-lg shadow-lg"
    />
  </motion.div>
</div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ESGContactPage;

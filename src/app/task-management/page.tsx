"use client"

import React from 'react';
import Link from 'next/link';
import { FaTasks, FaCheckCircle, FaUsersCog, FaChartLine } from 'react-icons/fa';
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import Button from "../Components/button";

const TaskManagement = () => {
  const features = [
    { icon: FaCheckCircle, title: "Task Creation", description: "Easily create and assign tasks to team members" },
    { icon: FaUsersCog, title: "Collaborative Workflow", description: "Enable seamless collaboration between team members" },
    { icon: FaChartLine, title: "Progress Tracking", description: "Monitor task progress and completion rates in real-time" },
  ];

  return (
    <div className="font-sans bg-gray-50 flex flex-col min-h-screen">
      {/* Hero Section with integrated Navbar */}
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 relative overflow-hidden">
        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 pt-24 pb-16 flex items-center min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                Streamline Your <span className="text-yellow-600">Task Management</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
                Enhance your sustainability reporting workflow with our powerful and intuitive task management system.
              </p>
              <Link href="/demo" className="inline-block bg-yellow-500 text-black font-bold py-4 px-8 rounded-full hover:bg-yellow-600 transition duration-300 transform hover:scale-105 shadow-lg">
                Schedule a Demo
              </Link>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/api/placeholder/1280/720"
                >
                  <source src="/videos/task-management-hero.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our Task Management module empowers you to collect data from authorized sources with precision. Utilizing our maker-checker validation principle, we ensure the highest level of data accuracy and reliability for your sustainability reporting process.
                </p>
                <ul className="list-disc list-inside text-lg text-gray-600 space-y-4 mb-8">
                  <li>Create and assign tasks effortlessly</li>
                  <li>Collaborate seamlessly with team members</li>
                  <li>Track progress in real-time</li>
                  <li>Validate data using our robust system</li>
                </ul>
              </div>
              <div className="w-full lg:w-1/2 lg:pl-12">
                <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl">
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    poster="/api/placeholder/1280/720"
                  >
                    <source src="/videos/task-management-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
                  <feature.icon className="text-5xl text-yellow-500 mb-6" />
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-yellow-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Improved data accuracy",
                "Enhanced team collaboration",
                "Streamlined reporting workflow",
                "Real-time progress insights",
                "Reduced data collection time",
                "Increased reporting efficiency"
              ].map((benefit, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                  <FaCheckCircle className="text-green-500 text-2xl mr-4" />
                  <p className="text-lg text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

       {/* CTA Section */}
       <section className="bg-gradient-to-r from-yellow-400 to-yellow-600 py-20 mx-8 md:mx-20 rounded-3xl mb-20 shadow-2xl">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get Started Today</h2>
                    <hr className="border-t-2 border-white w-24 mx-auto mb-6" />
                    <p className="text-xl md:text-2xl mb-8 text-white">Ready to transform your ESG Performance?</p>
                    <Button label="Begin Your Journey" background="white" color="black"  href="/contact-us"/>
                </div>
            </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TaskManagement;
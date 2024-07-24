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
      <div className="h-screen bg-gradient-to-r from-yellow-100 to-yellow-200 relative">
        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">Task Management</h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8">
                Streamline your sustainability reporting workflow with our powerful task management system.
              </p>
              <Link href="/demo" className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-600 transition duration-300">
                Schedule a Demo
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <div className="aspect-w-16 aspect-h-9 md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
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
        <div className="container mx-auto px-4 py-16">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our Task Management module allows you to collect data from authorized sources with validation using our maker-checker validation principle. This ensures data accuracy and reliability in your sustainability reporting process.
            </p>
            <div className="aspect-w-16 aspect-h-9">
              <video 
                className="w-full h-full object-cover rounded-lg shadow-lg"
                controls
                poster="/api/placeholder/1280/720"
              >
                <source src="/videos/task-management-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <feature.icon className="text-4xl text-yellow-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Benefits</h2>
            <ul className="list-disc list-inside text-lg text-gray-600 space-y-4">
              <li>Improved data accuracy through our maker-checker validation principle</li>
              <li>Enhanced collaboration among team members</li>
              <li>Streamlined workflow for sustainability reporting</li>
              <li>Real-time progress tracking and performance insights</li>
              <li>Reduced time and effort in data collection and validation</li>
            </ul>
          </div>

          {/* CTA Section */}
          {/* <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Optimize Your Reporting Workflow?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Experience the power of our Task Management module and revolutionize your sustainability reporting process.
            </p>
            <Link href="/contact" className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-600 transition duration-300">
              Get Started
            </Link>
          </div> */}

<section className="bg-[#f6e2cb] py-20 mx-8 md:mx-20 rounded-3xl mb-20">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started Today</h2>
                    <hr className="border-t-2 border-[#64271F] w-1/4 mb-6" />
                    <p className="text-lg md:text-2xl mb-8">Ready to transform your ESG Performance?</p>
                    <Button label="Contact Us" background="#FFCD1B" color="black" />
                </div>
            </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TaskManagement;
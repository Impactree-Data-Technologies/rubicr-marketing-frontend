"use client"

import React, { useState } from 'react';
import Link  from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  HiOutlineClipboardList, 
  HiOutlineChartBar, 
  HiOutlineUserGroup, 
  HiCheckCircle,
  HiLightningBolt,
  HiTrendingUp,
  HiShieldCheck,
  HiDocumentText,
  HiGlobeAlt
} from 'react-icons/hi';
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import Button from "../../Components/button";

const TaskManagement = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: HiOutlineClipboardList,
      title: "All relevant laws in one place",
      // description: "Easily assign responsibilities and streamline workflows for seamless ESG data collection.",
      details: [
        // "Automated task prioritization",
        // "Smart resource allocation",
        // "Predictive performance analytics"
      ]
    },
    {
      icon: HiOutlineUserGroup,
      title: "Real-time updates on most recent legal changes",
      // description: "Simplifies handling scattered data sources, integrating information from manual registers, Excel sheets, and disconnected databases",
      details: [
        // "Cross-team communication",
        // "Role-based access control",
        // "Instant notification system"
      ]
    },
    {
      icon: HiOutlineChartBar,
      title: "Tailored alerts for specific legal requirements",
      // description: "Ensures the right data is collected by the right person, at the right time, every time.",
      details: [
        // "Real-time progress tracking",
        // "Customizable reporting",
        // "Trend analysis tools"
      ]
    }
  ];

  const overviewHighlights = [
    {
      icon: HiShieldCheck,
      title: "Robust Compliance",
      description: "Ensure regulatory adherence with comprehensive tracking and documentation."
    },
    {
      icon: HiDocumentText,
      title: "Detailed Reporting",
      description: "Generate sophisticated, customizable reports with advanced analytics."
    },
    {
      icon: HiGlobeAlt,
      title: "Global Scalability",
      description: "Designed to support enterprise-level task management across diverse teams."
    }
  ];

  const benefits = [
    { 
      icon: HiLightningBolt, 
      title: "Reduced risk of legal penalties and reputational damage",
      // description: "Empowers sustainability managers by distributing data collection tasks across teams efficiently"
    },
    { 
      icon: HiCheckCircle, 
      title: "Streamlined legal research and analysis, saving time and resources",
      // description: "Eliminates errors caused by scattered or unstructured data with streamlined task assignments and validation processes"
    },
    { 
      icon: HiTrendingUp, 
      title: "Enables proactive identification of potential governance vulnerabilities",
      // description: "Enables proactive identification of potential governance vulnerabilities, ensuring regulatory compliance and minimizing organizational exposure to legal, financial, and reputational risks."
    }
  ];

  return (
    <div className="bg-[#0A192F] text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-4 md:space-y-6 mt-8">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 leading-tight"
            >
              Elevate Your <br className="hidden lg:block" />
              Governance Tracker
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-gray-300 max-w-xl"
            >
            A comprehensive digital monitoring system that tracks, analyzes, and provides real-time insights into organizational governance, compliance, and strategic decision-making processes
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
               <Button label="Schedule a demo" background="#FFCD1B" color="black" href='/contact-us' />
              {/* <Link 
                href="/features" 
                className="px-6 md:px-8 py-2 md:py-3 border-2 border-teal-400 text-teal-400 rounded-full hover:bg-teal-400 hover:text-[#0A192F] transition-colors text-center inline-block"
              >
                Learn More
              </Link> */}
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
      >
        <Image
          src="/Governance Tracker.jpg"  // Replace with your actual image path
          alt="Task Management Dashboard"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  </div>
</div>

      {/* Overview Section */}
      <section className="bg-[#112240] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
              How it works
            </h2>
            {/* <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              Our advanced platform provides a holistic approach to sustainability task management, integrating intelligent workflows, real-time collaboration, and strategic insights.
            </p> */}
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {overviewHighlights.map((highlight, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[#0A192F] p-6 md:p-8 rounded-2xl border-2 border-transparent hover:border-teal-400 transition-all"
              >
                <highlight.icon className="mx-auto text-4xl md:text-5xl text-teal-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-200 text-center mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-400 text-center">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* Features Section */}
       <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Key Features
        </h2>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: activeFeature === index ? 1 : 0.6, 
                x: 0 
              }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveFeature(index)}
              className={`p-6 rounded-xl cursor-pointer transition-all 
                ${activeFeature === index 
                  ? 'bg-gradient-to-r from-[#112240] to-[#0A192F] shadow-2xl' 
                  : 'bg-[#112240] hover:bg-opacity-50'
                }`}
            >
              <div className="flex items-center space-x-4">
                <feature.icon 
                  className={`text-3xl transition-colors 
                    ${activeFeature === index ? 'text-teal-400' : 'text-gray-500'}`} 
                />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              {activeFeature === index && (
                <div className="mt-4 space-y-2">
                  <ul className="pl-4 list-disc text-gray-400">
                    {feature.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        {/* <motion.div
          key={activeFeature}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#112240] p-6 md:p-8 rounded-2xl shadow-2xl"
        > */}
          <Image 
            src="/governance-tracker.png"  // Use the same image for all features
            alt="Feature Illustration"
            width={1920}
            height={1080}
            className="w-full h-full rounded-xl shadow-lg aspect-video object-full"
          />
        {/* </motion.div> */}
      </div>
    </div>
  </section>


      {/* Benefits Section */}
      <section className="bg-[#112240] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Transformative Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-[#0A192F] p-6 md:p-8 rounded-2xl border-2 border-transparent hover:border-teal-400 transition-all"
              >
                <benefit.icon className="mx-auto text-4xl md:text-5xl text-teal-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-200">{benefit.title}</h3>
                {/* <p className="text-gray-400 mt-2">{benefit.description}</p> */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 py-16 lg:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-base md:text-xl text-white mb-10 max-w-2xl mx-auto">
            Discover the power of intelligent task management and revolutionize your sustainability reporting process.
          </p>
          <Button 
            label="Get Started" 
            background="bg-white" 
            color="text-[#0A192F]"
            className="px-8 md:px-10 py-3 md:py-4 text-base md:text-lg rounded-full hover:scale-110 transition-transform"
          />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default TaskManagement;
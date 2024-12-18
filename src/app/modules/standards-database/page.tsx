"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

const ExtensiveStandardsDatabase = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: HiOutlineClipboardList,
      title: "Comprehensive Standards Library",
      description: "Access a centralized repository of global standards.",
      details: []
    },
    {
      icon: HiOutlineUserGroup,
      title: "Regular Updates",
      description: "Stay informed with the latest regulations.",
      details: []
    },
    {
      icon: HiOutlineChartBar,
      title: "User-Friendly Interface",
      description: "Simplify analysis with an intuitive platform",
      details: []
    }
  ];

  const overviewHighlights = [
    {
      icon: HiShieldCheck,
      title: "Leverage our extensive library of global sustainability standards to identify the frameworks that matter most.",
    },
    {
      icon: HiDocumentText,
      title: "Simplify implementation with thematic categorization, making standards easy to understand and apply.",
    },
    {
      icon: HiGlobeAlt,
      title: "Stay ahead of the curve with regular updates aligned with the latest regulations.",
    }
  ];

  const benefits = [
    { 
      icon: HiLightningBolt, 
      title: "Simplified Compliance",
      description: "Quickly identify relevant regulations."
    },
    { 
      icon: HiCheckCircle, 
      title: "Risk Mitigation",
      description: "Proactively address non-compliance risks."
    },
    { 
      icon: HiTrendingUp, 
      title: "Enhanced Decision-Making",
      description: "Rely on accurate, up-to-date data for strategic choices."
    }
  ];

  return (
    <div className="bg-[#0A192F] text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-4 md:space-y-6 mt-8">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 leading-tight"
            >
              Elevate Your
              <br />
              <span className="whitespace-nowrap">Extensive Standard</span>
              <br/>
              <span className="whitespace-nowrap">Database</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base lg:text-lg text-gray-300 max-w-xl"
            >
              A comprehensive, centralized repository containing extensive standardized data across multiple domains, enabling seamless information retrieval, cross-referencing, and advanced analytical capabilities for organizations
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
            >
               <Button label="Schedule a demo" background="#FFCD1B" color="black" href='/contact-us' />
            </motion.div>
          </div>

          {/* Image Column */}
          <div className="flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-md aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/extensive.jpg"
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
      <section className="bg-[#112240] py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
              How it Works
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {overviewHighlights.map((highlight, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[#0A192F] p-5 md:p-8 rounded-2xl border-2 border-transparent hover:border-teal-400 transition-all"
              >
                <highlight.icon className="mx-auto text-3xl md:text-4xl text-teal-400 mb-3 md:mb-4" />
                <h3 className="text-base md:text-xl font-semibold text-gray-200 text-center mb-2 md:mb-3">
                  {highlight.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              Key Features
            </h2>
            <div className="space-y-3 md:space-y-4">
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
                  className={`p-4 md:p-6 rounded-xl cursor-pointer transition-all 
                    ${activeFeature === index 
                      ? 'bg-gradient-to-r from-[#112240] to-[#0A192F] shadow-2xl' 
                      : 'bg-[#112240] hover:bg-opacity-50'
                    }`}
                >
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <feature.icon 
                      className={`text-2xl md:text-3xl transition-colors 
                        ${activeFeature === index ? 'text-teal-400' : 'text-gray-500'}`} 
                    />
                    <h3 className="text-base md:text-xl font-semibold">{feature.title}</h3>
                  </div>
                  {activeFeature === index && (
                    <div className="mt-3 md:mt-4 space-y-2">
                      <p className="text-sm md:text-base text-gray-300">{feature.description}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#112240] p-4 md:p-8 rounded-2xl shadow-2xl"
            >
              <video 
                className="w-full rounded-xl shadow-lg aspect-video object-cover"
                controls
                src="https://v.ftcdn.net/09/13/30/64/700_F_913306442_asUlvFioSTs0MDC4GDu7zSA2dC4ikw6q_ST.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#112240] py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Transformative Benefits
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-[#0A192F] p-5 md:p-8 rounded-2xl border-2 border-transparent hover:border-teal-400 transition-all"
              >
                <benefit.icon className="mx-auto text-3xl md:text-4xl text-teal-400 mb-3 md:mb-4" />
                <h3 className="text-base md:text-xl font-semibold text-gray-200">{benefit.title}</h3>
                <p className="text-sm md:text-base text-gray-400 mt-2">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 py-12 md:py-16 lg:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-sm md:text-base text-white mb-6 md:mb-10 max-w-2xl mx-auto">
            Discover the power of intelligent task management and revolutionize your sustainability reporting process.
          </p>
          <Button 
            label="Get Started" 
            background="bg-white" 
            color="text-[#0A192F]"
            className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full hover:scale-110 transition-transform"
          />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ExtensiveStandardsDatabase;
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, ChevronDown } from 'lucide-react';

export default function Footer() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const solutionsMenu = [
    {
      title: "Sustainability Reporting",
      subMenu: [
        { href: "/modules/standards-database", label: "Extensive Standards Database" },
        { href: "/modules/task-management", label: "Task Management" },
        { href: "/modules/intelligence-rating", label: "Sustainable Intelligence Rating" },
        { href: "/modules/performance-benchmarks", label: "Performance Benchmarks" }
      ]
    },
    {
      title: "Performance Management",
      subMenu: [
        { href: "/modules/supply-chain-tracking", label: "Supply Chain Tracking" },
        { href: "/modules/operational-indicators", label: "Track Key Operational Indicators" },
        { href: "/modules/esg-pillars", label: "Easy to understand ESG pillars" },
        { href: "/modules/governance-tracker", label: "Governance Tracker" },
        { href: "/modules/social-tracker", label: "Social Tracker" }
      ]
    },
    {
      title: "Emission Tracking",
      subMenu: [
        { href: "/modules/scope-1-2", label: "Scope-1 & Scope-2 accounting" },
        { href: "/modules/scope-3", label: "Scope-3 tracking" },
        { href: "/modules/non-ghg", label: "Non GHG Emissions Management" },
        { href: "/modules/unit-tracking", label: "Unit wise tracking" }
      ]
    }
  ];

  const industriesMenu = [
    { href: "/industries/automobile", label: "Automobile" },
    { href: "/industries/chemical", label: "Chemical" },
    { href: "/industries/logistics", label: "Logistics" }
  ];

  const resourcesMenu = [
    { href: "/resources/case-studies", label: "Case Studies" },
    { href: "/resources/blog", label: "Blog" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16 px-6 sm:px-12 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* Company Brand Section */}
          <div className="md:col-span-1">
            <Link href="/">
              <div className="flex items-center mb-6 cursor-pointer">
                <Image
                  src="/white_logo.png"
                  alt="Company Logo"
                  width={150}
                  height={50}
                  className="mr-4"
                />
              </div>
            </Link>
            <p className="text-gray-300 text-sm">
              Empowering sustainable business solutions through advanced tracking and reporting technologies.
            </p>
          </div>

          {/* Modules Section with Dynamic Submenu */}
          <div className="relative">
            <h3 className="text-lg font-semibold mb-6 text-yellow-400 border-b border-gray-700 pb-2">Modules</h3>
            <ul className="space-y-4">
              {solutionsMenu.map((section, index) => (
                <li key={section.title}>
                  <div 
                    className="flex justify-between items-center cursor-pointer group"
                    onClick={() => setOpenSection(openSection === index ? null : index)}
                  >
                    <span className="text-gray-300 group-hover:text-yellow-300 transition-colors">
                      {section.title}
                    </span>
                    <ChevronDown 
                      size={20} 
                      className={`text-gray-400 transition-transform ${
                        openSection === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                  
                  {openSection === index && (
                    <ul className="pl-4 mt-2 space-y-2 border-l border-gray-700">
                      {section.subMenu.map((subItem) => (
                        <li key={subItem.href}>
                          <Link 
                            href={subItem.href} 
                            className="text-gray-400 hover:text-yellow-300 text-sm transition-colors block py-1"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-yellow-400 border-b border-gray-700 pb-2">Industries</h3>
            <ul className="space-y-4">
              {industriesMenu.map((industry) => (
                <li key={industry.href}>
                  <Link 
                    href={industry.href} 
                    className="text-gray-300 hover:text-yellow-300 transition-colors"
                  >
                    {industry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-yellow-400 border-b border-gray-700 pb-2">Resources</h3>
            <ul className="space-y-4">
              {resourcesMenu.map((resource) => (
                <li key={resource.href}>
                  <Link 
                    href={resource.href} 
                    className="text-gray-300 hover:text-yellow-300 transition-colors"
                  >
                    {resource.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-yellow-400 border-b border-gray-700 pb-2">About</h3>
            <ul className="space-y-4">
              {[
                { href: "/about/rubicr", label: "About Rubicr" },
                { href: "/about/news", label: "News Releases" },
                { href: "/about/rewards", label: "Rewards and Recognition" }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-yellow-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-yellow-400 border-b border-gray-700 pb-2">Pricing</h3>
            <Link 
              href="/pricing" 
              className="text-gray-300 hover:text-yellow-300 transition-colors block"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>

        {/* Enhanced Social and CTA Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {/* LinkedIn Section */}
            <div className="flex items-center space-x-4 mb-6 sm:mb-0">
              <Link 
                href="https://www.linkedin.com/company/impactreeai/posts/?feedView=all" 
                target="_blank"
                className="group flex items-center bg-gray-800 hover:bg-blue-600 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <Linkedin 
                  size={28} 
                  className="text-gray-300 group-hover:text-white mr-2"
                />
                <span className="text-gray-300 group-hover:text-white font-medium">
                  Follow us on LinkedIn
                </span>
              </Link>
            </div>

            {/* CTA Button */}
            <Link 
              href="/contact-us" 
              className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-transform transform hover:scale-105"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Rubicr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
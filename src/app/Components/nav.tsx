// components/Navbar.js
"use client";

// components/Navbar.js
import { useState } from 'react';
import Link from 'next/link';
import { FaChartPie, FaLeaf, FaRecycle, FaTree, FaBullseye, FaCheckCircle, FaBook } from 'react-icons/fa';

const Nav = () => {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0">
              <Link href="/">
               greenly
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="#">
                Why Greenly
              </Link>
              <div className="relative">
                <button
                  onClick={toggleServicesDropdown}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Services
                </button>
                {isServicesDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-[600px] bg-white border rounded-md shadow-lg">
                    <div className="grid grid-cols-3 p-4 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Measure</h3>
                        <Link href="#">
                          
                            <FaChartPie className="mr-2" />
                            Carbon Assessment
                          
                        </Link>
                        <Link href="#">
                          
                            <FaRecycle className="mr-2" />
                            LCA
                          
                        </Link>
                        <Link href="#">
                          
                            <FaTree className="mr-2" />
                            Sustainable Procurement
                          
                        </Link>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Act</h3>
                        <Link href="#">
                          
                            <FaLeaf className="mr-2" />
                            Decarbonization Strategy
                          
                        </Link>
                        <Link href="#">
                          
                            <FaBullseye className="mr-2" />
                            Offsetting
                          
                        </Link>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Conform</h3>
                        <Link href="#">
                          
                            <FaCheckCircle className="mr-2" />
                            CSRD
                          
                        </Link>
                        <Link href="#">
                          
                            <FaBook className="mr-2" />
                            SBTi
                          
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link href="#">
                Pricing
              </Link>
              <Link href="#">
                Partners
              </Link>
              <Link href="#">
                Clients
              </Link>
              <Link href="#">
                Resources
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link href="#">
              GB
            </Link>
            <Link href="#">
              Login
            </Link>
            <button className="ml-4 bg-green-600 text-white px-4 py-2 rounded">
              Schedule a call
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

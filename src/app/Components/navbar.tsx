"use client"

import React, { useState, useEffect, MouseEvent } from 'react';
import Image from "next/image";
import Link from 'next/link';

interface MenuItem {
    name: string;
    icon: string;
    link: string;
    description?: string;
}

interface MenuCategory {
    title?: string;
    items: MenuItem[];
}

interface MenuItems {
    [key: string]: MenuCategory[] | MenuItem[];
}

const menuItems: MenuItems = {
    'Modules': [
        { title: 'Sustainability Reporting', items: [
            { name: 'Extensive Standards Database', icon: '📊', link: '/modules/sustainability-reporting/standards-database', description: 'Access a comprehensive database of global sustainability standards.' },
            { name: 'Task Management', icon: '✅', link: '/task-management', description: 'Efficiently manage and track sustainability-related tasks and projects.' },
            { name: 'Sustainable Intelligence Rating', icon: '🌟', link: '/modules/sustainability-reporting/intelligence-rating', description: 'Get insights and ratings on your organization\'s sustainability performance.' },
            { name: 'Performance Benchmarks', icon: '📈', link: '/modules/sustainability-reporting/performance-benchmarks', description: 'Compare your sustainability metrics against industry benchmarks.' },
        ]},
        { title: 'Performance Management', items: [
            { name: 'Supply Chain Tracking', icon: '🔗', link: '/modules/performance-management/supply-chain-tracking', description: 'Monitor and optimize sustainability throughout your supply chain.' },
            { name: 'Track Key Operational Indicators', icon: '🎯', link: '/modules/performance-management/operational-indicators', description: 'Monitor crucial operational metrics impacting sustainability.' },
            { name: 'Easy to understand ESG pillars', icon: '🏛️', link: '/modules/performance-management/esg-pillars', description: 'Simplify complex ESG concepts for better understanding and implementation.' },
            { name: 'Governance Tracker', icon: '📋', link: '/modules/performance-management/governance-tracker', description: 'Track and improve your organization\'s governance practices.' },
            { name: 'Social Tracker', icon: '👥', link: '/modules/performance-management/social-tracker', description: 'Monitor and enhance your company\'s social impact and initiatives.' },
        ]},
        { title: 'Emission Tracking', items: [
            { name: 'Scope-1 & Scope-2 accounting', icon: '🏭', link: '/modules/emission-tracking/scope-1-2', description: 'Accurately measure and report direct and indirect emissions.' },
            { name: 'Scope-3 tracking', icon: '🌐', link: '/modules/emission-tracking/scope-3', description: 'Monitor and manage emissions across your entire value chain.' },
            { name: 'Non GHG Emissions Management', icon: '💨', link: '/modules/emission-tracking/non-ghg', description: 'Track and reduce non-greenhouse gas emissions effectively.' },
            { name: 'Unit wise tracking', icon: '🏛️ ', link: '/modules/emission-tracking/unit-tracking', description: 'Monitor emissions at individual unit or facility level for detailed insights.' },
        ]},
    ],
    'Use Cases': [
        { name: 'Sustainability Reporting', icon: '📊', link: '/sustainability-reporting', description: 'Streamline your sustainability reporting process.' },
        { name: 'Performance Management', icon: '📈', link: '/use-cases/performance-management', description: 'Optimize your sustainability performance.' },
        { name: 'Emission Tracking', icon: '🌍', link: '/use-cases/emission-tracking', description: 'Accurately track and reduce your emissions.' }
    ],
    'Sectors': [
        { name: 'Automobile', icon: '🚗', link: '/sectors/automobile', description: 'Sustainability solutions for the automotive industry.' },
        { name: 'Chemicals', icon: '🧪', link: '/sectors/chemicals', description: 'Manage environmental impact in the chemical sector.' },
        { name: 'ITES', icon: '💻', link: '/sectors/ites', description: 'IT-enabled services sustainability management.' },
        { name: 'BFSI', icon: '🏦', link: '/sectors/bfsi', description: 'Sustainable practices for banking and finance.' },
        { name: 'O&M', icon: '🔧', link: '/sectors/om', description: 'Operations and Maintenance sustainability solutions.' },
        { name: 'Sports', icon: '⚽', link: '/sectors/sports', description: 'Promoting sustainability in sports organizations.' }
    ],
    'Resources': [
        { name: 'Overview', icon: '📚', link: '/resources/overview', description: 'Get an overview of our sustainability resources.' },
        { name: 'Case Studies', icon: '📝', link: '/resources/case-studies', description: 'Learn from real-world sustainability success stories.' },
        { name: 'Blog', icon: '✍️', link: '/resources/blog', description: 'Stay updated with our latest sustainability insights.' },
        { name: 'Community', icon: '👥', link: '/resources/community', description: 'Join our sustainability community.' },
        { name: 'Documentation', icon: '📄', link: '/resources/documentation', description: 'Access detailed documentation and guides.' },
        { name: 'Support', icon: '🆘', link: '/resources/support', description: 'Get help with our sustainability solutions.' }
    ]
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDropdown = (item: string) => {
        setActiveDropdown(activeDropdown === item ? null : item);
    };

    const handleMobileDropdown = (item: string) => {
        setActiveMobileDropdown(activeMobileDropdown === item ? null : item);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <Image
                                src="/Logo.svg"
                                alt="Company Logo"
                                className="h-8 w-auto"
                                width={120}
                                height={40}
                            />
                        </Link>
                        <div className="hidden lg:flex items-center space-x-4">
                            <Link href="/home" className="text-gray-700 hover:text-green-600 text-base font-medium">
                                Home
                            </Link>
                            {Object.keys(menuItems).map((item, index) => (
                                <div key={index} className="relative group">
                                    <span 
                                        className="text-gray-700 hover:text-green-600 text-base font-medium cursor-pointer"
                                        onMouseEnter={() => setActiveDropdown(item)}
                                        onClick={() => handleDropdown(item)}
                                    >
                                        {item}
                                    </span>
                                </div>
                            ))}
                            <Link href="/pricing" className="text-gray-700 hover:text-green-600 text-base font-medium">
                                Pricing
                            </Link>
                        </div>
                        <button
                            type="button"
                            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden bg-white shadow-md overflow-y-auto max-h-[calc(100vh-4rem)]`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">
                           Home
                        </Link>
                        {Object.entries(menuItems).map(([key, value]) => (
                            <div key={key} className="relative">
                                <button
                                    onClick={() => handleMobileDropdown(key)}
                                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                                >
                                    {key}
                                    <svg className={`w-5 h-5 ml-2 transition-transform duration-200 ${activeMobileDropdown === key ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {activeMobileDropdown === key && (
                                    <div className="pl-4">
                                        {key === 'Modules' ? (
                                            (value as MenuCategory[]).map((module, index) => (
                                                <div key={index} className="mt-2">
                                                    <h4 className="font-semibold text-gray-900 px-3 py-2">{module.title}</h4>
                                                    {module.items.map((item, itemIndex) => (
                                                        <Link key={itemIndex} href={item.link} className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50">
                                                            <span className="mr-3 text-xl">{item.icon}</span>
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            (value as MenuItem[]).map((item, index) => (
                                                <Link key={index} href={item.link} className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50">
                                                    <span className="mr-3 text-xl">{item.icon}</span>
                                                    {item.name}
                                                </Link>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link href="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">
                            Pricing
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Submenu for all sections */}
            {activeDropdown && menuItems[activeDropdown] && (
                <div
                    className="fixed top-16 left-0 right-0 z-40 w-full overflow-y-auto bg-transparent"
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeDropdown === 'Modules' ? (
                                    (menuItems[activeDropdown] as MenuCategory[]).map((column, colIndex) => (
                                        <div key={colIndex} className="space-y-4">
                                            <h3 className="font-bold text-yellow-400 text-lg">{column.title}</h3>
                                            {column.items.map((subItem, subIndex) => (
                                                <Link key={subIndex} href={subItem.link} className="flex items-start space-x-3 group">
                                                    <span className="text-2xl flex-shrink-0 bg-yellow-100 p-1 rounded-lg group-hover:bg-yellow-200 transition-colors duration-200 flex items-center justify-center">{subItem.icon}</span>
                                                    <div>
                                                        <h4 className="text-gray-700 font-semibold text-sm group-hover:text-yellow-600 transition-colors duration-200">{subItem.name}</h4>
                                                        <p className="text-xs text-gray-500 mt-1">{subItem.description}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ))
                                ) : (
                                    (menuItems[activeDropdown] as MenuItem[]).map((item, index) => (
                                        <Link key={index} href={item.link} className="flex items-start space-x-3 group">
                                            <span className="text-2xl flex-shrink-0 bg-yellow-100 p-1 rounded-lg group-hover:bg-yellow-200 transition-colors duration-200 flex items-center justify-center">{item.icon}</span>
                                            <div>
                                                <h4 className="text-gray-700 font-semibold text-sm group-hover:text-yellow-600 transition-colors duration-200">{item.name}</h4>
                                                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

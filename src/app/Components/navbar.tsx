"use client"

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import Button from "../Components/button";
import { usePathname } from 'next/navigation';

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

interface NavbarProps {
    className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
    const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
    const [isHomePage, setIsHomePage] = useState<boolean>(false);

    
    const pathname = usePathname();

    useEffect(() => {
        // Check if it's the home page
        setIsHomePage(pathname === '/');

        // Set up scroll listener
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    

  

    const handleDropdown = (item: string) => {
        setActiveDropdown(activeDropdown === item ? null : item);
        setActiveNavItem(item);
    };

    const handleMobileDropdown = (item: string) => {
        setActiveMobileDropdown(activeMobileDropdown === item ? null : item);
    };

    const navbarBgColor = isHomePage ? (isScrolled ? 'bg-white' : 'bg-transparent') : 'bg-white';
    const textColor = isHomePage ? (isScrolled ? 'text-black' : 'text-white') : 'text-black';
    const hoverTextColor = isHomePage ? (isScrolled ? 'hover:text-yellow-600' : 'hover:text-yellow-300') : 'hover:text-yellow-300';
    const activeTextColor = isHomePage ? (isScrolled ? 'text-yellow-600' : 'text-yellow-300') : 'text-yellow-300';
    const logoPath = isHomePage ? (isScrolled ? '/Logo.svg' : '/white_logo.png') : '/Logo.svg';

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${navbarBgColor} ${isScrolled ? 'shadow-md' : ''}`}>
                <div className="w-full">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex-shrink-0">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${logoPath}`}
                                    alt="Company Logo"
                                    className="h-8 w-auto"
                                    width={120}
                                    height={40}
                                    unoptimized 
                                />
                            </Link>
                            <div className="hidden lg:flex items-center ml-10 space-x-4 relative">
                                <Link href="/" className={`${textColor} ${hoverTextColor} text-base font-medium ${activeNavItem === 'Home' ? activeTextColor : ''}`} onClick={() => setActiveNavItem('Home')}>
                                    Home
                                </Link>
                                {Object.keys(menuItems).map((item, index) => (
                                    <div key={index} className="relative group">
                                        <span 
                                            className={`${textColor} ${hoverTextColor} text-base font-medium cursor-pointer flex items-center ${activeNavItem === item ? activeTextColor : ''}`}
                                            onMouseEnter={() => setActiveDropdown(item)}
                                            // onClick={() => handleDropdown(item)}
                                        >
                                            {item}
                                            {Array.isArray(menuItems[item]) && menuItems[item].length > 0 && (
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            )}
                                        </span>
                                    </div>
                                ))}
                                <Link href="/pricing" className={`${textColor} ${hoverTextColor} text-base font-medium ${activeNavItem === 'Pricing' ? activeTextColor : ''}`} onClick={() => setActiveNavItem('Pricing')}>
                                    Pricing
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center">
                            <Button label="Begin Your Journey" background="#FFCD1B" color="black" href='/contact-us' />
                        </div>
                        <button
                            type="button"
                            className={`lg:hidden inline-flex items-center justify-center p-2 rounded-md ${textColor} ${hoverTextColor} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500`}
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
                <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden ${isHomePage ? 'bg-black' : 'bg-black'} shadow-md overflow-y-auto max-h-[calc(100vh-4rem)]`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium text-white ${hoverTextColor}`}>
                           Home
                        </Link>
                        {Object.entries(menuItems).map(([key, value]) => (
                            <div key={key} className="relative">
                                <button
                                    onClick={() => handleMobileDropdown(key)}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium  text-white ${hoverTextColor}`}
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
                                                    <h4 className={`font-semibold  text-white px-3 py-2`}>{module.title}</h4>
                                                    {module.items.map((item, itemIndex) => (
                                                        <Link key={itemIndex} href={item.link} className={`flex items-center px-3 py-2 text-sm  text-white ${hoverTextColor}`}>
                                                            <span className="mr-3 text-xl">{item.icon}</span>
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            (value as MenuItem[]).map((item, index) => (
                                                <Link key={index} href={item.link} className={`flex items-center px-3 py-2 text-sm  text-white ${hoverTextColor}`}>
                                                    <span className="mr-3 text-xl">{item.icon}</span>
                                                    {item.name}
                                                </Link>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link href="/pricing" className={`block px-3 py-2 rounded-md text-base font-medium text-white ${hoverTextColor}`}>
                            Pricing
                        </Link>
                        
                        <Button label="Begin Your Journey" background="#FFCD1B" color="black"  href='/contact-us' />
                        
                    </div>
                </div>
            </nav>

           {/* Submenu for all sections */}
            {activeDropdown && menuItems[activeDropdown] && (
                <div
                    className="fixed top-16 left-0 right-0 z-40 w-full overflow-y-auto bg-transparent"
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
                        <div className={`${isHomePage ? 'bg-white' : 'bg-gray-900'} shadow-lg rounded-lg p-6`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeDropdown === 'Modules' ? (
                                    (menuItems[activeDropdown] as MenuCategory[]).map((column, colIndex) => (
                                        <div key={colIndex} className="space-y-4">
                                            <h3 className="font-bold text-yellow-400 text-lg">{column.title}</h3>
                                            {column.items.map((subItem, subIndex) => (
                                                <Link key={subIndex} href={subItem.link} className="flex items-start space-x-3 group">
                                                    <span className="text-2xl flex-shrink-0 bg-yellow-100 p-1 rounded-lg group-hover:bg-yellow-200 transition-colors duration-200 flex items-center justify-center">{subItem.icon}</span>
                                                    <div>
                                                        <h4 className={`${isHomePage ? 'text-gray-700' : 'text-gray-200'} font-semibold text-sm group-hover:text-yellow-600 transition-colors duration-200`}>{subItem.name}</h4>
                                                        <p className={`text-xs ${isHomePage ? 'text-gray-500' : 'text-gray-400'} mt-1`}>{subItem.description}</p>
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
                                                <h4 className={`${isHomePage ? 'text-gray-700' : 'text-gray-200'} font-semibold text-sm group-hover:text-yellow-600 transition-colors duration-200`}>{item.name}</h4>
                                                <p className={`text-xs ${isHomePage ? 'text-gray-500' : 'text-gray-400'} mt-1`}>{item.description}</p>
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

export default Navbar;
"use client"

import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/navbar";
import Image from 'next/image';
import Button from "../../Components/button";
import Footer from "../../Components/footer";

const sportsEsgFeatures = [
    {
        title: 'Reduce Emissions', 
        description: 'Sports events can significantly reduce their carbon footprint through smart planning and sustainable practices.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
            </svg>
        )
    },
    {
        title: 'Fan Engagement', 
        description: 'Engage fans in sustainability initiatives, enhancing their connection to the team and environmental causes.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
            </svg>
        )
    },
    {
        title: 'Sustainable Venues', 
        description: 'Implement green technologies in sports venues to reduce energy consumption and waste.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
            </svg>
        )
    },
];

const sportsEsgSolutions = [
    { 
        title: 'Carbon Footprint Measurement', 
        description: 'Accurately measure and report the carbon footprint of sporting events, from travel to energy consumption.',
        image: '/expense.jpg'
    },
    { 
        title: 'Sustainable Venue Management', 
        description: 'Implement green technologies in sports venues to reduce energy use, water consumption, and waste.',
        image: '/carbon.png' 
    },
    { 
        title: 'Eco-Friendly Team Operations', 
        description: 'Optimize team travel, training facilities, and daily operations to minimize environmental impact.',
        image: '/carbon.png' 
    },
    { 
        title: 'Fan Engagement for Sustainability', 
        description: 'Develop programs to involve fans in sustainability efforts, turning your fanbase into a force for environmental good.',
        image: '/carbon.png' 
    },
    {
        title: 'Sustainable Merchandising', 
        description: 'Create and promote eco-friendly team merchandise using sustainable materials and ethical manufacturing processes.',
        image: '/carbon.png'
    },
    {
        title: 'ESG Reporting for Sports', 
        description: 'Comprehensive ESG reporting tailored for sports entities to track, measure, and communicate your environmental and social impact.',
        image: '/carbon.png'
    }
];

const carbonManagementBenefits = [
    {
        number: "1",
        title: "For your customers",
        description: "Support your clients in understanding the new climate-related issues, by developing your expertise on all of these subjects.",
        color: "bg-teal-400"
    },
    {
        number: "2",
        title: "For your company",
        description: "Differentiate yourself from your competitors by establishing yourself as a full-fledged player in the transition to a sustainable world.",
        color: "bg-purple-400"
    },
    {
        number: "3",
        title: "For the planet",
        description: "Fight against global warming and contribute to the goal of carbon neutrality 2050, by starting to reduce your own CO2 emissions.",
        color: "bg-yellow-400"
    }
];

export default function Sports() {
    const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSolutionIndex((prevIndex) => (prevIndex + 1) % sportsEsgSolutions.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const activeSolution = sportsEsgSolutions[activeSolutionIndex];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
 
            <header className="bg-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
                            <h2 className="text-yellow-600 font-semibold mb-2 text-lg sm:text-xl">THE #1 SOLUTION FOR SPORTS ORGANIZATIONS</h2>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                                Lead <span className="bg-yellow-400 px-2">by example</span>, promote sustainability in sports
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 mb-8">
                                Sports organizations have a unique platform to influence society. Beyond raising awareness, their role is to serve as an example in addressing climate change through sustainable practices.
                            </p>
                            <Button label="Contact Us" background="#FFCD1B" color="black" />
                        </div>
                        <div className="lg:w-1/2 w-full max-w-md lg:max-w-none">
                            <div className="relative w-full pt-[100%] lg:pt-[75%] rounded-[50px] sm:rounded-[100px] bg-yellow-200 overflow-hidden border-4 border-yellow-400">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/sports.jpg`}
                                    alt="Sustainable Sports" 
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-[50px] sm:rounded-[100px]"
                                    unoptimized
                                    
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">
                    We can reduce sports-related<br className="hidden sm:inline" />
                    emissions by up to <span className="text-yellow-700">50%</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sportsEsgFeatures.map((feature, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-yellow-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="w-full bg-black text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
                        Comprehensive ESG Solutions for Sports
                    </h2>
                    <div className="flex flex-col lg:flex-row items-start">
                        <div className="w-full lg:w-1/3 lg:pr-8 mb-8 lg:mb-0">
                            {sportsEsgSolutions.map((solution, index) => (
                                <div 
                                    key={index} 
                                    className={`mb-4 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                                        index === activeSolutionIndex
                                        ? 'bg-yellow-600 text-white' 
                                        : 'bg-gray-800 text-white hover:bg-gray-700'
                                    }`}
                                    onClick={() => setActiveSolutionIndex(index)}
                                >
                                    <h3 className="text-lg sm:text-xl font-semibold">{solution.title}</h3>
                                    {index === activeSolutionIndex && (
                                        <p className="text-sm mt-2 transition-all duration-300">
                                            {solution.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="w-full lg:w-2/3">
                            <div className="relative w-full h-0 pb-[75%] lg:pb-[56.25%]">
                                <Image
                                    src={activeSolution.image}
                                    alt={activeSolution.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Carbon Management Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center">
                    Carbon management,<br />
                    <span className="bg-black text-white px-4 py-2 inline-block mt-2">a solution for everyone</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {carbonManagementBenefits.map((benefit, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-xl p-8">
                            <div className={`${benefit.color} w-20 h-20 rounded-full flex items-center justify-center mb-6`}>
                                <span className="text-4xl font-bold text-white">{benefit.number}</span>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-[#f6e2cb] py-20 mx-8 md:mx-20 rounded-3xl mb-20 mt-20">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started Today</h2>
                    <hr className="border-t-2 border-[#64271F] w-1/4 mb-6" />
                    <p className="text-lg md:text-2xl mb-8">Ready to transform your ESG Performance?</p>
                    <Button label="Contact Us" background="#FFCD1B" color="black" />
                </div>
            </section>

            <Footer />
        </div>
    );
}
"use client"

import Link from 'next/link';
import Navbar from "../Components/navbar";
import Button from "../Components/button";
import Footer from "../Components/footer";
import { FaChartLine, FaTasks, FaStar, FaChartBar } from 'react-icons/fa';

export default function UseCase() {
    const modules = [
        { 
            title: "Extensive Standards Database", 
            description: "Select from our supported standards or build your own standards database",
            slug: "extensive-standards-database"
        },
        { 
            title: "Task Management", 
            description: "Collect data from authorised sources with validation using our maker-checker validation principle",
            slug: "task-management"
        },
        { 
            title: "Sustainable Intelligence Rating", 
            description: "Link all relevant ESG databases to our Sustainable Intelligence engine to give numeric scores to track your sustainability performance",
            slug: "sustainable-intelligence-rating"
        },
        { 
            title: "Performance Benchmarks", 
            description: "Understand performance of peers through our benchmarking layer collating data from public sources",
            slug: "performance-benchmarks"
        },
    ];

    return (
        <div className="font-sans bg-gray-50">
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
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6">Sustainability Reporting</h1>
                            <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8">
                                Be in total control of your ESG reporting needs with RubiCr's Sustainable Intelligence Platform.
                            </p>
                            <div className="flex justify-center md:justify-start">
                                <Button background="#FFCD1B" color="black" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="aspect-w-16 aspect-h-9 md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                                <iframe 
                                    src="https://player.vimeo.com/video/766513504?h=186e36c0a3?api=1&background=1&mute=0" 
                                    width="100%" 
                                    height="100%" 
                                    frameBorder="0" 
                                    allow="autoplay; fullscreen" 
                                    allowFullScreen
                                    className="w-full h-full object-cover"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Simplify your Sustainability Reporting</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { icon: FaChartLine, title: "Track ESG Indicators", description: "Monitor all required ESG indicators effortlessly." },
                            { icon: FaTasks, title: "Global Framework Support", description: "Choose from major global frameworks relevant to your business." },
                            { icon: FaChartBar, title: "Centralized Reporting", description: "Collect data, track indicators, and create a single view for all ESG reports." },
                        ].map((feature, index) => (
                            <div key={index} className="text-center">
                                <feature.icon className="mx-auto text-5xl text-yellow-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modules Section */}
            <div className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Sustainability Reporting Software Modules</h2>
                    {modules.map((module, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-8 mb-10 flex flex-col md:flex-row">
                            <div className="md:w-1/2 pr-8">
                                <h3 className="text-2xl font-bold mb-4">{module.title}</h3>
                                <p className="text-gray-600 mb-6">{module.description}</p>
                                <Link href={`/${module.slug}`} className="text-yellow-500 hover:text-yellow-600 font-semibold">
                                    Learn More →
                                </Link>
                            </div>
                            <div className="md:w-1/2 mt-6 md:mt-0">
                                <div className="aspect-w-16 aspect-h-9">
                                    <video 
                                        className="w-full h-full object-cover rounded-lg"
                                        controls
                                        poster="/api/placeholder/640/360"
                                    >
                                        <source src={`/videos/${module.slug}.mp4`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <section className="bg-[#f6e2cb] py-20 mx-8 md:mx-20 rounded-3xl mb-20">
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
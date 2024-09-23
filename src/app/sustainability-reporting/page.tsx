"use client"

import Link from 'next/link';
import Navbar from "../Components/navbar";
import Button from "../Components/button";
import Footer from "../Components/footer";
import { FaChartLine, FaTasks, FaStar, FaChartBar, FaDatabase, FaClipboardCheck, FaChartPie, FaUsers } from 'react-icons/fa';

export default function UseCase() {
    const modules = [
        { 
            title: "Extensive Standards Database", 
            description: "Select from our supported standards or build your own standards database with the data",
            slug: "extensive-standards-database",
            icon: FaDatabase
        },
        { 
            title: "Task Management", 
            description: "Collect data from authorised sources with validation using our maker-checker validation principle",
            slug: "task-management",
            icon: FaClipboardCheck
        },
        { 
            title: "Sustainable Intelligence Rating", 
            description: "Link all relevant ESG databases to our Sustainable Intelligence engine to give numeric scores to track your sustainability performance",
            slug: "sustainable-intelligence-rating",
            icon: FaChartPie
        },
        { 
            title: "Performance Benchmarks", 
            description: "Understand performance of peers through our benchmarking layer collating data from public sources",
            slug: "performance-benchmarks",
            icon: FaUsers
        },
    ];

    return (
        <div className="font-sans bg-gray-50">
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
                                Sustainability <span className="text-yellow-600">Reporting</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
                                Be in total control of your ESG reporting needs with RubiCrs Sustainable Intelligence Platform.
                            </p>
                            <Button label="Contact Us" background="#FFCD1B" color="black" className="text-lg py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105" />
                        </div>
                        <div className="w-full lg:w-1/2 relative">
                        <div className="aspect-w-9 aspect-h-16 md:aspect-w-16 md:aspect-h-16 lg:aspect-w-4 lg:aspect-h-5 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300">
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
                    <h2 className="text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-16">Simplify your Sustainability Reporting</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: FaChartLine, title: "Track ESG Indicators", description: "Monitor all required ESG indicators effortlessly." },
                            { icon: FaTasks, title: "Global Framework Support", description: "Choose from major global frameworks relevant to your business." },
                            { icon: FaChartBar, title: "Centralized Reporting", description: "Collect data, track indicators, and create a single view for all ESG reports." },
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                                <feature.icon className="text-6xl text-yellow-500 mb-6" />
                                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modules Section */}
            <div className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-16">Sustainability Reporting Software Modules</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {modules.map((module, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300">
                                <div className="p-8">
                                    <module.icon className="text-5xl text-yellow-500 mb-6" />
                                    <h3 className="text-2xl font-bold mb-4">{module.title}</h3>
                                    <p className="text-gray-600 mb-6">{module.description}</p>
                                    <Link href={`/${module.slug}`} className="inline-block bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-600 transition duration-300">
                                        Learn More →
                                    </Link>
                                </div>
                                <div className="aspect-w-16 aspect-h-9">
                                    <video 
                                        className="w-full h-full object-cover"
                                        controls
                                        poster="/api/placeholder/640/360"
                                    >
                                        <source src={`/videos/${module.slug}.mp4`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-yellow-400 to-yellow-600 py-20 mx-8 md:mx-20 rounded-3xl mb-20 shadow-2xl">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get Started Today</h2>
                    <hr className="border-t-2 border-white w-24 mx-auto mb-6" />
                    <p className="text-xl md:text-2xl mb-8 text-white">Ready to transform your ESG Performance?</p>
                   
                    <Button label="Begin Your Journey" background="white" color="black"  href="/contact-us"/>
                </div>
            </section>

            <Footer />
        </div>
    );
}
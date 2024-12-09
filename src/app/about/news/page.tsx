import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import Button from "../../Components/button";

// Sample news data (replace with your actual data source)
const newsReleases = [
  {
    id: 1,
    title: "Company Launches Innovative New Product",
    date: "December 5, 2024",
    summary: "Our latest breakthrough technology is set to revolutionize the industry with unprecedented features and performance.",
    imageUrl: "/api/placeholder/800/400"
  },
  {
    id: 2,
    title: "Expansion Announcement: New Global Headquarters",
    date: "November 22, 2024",
    summary: "We are excited to share our plans for a state-of-the-art global headquarters that will support our continued growth.",
    imageUrl: "/api/placeholder/800/400"
  },
  {
    id: 3,
    title: "Annual Sustainability Report Released",
    date: "November 10, 2024",
    summary: "Our commitment to environmental sustainability reaches new heights with groundbreaking initiatives and measurable progress.",
    imageUrl: "/api/placeholder/800/400"
  }
];

const NewsReleasesPage = () => {
  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            News Releases
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Stay updated with our latest company news and announcements
          </p>
        </header>

        <div className="space-y-8">
          {newsReleases.map((release) => (
            <article 
              key={release.id} 
              className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-1/3">
                  <Image
                    src={release.imageUrl} 
                    alt={release.title} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center text-gray-500 mb-3">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="text-sm">{release.date}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {release.title}
                  </h2>

                  <p className="text-gray-600 mb-6">
                    {release.summary}
                  </p>

                  <a 
                    href="#" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Read More 
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center space-x-4">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Previous
          </button>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <div className="py-10">

<section className="bg-gradient-to-r from-yellow-500 to-yellow-700 py-20 mx-8 md:mx-20 rounded-3xl mb-20 shadow-2xl">
<div className="max-w-screen-xl mx-auto px-4 text-center">
  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get Started Today</h2>
  <hr className="border-t-2 border-white w-24 mx-auto mb-6" />
  <p className="text-xl md:text-2xl mb-8 text-white">Ready to transform your ESG Performance?</p>
  <Button label="Schedule a demo" background="#FFCD1B" color="white" href="/contact-us" />
</div>
</section>
</div>

<Footer />
</div>
  );
};

export default NewsReleasesPage;
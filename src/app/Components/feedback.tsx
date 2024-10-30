"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { ArrowRight, ArrowLeft, Star, Users, MessageCircle, Heart } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FeedbackAttributes {
  quote: string;
  name: string;
  title: string;
  image: string;
}

interface FeedbackData {
  id: number;
  attributes: FeedbackAttributes;
}

export default function Feedback() {
  const [feedbackData, setFeedbackData] = useState<FeedbackAttributes[]>([]);
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get<{ data: FeedbackData[] }>(`${BASE_URL}/api/feedbacks`);
        const fetchedData = response.data.data.map(item => item.attributes);
        setFeedbackData(fetchedData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbackData();
  }, []);

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentFeedbackIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentFeedbackIndex((prevIndex) => (prevIndex - 1 + feedbackData.length) % feedbackData.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white">
        <div className="bg-red-500/10 backdrop-blur-lg p-6 rounded-xl border border-red-500/20">
          Error: {error.message}
        </div>
      </div>
    );
  }

  if (!feedbackData.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white">
        <div>No testimonials available</div>
      </div>
    );
  }

  const { quote, name, title, image } = feedbackData[currentFeedbackIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* <div className="inline-flex items-center justify-center space-x-2 px-6 py-2 bg-white/5 rounded-full backdrop-blur-lg mb-6">
            <Users className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-medium">Join 10,000+ Happy Clients</span>
          </div> */}
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            Client Success Stories
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Discover how our solutions have transformed businesses worldwide
          </p>
        </div>

        {/* Main Content */}
        <div className="relative">
          <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {/* Card Container */}
            <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 lg:p-12 overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
              
              {/* Content Grid */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                {/* Image Column */}
                <div className="lg:col-span-2">
                  <div className="relative aspect-square rounded-2xl overflow-hidden group">
                    {image && (
                      <>
                        <Image
                          src={image}
                          alt={name}
                          fill
                          className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0"></div>
                      </>
                    )}
                    {/* Social Proof Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-white/10 backdrop-blur-lg rounded-lg">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        <div className="p-2 bg-white/10 backdrop-blur-lg rounded-lg">
                          <Heart className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-lg"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-3">
                  <div className="flex flex-col h-full justify-between">
                    {/* Quote */}
                    <blockquote className="text-2xl lg:text-3xl font-light leading-relaxed mb-8">
                      "{quote}"
                    </blockquote>

                    {/* Author Info */}
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold">{name}</h3>
                      <p className="text-indigo-400">{title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0">
              {/* Progress Indicators */}
              <div className="flex items-center space-x-3">
                {feedbackData.map((_, index) => (
                  <button
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setCurrentFeedbackIndex(index)}
                    className="group relative"
                  >
                    <div className={`h-2 rounded-full transition-all duration-300 ${
                      currentFeedbackIndex === index
                        ? 'w-12 bg-indigo-500'
                        : hoveredIndex === index
                        ? 'w-8 bg-indigo-400'
                        : 'w-2 bg-white/20'
                    }`} />
                    <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 
                      px-3 py-1 bg-white/10 backdrop-blur-lg rounded-full text-sm
                      transition-opacity duration-200 ${
                        hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                      }`}>
                      {index + 1}
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePrev}
                  className="group flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-lg transition-all duration-200"
                >
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={handleNext}
                  className="group flex items-center space-x-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-full transition-all duration-200"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
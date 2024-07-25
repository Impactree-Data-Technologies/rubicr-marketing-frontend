"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

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

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get<{ data: FeedbackData[] }>('http://localhost:1337/api/feedbacks'); // Replace with your API endpoint
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
    setCurrentFeedbackIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
  };

  const handlePrev = () => {
    setCurrentFeedbackIndex((prevIndex) => (prevIndex - 1 + feedbackData.length) % feedbackData.length);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!feedbackData.length) {
    return <div>No feedback available</div>;
  }

  const { quote, name, title, image } = feedbackData[currentFeedbackIndex];

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-lg leading-6 font-semibold text-white">Hear from Our</h2>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Successful Clients</h1>
          <p className="mt-3 text-base text-white">Discover how companies are achieving their ESG goals and driving business value with our solutions.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <blockquote className="text-lg italic text-gray-700 mb-4 text-center">
            {quote}
          </blockquote>
          <div className="flex items-center justify-center">
            {image && (
              <Image
                src={image}
                alt={name}
                width={50}
                height={50}
                className="rounded-full shadow-lg"
              />
            )}
            <div className="ml-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500">{title}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-8 space-x-4">
          <button
            onClick={handlePrev}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none shadow-md"
          >
            {"<"}
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none shadow-md"
          >
            {">"}
          </button>
          <span className="text-white">{`${currentFeedbackIndex + 1}/${feedbackData.length}`}</span>
        </div>
      </div>
    </div>
  );
}

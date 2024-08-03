import React, { useState, useEffect } from 'react';
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ImageAttributes {
  url: string;
}

interface ImageData {
  data: {
    attributes: ImageAttributes;
  };
}

interface ImageToggler {
  with_rubicr: ImageData;
  without_rubicr: ImageData;
}

interface ApiResponse {
  data: {
    attributes: {
      image_toggler: ImageToggler;
    };
  };
}

const ImageToggle: React.FC = () => {
  const [showRubric, setShowRubric] = useState<boolean>(true);
  const [data, setData] = useState<ImageToggler | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}/api/home?populate[0]=image_toggler.with_rubicr&populate[1]=image_toggler.without_rubicr`);
        const responseData: ApiResponse = await response.json();
        setData(responseData.data.attributes.image_toggler);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleSelection = (isRubric: boolean) => {
    setShowRubric(isRubric);
  };

  const renderImage = () => {
    if (!data) return null;

    const imageUrl = showRubric
      ? `${data.with_rubicr.data.attributes.url}`
      : `${data.without_rubicr.data.attributes.url}`;

    return (
      <Image 
        src={imageUrl} 
        width={800}
        height={800}
        alt={showRubric ? "Image with Rubicr" : "Image without Rubicr"} 
        className="max-w-full h-auto rounded-lg shadow-lg transform transition duration-500 hover:scale-105" 
      />
    );
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 py-16 px-4 md:px-8 min-h-screen flex items-center justify-center">
      <div className="bg-black rounded-2xl shadow-2xl p-8 max-w-screen-lg w-full">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white">How Rubicr Simplifies Your ESG Journey</h2>
        {/* Rubric selection slider */}
        <div className="flex justify-center mb-6">
          <div className="relative flex items-center w-64 h-10 p-1 bg-gray-300 rounded-full">
            <div
              className={`absolute top-0 bottom-0 left-0 h-full w-1/2 rounded-full transition-transform duration-300 ${showRubric ? 'bg-yellow-300 transform translate-x-0' : 'bg-yellow-300 transform translate-x-full'}`}
            ></div>
            <div className="flex w-full z-10">
              <span
                className={`w-1/2 text-center cursor-pointer ${showRubric ? 'text-white' : 'text-gray-700'}`}
                onClick={() => handleSelection(true)}
              >
                With Rubicr
              </span>
              <span
                className={`w-1/2 text-center cursor-pointer ${!showRubric ? 'text-white' : 'text-gray-700'}`}
                onClick={() => handleSelection(false)}
              >
                Without Rubicr
              </span>
            </div>
          </div>
        </div>
       
        {/* Image */}
        <div className="flex justify-center mb-8">
          {renderImage()}
        </div>
      </div>
    </div>
  );
};

export default ImageToggle;

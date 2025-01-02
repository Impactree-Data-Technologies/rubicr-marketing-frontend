import { cache } from 'react';
import React, { Suspense, useState, useRef, useEffect } from 'react';
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Interfaces for type safety
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

// Cached data fetching function
const getImageData = cache(async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/home?populate[0]=image_toggler.with_rubicr&populate[1]=image_toggler.without_rubicr`, 
      { 
        cache: 'force-cache',
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const responseData: ApiResponse = await response.json();
    return responseData.data.attributes.image_toggler;
  } catch (error) {
    console.error('Error fetching image data:', error);
    throw error;
  }
});

// Client-side component
function ImageToggleClient({ withRubicrUrl, withoutRubicrUrl }: { withRubicrUrl: string; withoutRubicrUrl: string }) {
  const [showRubric, setShowRubric] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSelection = (isRubric: boolean) => {
    setShowRubric(isRubric);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error attempting to play the video:", error);
      });
    }
  }, [showRubric]);

  const renderMedia = () => {
    const url = showRubric ? withRubicrUrl : withoutRubicrUrl;
    const isVideo = url.toLowerCase().endsWith('.mov') || url.toLowerCase().endsWith('.mp4');

    if (isVideo) {
      return (
        <video
          ref={videoRef}
          src={url}
          width={800}
          height={800}
          loop
          muted
          playsInline
          autoPlay
          className="max-w-full h-auto rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
        >
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <Image
          src={url}
          width={800}
          height={800}
          alt={showRubric ? "Media with Rubicr" : "Media without Rubicr"}
          className="max-w-full h-auto rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
        />
      );
    }
  };

  return (
    <>
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
      
      <div className="flex justify-center mb-8">
        {renderMedia()}
      </div>
    </>
  );
}

// Async component with built-in error handling
async function ImageContent() {
  try {
    const data = await getImageData();
    return (
      <ImageToggleClient
        withRubicrUrl={`${BASE_URL}${data.with_rubicr.data.attributes.url}`}
        withoutRubicrUrl={`${BASE_URL}${data.without_rubicr.data.attributes.url}`}
      />
    );
  } catch (error) {
    return <div>Error loading images</div>;
  }
}

// Server-side component
export default function ImageToggleServer() {
  return (
    <div className="bg-yellow-100 py-16 px-4 md:px-8 min-h-screen flex items-center justify-center">
      <div className="bg-black rounded-2xl shadow-2xl p-8 max-w-screen-lg w-full">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white">
          How Rubicr Simplifies Your ESG Journey
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <ImageContent />
        </Suspense>
      </div>
    </div>
  );
}

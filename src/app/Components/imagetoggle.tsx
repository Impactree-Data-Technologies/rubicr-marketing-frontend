import { cache } from 'react';
import { Suspense } from 'react';
import ImageToggleClient from './ImageToggleClient';

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
        cache: 'force-cache', // Implements caching
        next: { 
          revalidate: 3600 // Revalidate every hour
        }
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
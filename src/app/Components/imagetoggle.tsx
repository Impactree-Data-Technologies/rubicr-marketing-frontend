import { Suspense } from 'react';
import ImageToggleClient from './ImageToggleClient'

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

async function getImageData(): Promise<ImageToggler> {
  const response = await fetch(`${BASE_URL}/api/home?populate[0]=image_toggler.with_rubicr&populate[1]=image_toggler.without_rubicr`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const responseData: ApiResponse = await response.json();
  return responseData.data.attributes.image_toggler;
}

export default async function ImageToggleServer() {
  const data = await getImageData();

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 py-16 px-4 md:px-8 min-h-screen flex items-center justify-center">
      <div className="bg-black rounded-2xl shadow-2xl p-8 max-w-screen-lg w-full">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white">How Rubicr Simplifies Your ESG Journey</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <ImageToggleClient 
            withRubicrUrl={`${BASE_URL}${data.with_rubicr.data.attributes.url}`}
            withoutRubicrUrl={`${BASE_URL}${data.without_rubicr.data.attributes.url}`}
          />
        </Suspense>
      </div>
    </div>
  );
}
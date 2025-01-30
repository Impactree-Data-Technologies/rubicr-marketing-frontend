"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImageTogglerData {
  with_rubicr: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  without_rubicr: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

const ImageToggle = () => {
  const [imageData, setImageData] = useState<ImageTogglerData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [showRubric, setShowRubric] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/home?populate[0]=image_toggler.with_rubicr&populate[1]=image_toggler.without_rubicr`
        );
        
        if (!response.ok) throw new Error('Failed to fetch image data');
        
        const data = await response.json();
        setImageData(data.data.attributes.image_toggler);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      }
    };

    fetchImageData();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error playing video:", error);
      });
    }
  }, [showRubric]);

  const handleSelection = (isRubric: boolean) => {
    setShowRubric(isRubric);
  };

  const renderMedia = () => {
    if (!imageData) return null;

    const url = showRubric 
      ? `${process.env.NEXT_PUBLIC_API_URL}${imageData.with_rubicr.data.attributes.url}`
      : `${process.env.NEXT_PUBLIC_API_URL}${imageData.without_rubicr.data.attributes.url}`;
    
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
          className="max-w-full h-auto rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105"
        >
          Your browser does not support video playback.
        </video>
      );
    }

    return (
      <Image
        src={url}
        width={800}
        height={800}
        quality={75}
        alt={showRubric ? "With Rubicr" : "Without Rubicr"}
        className="max-w-full h-auto rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105"
      />
    );
  };

  if (!imageData) return null;

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            How Rubicr Simplifies Your ESG Journey
          </h2>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="relative flex items-center w-64 h-12 p-1 bg-gray-800 rounded-full">
            <motion.div
              initial={false}
              animate={{
                x: showRubric ? 0 : '100%'
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute w-1/2 h-full bg-yellow-400 rounded-full"
            />
            <div className="relative z-10 flex w-full text-sm">
              <button
                onClick={() => handleSelection(true)}
                className={`w-1/2 transition-colors duration-200 ${
                  showRubric ? 'text-black' : 'text-white'
                }`}
              >
                With Rubicr
              </button>
              <button
                onClick={() => handleSelection(false)}
                className={`w-1/2 transition-colors duration-200 ${
                  !showRubric ? 'text-black' : 'text-white'
                }`}
              >
                Without Rubicr
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          {renderMedia()}
        </motion.div>
      </div>
    </section>
  );
};

export default ImageToggle;
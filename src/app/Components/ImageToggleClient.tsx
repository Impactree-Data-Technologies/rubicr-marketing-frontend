"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";

interface ImageToggleClientProps {
  withRubicrUrl: string;
  withoutRubicrUrl: string;
}

export default function ImageToggleClient({ withRubicrUrl, withoutRubicrUrl }: ImageToggleClientProps) {
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
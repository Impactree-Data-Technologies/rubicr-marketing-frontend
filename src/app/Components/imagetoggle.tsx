import React, { useState } from 'react';

const ImageToggle = () => {
  const [showRubric, setShowRubric] = useState(true);

  const handleSelection = (isRubric) => {
    setShowRubric(isRubric);
  };

  const renderImage = () => {
    if (showRubric) {
      return <img src="/green.avif" alt="Image with Rubicr" className="max-w-full h-auto rounded-lg shadow-lg transform transition duration-500 hover:scale-105" />;
    } else {
      return <img src="/greenly.avif" alt="Image without Rubicr" className="max-w-full h-auto rounded-lg shadow-lg transform transition duration-500 hover:scale-105" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 py-16 px-4 md:px-8 min-h-screen flex items-center justify-center">
      <div className="bg-black rounded-2xl shadow-2xl p-8 max-w-screen-lg w-full">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white">Make Your ESG Management Simple</h2>

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

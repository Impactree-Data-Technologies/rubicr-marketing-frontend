import React from 'react';
import Image from 'next/image';


interface EmployeeCardProps {
  name: string;
  position: string;
  imageUrl: string;
}





  function EmployeeCard  ({ name, position, imageUrl }: EmployeeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="relative w-full pt-[100%]"> {/* This creates a square aspect ratio */}
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{position}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
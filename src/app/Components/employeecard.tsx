import React from 'react';

const EmployeeCard = ({ name, position, imageUrl }) => (
  <div className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden p-4">
    <img className="w-full h-40 object-cover mb-4" src={imageUrl} alt={name} />
    <div className="text-center">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{position}</p>
    </div>
  </div>
);

export default EmployeeCard;

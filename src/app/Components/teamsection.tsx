import React from 'react';
import EmployeeCard from './employeecard';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      position: 'CEO',
      imageUrl: '/card.jfif', // Replace with actual image URL
    },
    {
      name: 'Jane Smith',
      position: 'COO',
      imageUrl: '/card.jfif', // Replace with actual image URL
    },
    {
      name: 'Michael Johnson',
      position: 'CTO',
      imageUrl: '/card.jfif', // Replace with actual image URL
    },
    // Add more team members as needed
  ];

  return (
    <div className="max-w-screen-lg mx-auto py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Consortium of Sustainability experts</h2>
        <p className="text-lg text-gray-600">
        Our top-tier scientific council is composed of experts in climate science, professors, strategic advisors and industry leaders.
        </p>
      </div>

      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex justify-center gap-8 md:gap-16">
          {teamMembers.map((member, index) => (
            <EmployeeCard
              key={index}
              name={member.name}
              position={member.position}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;

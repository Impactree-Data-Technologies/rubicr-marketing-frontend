import React from 'react';
import EmployeeCard from './employeecard';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Rajashri Sai',
      position: 'CEO',
      imageUrl: '/Rajashri.webp',
    },
    {
      name: 'Vivek Shankaranarayanan',
      position: 'Cofounder',
      imageUrl: '/Vivek.webp',
    },
    {
      name: 'Ashlesha Kshirsagar',
      position: 'Director & Head of operations',
      imageUrl: '/ash.webp',
    },
    // Add more team members as needed
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Our Consortium of Sustainability Experts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our top-tier scientific council is composed of experts in climate science, professors, strategic advisors and industry leaders.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
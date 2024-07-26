import React, { useState, useEffect } from 'react';
import EmployeeCard from './employeecard';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface TeamMember {
  id: number;
  attributes: {
    Name: string;
    Position: string;
    Image: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              url: string;
            }
          }
        }
      }
    }
  }
}

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/teams?populate=*`);
        const data = await response.json();
        setTeamMembers(data.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Our Consortium of Sustainability Experts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our top-tier council is composed of experts in  professors, strategic advisors and industry leaders.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <EmployeeCard
              key={member.id}
              name={member.attributes.Name}
              position={member.attributes.Position}
              imageUrl={`${member.attributes.Image.data.attributes.formats.thumbnail.url}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
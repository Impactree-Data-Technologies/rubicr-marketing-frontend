import React from 'react';
import Image from 'next/image';
import { 
  Target, 
  Award, 
  Globe,
  User2 
} from 'lucide-react';


import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import Button from "../../Components/button";

// Team Member Type
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Rajashri Sai",
    role: "Founder & CEO",
    image: "/Rajashri.webp",
    bio: ""
  },
  {
    name: "Vivek Shankarnarayanan",
    role: "Co-Founder ",
    image: "/Vivek.webp",
    bio: ""
  },
  {
    name: "Ashlesha Kshirsagar ",
    role: "Creative Director",
    image: "/ash.webp",
    bio: ""
  }
];

const AboutUsPage: React.FC = () => {
  return (
    <div>
        <Navbar />
      
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mt-12 mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            About Our Company
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Innovating solutions that make a difference, one breakthrough at a time.
          </p>
        </div>

        {/* Company Values Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Target className="w-10 h-10 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600">
              To empower businesses through innovative technology and exceptional design, 
              creating solutions that drive meaningful impact and sustainable growth.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Award className="w-10 h-10 text-green-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600">
              To be a global leader in technological innovation, consistently delivering 
              cutting-edge solutions that transform industries and improve lives.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-6 flex flex-col items-center">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-center">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Presence */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <Globe className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Global Reach, Local Impact
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            With team members and clients across multiple continents, we bring 
            diverse perspectives and global expertise to every project we undertake.
          </p>
        </div>
      </div>
    </div>

    <div className="py-10">

<section className="bg-gradient-to-r from-yellow-500 to-yellow-700 py-20 mx-8 md:mx-20 rounded-3xl mb-20 shadow-2xl">
<div className="max-w-screen-xl mx-auto px-4 text-center">
  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get Started Today</h2>
  <hr className="border-t-2 border-white w-24 mx-auto mb-6" />
  <p className="text-xl md:text-2xl mb-8 text-white">Ready to transform your ESG Performance?</p>
  <Button label="Schedule a demo" background="#FFCD1B" color="white" href="/contact-us" />
</div>
</section>
</div>

<Footer />
</div>
  );
};

export default AboutUsPage;
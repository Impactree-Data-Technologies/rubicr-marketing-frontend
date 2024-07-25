import React from 'react';

interface MethodCardProps {
  title: string;
  description: string;
  icon: string;
}

function MethodCard({ title, description, icon }: MethodCardProps) {
  return (
    <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6">
        <span className="text-4xl mr-4">{icon}</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default function Doit() {
  return (
    <div className="py-16 px-6 md:px-12 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          How We Do It
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MethodCard
            title="Customized Solutions"
            description="Our experts provide tailored solutions to meet your specific business needs and sustainability goals."
            icon="🎯"
          />
          <MethodCard
            title="Comprehensive Data Analytics"
            description="We leverage advanced tools to analyze data, extracting actionable insights for informed decision-making."
            icon="📊"
          />
          <MethodCard
            title="Collaborative Approach"
            description="We partner closely with your team to co-create sustainable solutions that deliver measurable results."
            icon="🤝"
          />
        </div>
      </div>
    </div>
  );
}
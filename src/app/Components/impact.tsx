import React from 'react';

interface ImpactCardProps {
  number: string;
  title: string;
  description: string;
  icon :string;
}


export default function Impact() {
  return (
    <div className="py-16 px-6 md:px-12 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Our Impact
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ImpactCard
            number="50%"
            title="Less Time"
            description="Streamline your ESG processes and save valuable time on data collection and reporting."
            icon="⏱️"
          />
          <ImpactCard
            number="50%"
            title="USD in Savings"
            description="Reduce costs while improving sustainability performance and operational efficiency."
            icon="💰"
          />
          <ImpactCard
            number="1"
            title="Stop Shop"
            description="All your sustainable performance needs in one comprehensive platform."
            icon="🏢"
          />
        </div>
      </div>
    </div>
  );
}





function ImpactCard({ number, title, description, icon}: ImpactCardProps) {
  return (
    <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6">
        <span className="text-4xl mr-4">{icon}</span>
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white">{number}</h2>
      </div>
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">{title}</p>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
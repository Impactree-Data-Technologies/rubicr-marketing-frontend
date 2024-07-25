import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600">
      <div className="text-5xl mb-6">{icon}</div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const WhyRubicr: React.FC = () => {
  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Why Choose Rubicr
        </h1>
        <p className="mb-12 text-xl text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto">
          We understand that ESG data can be manual and unstructured. Our Sustainable Intelligence engine ensures you get the right data and insights to grow your business sustainably.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="End-to-End Lifecycle Solutions"
            description="We offer a complete end-to-end lifecycle solution for ESG management. From initial assessment to reporting and beyond, our integrated approach ensures seamless sustainability performance management."
            icon="🔄"
          />
          <FeatureCard
            title="Extensive Experience"
            description="With nearly 80 clients across diverse industries, our experience is both broad and deep. We understand unique challenges and tailor solutions to meet specific needs effectively."
            icon="🌍"
          />
          <FeatureCard
            title="Demonstration of Value"
            description="We provide a holistic approach encompassing the entire value chain of the market. Our clarity and depth of expertise empower clients to achieve sustainability goals efficiently and effectively."
            icon="📈"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyRubicr;

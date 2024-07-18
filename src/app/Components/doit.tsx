import React from 'react';

export default function Doit() {
  return (
    <div className="py-12 px-6 md:px-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12">
          How We Do It
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Customized Solutions</h2>
            <p className="text-gray-700 dark:text-gray-300">Our team of experts possesses deep industry knowledge and technical expertise, enabling us to provide customized solutions tailored to your specific business needs and sustainability goals.</p>
          </div>
          <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Comprehensive Data Analytics</h2>
            <p className="text-gray-700 dark:text-gray-300">Leveraging advanced data analytics tools and technologies, we analyze large volumes of data to extract actionable insights, empowering you to make informed decisions and drive sustainable business growth.</p>
          </div>
          <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Collaborative Approach</h2>
            <p className="text-gray-700 dark:text-gray-300">We foster a collaborative partnership with your team, working closely to understand your unique challenges and objectives. Together, we co-create sustainable solutions that deliver measurable results and drive continuous improvement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function Impact() {
  return (
    <div className="py-12 px-6 md:px-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12 ">
          Impact
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">50%</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">Less Time</p>
            <p className="text-gray-600 dark:text-gray-400">Explanation 1: Detailed explanation of the first topic.</p>
          </div>
          <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">50%</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">USD in Savings</p>
            <p className="text-gray-600 dark:text-gray-400">Explanation 2: Detailed explanation of the second topic.</p>
          </div>
          <div className="flex flex-col justify-between p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">One Stop Shop</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">for all your Sustainable performance Needs</p>
            <p className="text-gray-600 dark:text-gray-400">Explanation 3: Detailed explanation of the third topic.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

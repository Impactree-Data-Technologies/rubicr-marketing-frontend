import React from "react";

export default function Accordion({ items, activeIndex, onToggle }) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => onToggle(index)}
            className="w-full text-left text-2xl font-semibold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 p-4"
          >
            {item.title}
          </button>
          {activeIndex === index && (
            <div className="p-4 bg-white dark:bg-gray-800">
              <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

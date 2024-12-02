
import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return (
    <div className="px-6 py-4 border-b">
      {children}
    </div>
  );
};

export const CardTitle = ({ children }) => {
  return (
    <h3 className="text-xl font-bold text-gray-800">{children}</h3>
  );
};

export const CardContent = ({ children }) => {
  return (
    <div className="p-6">
      {children}
    </div>
  );
};
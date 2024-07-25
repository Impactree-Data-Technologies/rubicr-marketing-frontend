import React from 'react';

interface ButtonProps {
  label: string;
  background: string;
  color: string;
}

const Button: React.FC<ButtonProps> = ({ label, background, color }) => {
  return (
    <button style={{ backgroundColor: background, color }}>
      {label}
    </button>
  );
};

export default Button;

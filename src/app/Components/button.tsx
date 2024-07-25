
import React from 'react';

interface ButtonProps {
  label: string;
  background: string;
  color: string;
}

const Button: React.FC<ButtonProps> = ({ label, background, color }) => {
  return (
    <button style={{ backgroundColor: background, color,  borderRadius : "20px", padding : "9px"}}>
      {label}
    </button>
  );
};

export default Button;

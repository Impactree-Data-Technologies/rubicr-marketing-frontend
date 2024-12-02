import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  background?: string;
  color?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  background, 
  color, 
  href, 
  className, 
  style, 
  ...rest 
}) => {
  const buttonStyle = {
    backgroundColor: background || '',
    color: color || '',
    borderRadius: "20px",
    padding: "9px",
    cursor: "pointer",
    border: "none",
    fontWeight: "bold",
    ...style
  };

  const buttonClassName = `${className || ''} transition-transform`.trim();

  if (href) {
    return (
      <Link href={href} passHref>
        <button 
          style={buttonStyle} 
          className={buttonClassName}
          {...rest}
        >
          {label}
        </button>
      </Link>
    );
  }

  return (
    <button 
      style={buttonStyle} 
      className={buttonClassName}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
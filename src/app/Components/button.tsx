import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  label: string;
  background: string;
  color: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ label, background, color, href }) => {
  const buttonStyle = {
    backgroundColor: background,
    color: color,
    borderRadius: "20px",
    padding: "9px",
    cursor: "pointer",
    border: "none",
    fontWeight: "bold",
  };

  if (href) {
    return (
      <Link href={href} passHref>
        <button style={buttonStyle}>
          {label}
        </button>
      </Link>
    );
  }

  return (
    <button style={buttonStyle}>
      {label}
    </button>
  );
};

export default Button;
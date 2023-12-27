import React, { FC, SVGProps } from 'react';

interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ArrowIcon: FC<ArrowIconProps> = ({ className = '', fill = 'none', stroke = 'black', direction = 'down', ...props }) => {
  const rotationDegrees = {
    up: -180,
    down: 0,
    left: -90,
    right: -270,
  };

  const rotation = rotationDegrees[direction] || 0;

  return (
    <svg 
      className={`arrow-icon w-6 h-6 transform transition-transform ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      fill={fill}
      stroke={stroke}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7"></path>
    </svg>
  );
};


export default ArrowIcon;

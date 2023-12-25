import React, { FC, SVGProps } from 'react';

interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
  className?: string;
}

const ArrowIcon: FC<ArrowIconProps> = ({ className = '', fill = 'none', stroke = 'black', ...props }) => {
  return (
    <svg 
      className={`w-6 h-6 ${className}`}
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

import React from 'react';

interface LShapeProps {
  size: number;    // overall size (used to scale the L shape)
  angle: number;   // angle for rotation in degrees (0, 90, 180, 270 for corners)
  thickness: number; // thickness of the "L" shape arms
  color: string;    // color of the "L" shape
  length: number;   // length of the arms (sides) of the "L"
}

const LShape: React.FC<LShapeProps> = ({ size, angle, thickness, color, length }) => {
  
  // Length is used for the arms of the "L" shape, set it to the provided length.
  const armLength = length;

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `rotate(${angle}deg)`, // Rotate the shape according to the angle prop
          display: 'block', // Prevents extra space below the svg
          margin: 0, // Removes any default margin
        }}
      >
        {/* Vertical part of the L */}
        <rect 
          x="0" 
          y="0" 
          width={thickness} 
          height={armLength} 
          fill={color} 
        />
        {/* Horizontal part of the L */}
        <rect 
          x="0" 
          y={armLength - thickness} 
          width={armLength} 
          height={thickness} 
          fill={color} 
        />
      </svg>
    </div>
  );
};

export default LShape;

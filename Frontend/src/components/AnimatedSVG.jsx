import React from 'react';

const AnimatedSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="100"
      height="100"
      style={{ shapeRendering: 'auto', display: 'block', background: 'rgb(255, 255, 255)' }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <path
          stroke="none"
          fill="#5b8ee1"
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
        >
          <animateTransform
            values="0 50 51;360 50 51"
            keyTimes="0;1"
            repeatCount="indefinite"
            dur="1s"
            type="rotate"
            attributeName="transform"
          />
        </path>
      </g>
    </svg>
  );
};

export default AnimatedSVG;

"use client";
import React, { useEffect, useState } from "react";

const AnimatedSVGComponent = ({
  isActive,
  size,
  color,
}: {
  isActive: boolean;
  size: number;
  color: string;
}) => {
  return (
    <div>
      <svg
        width={size ? size : 60}
        height={size ? size : 60}
        viewBox="0 0 222 222"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${isActive ? "active" : ""} stroke-gray-400`}
      >
        <path
          d="M88.4599 35.8512C88.4599 35.8512 147.26 105.551 61.2599 126.151C52.8599 128.151 31.4599 132.251 18.3599 121.251C-2.84012 103.251 4.15988 50.7512 32.2599 24.6512C52.5599 5.85125 77.8599 6.45125 119.26 7.35125C131.76 7.65125 142.36 9.25125 151.16 16.3512C157.46 21.4512 160.76 29.8512 167.16 45.5512C179.76 76.5512 226.16 55.2512 213.96 94.6512C201.76 134.051 183.86 150.751 114.06 141.451C108.56 152.251 99.0599 167.451 83.2599 182.051C60.3599 203.151 36.0599 211.851 22.7599 215.551"
          stroke={color ? color : "gray"}
          stroke-width="12"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="svg-elem-1"
        ></path>
        <path
          d="M143.52 70.5978C148.081 70.3539 151.511 65.1487 151.181 58.9716C150.85 52.7946 146.885 47.9849 142.323 48.2288C137.762 48.4728 134.332 53.678 134.662 59.855C134.992 66.0321 138.958 70.8418 143.52 70.5978Z"
          fill={color ? color : "gray"}
          className="svg-elem-2"
        ></path>
      </svg>
    </div>
  );
};

const LoadingPet = ({ size, color }: any) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(!isActive);
    }, 2000);
    return () => clearTimeout(timer);
  });

  return (
    <div>
      <AnimatedSVGComponent isActive={isActive} size={size} color={color} />
    </div>
  );
};

export default LoadingPet;
